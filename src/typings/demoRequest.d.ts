// Typings
import { IDemoRequestSchema } from '@/interfaces/demoRequest.interface';
import { CamelCaseKeys } from './common';

export type CreateDemoReqestInDb = Pick<IDemoRequestSchema, 'first_name' | 'last_name' | 'email' | 'phone_number' | 'message'>;
export type BookDemoRequestData = CamelCaseKeys<CreateDemoReqestInDb>;
