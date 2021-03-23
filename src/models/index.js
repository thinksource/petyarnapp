// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Gallery, Picture, Like } = initSchema(schema);

export {
  Gallery,
  Picture,
  Like
};