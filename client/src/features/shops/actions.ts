'use server';

import { createShopSchema, deleteShopSchema, editShopSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyShopAction = actionClient
  .inputSchema(createShopSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/shops', body);
  });

export const createUserShopAction = actionClient
  .inputSchema(createShopSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/shops/all', body);
  });

export const editMyShopAction = actionClient
  .inputSchema(editShopSchema)
  .action(({ parsedInput: { shopId, ...body } }) => {
    return send('PATCH', `/shops/${shopId}`, body);
  });

export const editUserShopAction = actionClient
  .inputSchema(editShopSchema)
  .action(({ parsedInput: { shopId, ...body } }) => {
    return send('PATCH', `/shops/all/${shopId}`, body);
  });

export const deleteMyShopAction = actionClient
  .inputSchema(deleteShopSchema)
  .action(({ parsedInput: { shopId } }) => {
    return send('DELETE', `/shops/${shopId}`);
  });

export const deleteUserShopAction = actionClient
  .inputSchema(deleteShopSchema)
  .action(({ parsedInput: { shopId } }) => {
    return send('DELETE', `/shops/all/${shopId}`);
  });
