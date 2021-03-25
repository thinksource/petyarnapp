// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Picture } = initSchema(schema);

export {
  Picture
};