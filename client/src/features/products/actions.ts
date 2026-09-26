'use server';

import {
  buyProductSchema,
  buyProductWithUserSchema,
  createProductWithRentAndUserSchema,
  createProductWithRentSchema,
  createProductWithShopAndUserSchema,
  createProductWithShopSchema,
  deleteProductSchema,
  editProductAmountAndPriceSchema,
  editProductSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyShopProductAction = actionClient
  .inputSchema(createProductWithShopSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/products/shops', body);
  });

export const createUserShopProductAction = actionClient
  .inputSchema(createProductWithShopAndUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/products/shops/all', body);
  });

export const createMyRentProductAction = actionClient
  .inputSchema(createProductWithRentSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/products/rents', body);
  });

export const createUserRentProductAction = actionClient
  .inputSchema(createProductWithRentAndUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/products/rents/all', body);
  });

export const editMyProductAmountAndPriceAction = actionClient
  .inputSchema(editProductAmountAndPriceSchema)
  .action(({ parsedInput: { productId, ...body } }) => {
    return send('PATCH', `/products/${productId}/amount-and-price`, body);
  });

export const editUserProductAmountAndPriceAction = actionClient
  .inputSchema(editProductAmountAndPriceSchema)
  .action(({ parsedInput: { productId, ...body } }) => {
    return send('PATCH', `/products/all/${productId}/amount-and-price`, body);
  });

export const editMyProductAction = actionClient
  .inputSchema(editProductSchema)
  .action(({ parsedInput: { productId, ...body } }) => {
    return send('PATCH', `/products/${productId}`, body);
  });

export const editUserProductAction = actionClient
  .inputSchema(editProductSchema)
  .action(({ parsedInput: { productId, ...body } }) => {
    return send('PATCH', `/products/all/${productId}`, body);
  });

export const deleteMyProductAction = actionClient
  .inputSchema(deleteProductSchema)
  .action(({ parsedInput: { productId } }) => {
    return send('DELETE', `/products/${productId}`);
  });

export const deleteUserProductAction = actionClient
  .inputSchema(deleteProductSchema)
  .action(({ parsedInput: { productId } }) => {
    return send('DELETE', `/products/all/${productId}`);
  });

export const buyMyProductAction = actionClient
  .inputSchema(buyProductSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/purchases', body);
  });

export const buyUserProductAction = actionClient
  .inputSchema(buyProductWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/purchases/all', body);
  });
