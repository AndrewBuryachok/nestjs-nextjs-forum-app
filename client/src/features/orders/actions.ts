'use server';

import {
  createOrderSchema,
  deleteOrderSchema,
  editOrderSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyOrderAction = actionClient
  .inputSchema(createOrderSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/orders', body);
  });

export const createUserOrderAction = actionClient
  .inputSchema(createOrderSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/orders/all', body);
  });

export const editMyOrderAction = actionClient
  .inputSchema(editOrderSchema)
  .action(({ parsedInput: { orderId, ...body } }) => {
    return send('PATCH', `/orders/${orderId}`, body);
  });

export const editUserOrderAction = actionClient
  .inputSchema(editOrderSchema)
  .action(({ parsedInput: { orderId, ...body } }) => {
    return send('PATCH', `/orders/all/${orderId}`, body);
  });

export const deleteMyOrderAction = actionClient
  .inputSchema(deleteOrderSchema)
  .action(({ parsedInput: { orderId } }) => {
    return send('DELETE', `/orders/${orderId}`);
  });

export const deleteUserOrderAction = actionClient
  .inputSchema(deleteOrderSchema)
  .action(({ parsedInput: { orderId } }) => {
    return send('DELETE', `/orders/all/${orderId}`);
  });
