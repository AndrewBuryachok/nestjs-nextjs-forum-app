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
  CreateProductWithRentAndUserDto,
  CreateProductWithRentDto,
  CreateProductWithShopAndUserDto,
  CreateProductWithShopDto,
  EditProductAmountAndPriceDto,
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

  @Post('shops')
  createMyShopProduct(
    @MyId() myId: number,
    @Body() dto: CreateProductWithShopDto,
  ): Promise<void> {
    return this.productsService.createShopProduct({ ...dto, userId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('shops/all')
  createUserShopProduct(
    @Body() dto: CreateProductWithShopAndUserDto,
  ): Promise<void> {
    return this.productsService.createShopProduct(dto);
  }

  @Post('rents')
  createMyRentProduct(
    @MyId() myId: number,
    @Body() dto: CreateProductWithRentDto,
  ): Promise<void> {
    return this.productsService.createRentProduct({ ...dto, userId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('rents/all')
  createUserRentProduct(
    @Body() dto: CreateProductWithRentAndUserDto,
  ): Promise<void> {
    return this.productsService.createRentProduct(dto);
  }

  @Patch(':productId/amount-and-price')
  editMyProductAmountAndPrice(
    @MyId() myId: number,
    @Param() { productId }: ProductIdDto,
    @Body() dto: EditProductAmountAndPriceDto,
  ): Promise<void> {
    return this.productsService.editMyProductAmountAndPrice(
      myId,
      productId,
      dto,
    );
  }

  @Roles([Role.ADMIN])
  @Patch('all/:productId/amount-and-price')
  editUserProductAmountAndPrice(
    @Param() { productId }: ProductIdDto,
    @Body() dto: EditProductAmountAndPriceDto,
  ): Promise<void> {
    return this.productsService.editUserProductAmountAndPrice(productId, dto);
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
