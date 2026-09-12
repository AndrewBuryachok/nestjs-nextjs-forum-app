'use server';

import {
  createPlotSchema,
  createPlotWithUserSchema,
  deletePlotSchema,
  editPlotSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyPlotAction = actionClient
  .inputSchema(createPlotSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/plots', body);
  });

export const createUserPlotAction = actionClient
  .inputSchema(createPlotWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/plots/all', body);
  });

export const editMyPlotAction = actionClient
  .inputSchema(editPlotSchema)
  .action(({ parsedInput: { plotId, ...body } }) => {
    return send('PATCH', `/plots/${plotId}`, body);
  });

export const editUserPlotAction = actionClient
  .inputSchema(editPlotSchema)
  .action(({ parsedInput: { plotId, ...body } }) => {
    return send('PATCH', `/plots/all/${plotId}`, body);
  });

export const deleteMyPlotAction = actionClient
  .inputSchema(deletePlotSchema)
  .action(({ parsedInput: { plotId } }) => {
    return send('DELETE', `/plots/${plotId}`);
  });

export const deleteUserPlotAction = actionClient
  .inputSchema(deletePlotSchema)
  .action(({ parsedInput: { plotId } }) => {
    return send('DELETE', `/plots/all/${plotId}`);
  });
