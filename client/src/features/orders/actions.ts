'use server';

import {
  cancelOrderSchema,
  completeOrderSchema,
  createOrderSchema,
  deleteOrderSchema,
  editOrderSchema,
  executeOrderSchema,
  takeOrderSchema,
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

export const takeMyOrderAction = actionClient
  .inputSchema(takeOrderSchema)
  .action(({ parsedInput: { orderId, ...body } }) => {
    return send('POST', `/orders/${orderId}/take`, body);
  });

export const takeUserOrderAction = actionClient
  .inputSchema(takeOrderSchema)
  .action(({ parsedInput: { orderId, ...body } }) => {
    return send('POST', `/orders/all/${orderId}/take`, body);
  });

export const cancelMyOrderAction = actionClient
  .inputSchema(cancelOrderSchema)
  .action(({ parsedInput: { orderId } }) => {
    return send('POST', `/orders/${orderId}/cancel`);
  });

export const cancelUserOrderAction = actionClient
  .inputSchema(cancelOrderSchema)
  .action(({ parsedInput: { orderId } }) => {
    return send('POST', `/orders/all/${orderId}/cancel`);
  });

export const executeMyOrderAction = actionClient
  .inputSchema(executeOrderSchema)
  .action(({ parsedInput: { orderId } }) => {
    return send('POST', `/orders/${orderId}/execute`);
  });

export const executeUserOrderAction = actionClient
  .inputSchema(executeOrderSchema)
  .action(({ parsedInput: { orderId } }) => {
    return send('POST', `/orders/all/${orderId}/execute`);
  });

export const completeMyOrderAction = actionClient
  .inputSchema(completeOrderSchema)
  .action(({ parsedInput: { orderId } }) => {
    return send('POST', `/orders/${orderId}/complete`);
  });

export const completeUserOrderAction = actionClient
  .inputSchema(completeOrderSchema)
  .action(({ parsedInput: { orderId } }) => {
    return send('POST', `/orders/all/${orderId}/complete`);
  });
