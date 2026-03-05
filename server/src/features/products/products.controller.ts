import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  getMainProducts(@Query() req: Request): Promise<Response<Product>> {
    return this.productsService.getMainProducts(req);
  }

  @Get('my')
  getMyProducts(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Product>> {
    return this.productsService.getMyProducts(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllProducts(@Query() req: Request): Promise<Response<Product>> {
    return this.productsService.getAllProducts(req);
  }
}
