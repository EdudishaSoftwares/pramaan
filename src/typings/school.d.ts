import { ISchool } from '@/models/school.model';
import { Document } from 'mongoose';

export type ISchoolDetails = Omit<ISchool, keyof Document>;
