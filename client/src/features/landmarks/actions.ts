'use server';

import {
  createLandmarkSchema,
  createLandmarkWithUserSchema,
  deleteLandmarkSchema,
  editLandmarkSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createLandmarkAction = actionClient
  .inputSchema(createLandmarkSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/landmarks', body);
  });

export const createLandmarkWithUserAction = actionClient
  .inputSchema(createLandmarkWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/landmarks/all', body);
  });

export const editMyLandmarkAction = actionClient
  .inputSchema(editLandmarkSchema)
  .action(({ parsedInput: { landmarkId, ...body } }) => {
    return send('PATCH', `/landmarks/${landmarkId}`, body);
  });

export const editUserLandmarkAction = actionClient
  .inputSchema(editLandmarkSchema)
  .action(({ parsedInput: { landmarkId, ...body } }) => {
    return send('PATCH', `/landmarks/all/${landmarkId}`, body);
  });

export const deleteMyLandmarkAction = actionClient
  .inputSchema(deleteLandmarkSchema)
  .action(({ parsedInput: { landmarkId } }) => {
    return send('DELETE', `/landmarks/${landmarkId}`);
  });

export const deleteUserLandmarkAction = actionClient
  .inputSchema(deleteLandmarkSchema)
  .action(({ parsedInput: { landmarkId } }) => {
    return send('DELETE', `/landmarks/all/${landmarkId}`);
  });
