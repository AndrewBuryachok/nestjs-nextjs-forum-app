'use server';

import {
  createProductSchema,
  createProductWithUserSchema,
  deleteProductSchema,
  editProductSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyProductAction = actionClient
  .inputSchema(createProductSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/products', body);
  });

export const createUserProductAction = actionClient
  .inputSchema(createProductWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/products/all', body);
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
