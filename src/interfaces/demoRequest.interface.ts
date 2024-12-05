export interface IDemoRequestSchema {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  meeting_date?: Date;
  message?: string;
}
