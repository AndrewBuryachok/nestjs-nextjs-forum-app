'use server';

import {
  buyGoodSchema,
  createGoodSchema,
  deleteGoodSchema,
  editGoodSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyGoodAction = actionClient
  .inputSchema(createGoodSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/goods', body);
  });

export const createUserGoodAction = actionClient
  .inputSchema(createGoodSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/goods/all', body);
  });

export const editMyGoodAction = actionClient
  .inputSchema(editGoodSchema)
  .action(({ parsedInput: { goodId, ...body } }) => {
    return send('PATCH', `/goods/${goodId}`, body);
  });

export const editUserGoodAction = actionClient
  .inputSchema(editGoodSchema)
  .action(({ parsedInput: { goodId, ...body } }) => {
    return send('PATCH', `/goods/all/${goodId}`, body);
  });

export const deleteMyGoodAction = actionClient
  .inputSchema(deleteGoodSchema)
  .action(({ parsedInput: { goodId } }) => {
    return send('DELETE', `/goods/${goodId}`);
  });

export const deleteUserGoodAction = actionClient
  .inputSchema(deleteGoodSchema)
  .action(({ parsedInput: { goodId } }) => {
    return send('DELETE', `/goods/all/${goodId}`);
  });

export const buyMyGoodAction = actionClient
  .inputSchema(buyGoodSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/purchases', body);
  });

export const buyUserGoodAction = actionClient
  .inputSchema(buyGoodSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/purchases/all', body);
  });
