import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import {
  CreateProductDto,
  CreateProductWithUserDto,
  EditProductDto,
  ProductIdDto,
} from './product.dto';
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

  @Post()
  createMyProduct(
    @MyId() myId: number,
    @Body() dto: CreateProductDto,
  ): Promise<void> {
    return this.productsService.createProduct({ ...dto, userId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserProduct(@Body() dto: CreateProductWithUserDto): Promise<void> {
    return this.productsService.createProduct(dto);
  }

  @Patch(':productId')
  editMyProduct(
    @MyId() myId: number,
    @Param() { productId }: ProductIdDto,
    @Body() dto: EditProductDto,
  ): Promise<void> {
    return this.productsService.editMyProduct(myId, productId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch('all/:productId')
  editUserProduct(
    @Param() { productId }: ProductIdDto,
    @Body() dto: EditProductDto,
  ): Promise<void> {
    return this.productsService.editUserProduct(productId, dto);
  }

  @Delete(':productId')
  deleteMyProduct(
    @MyId() myId: number,
    @Param() { productId }: ProductIdDto,
  ): Promise<void> {
    return this.productsService.deleteMyProduct(myId, productId);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:productId')
  deleteUserProduct(@Param() { productId }: ProductIdDto): Promise<void> {
    return this.productsService.deleteUserProduct(productId);
  }
}
