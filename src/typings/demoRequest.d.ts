// Typings
import { IDemoRequestSchema } from '@/interfaces/demoRequest.interface';
import { CamelCaseKeys } from './common';

export type BookDemoRequestData = CamelCaseKeys<Pick<IDemoRequestSchema, 'first_name' | 'last_name' | 'email' | 'preffered_date' | 'message'>>;
export type CreateDemoReqestInDb = Pick<IDemoRequestSchema, 'first_name' | 'last_name' | 'email' | 'preffered_date' | 'message'>;
