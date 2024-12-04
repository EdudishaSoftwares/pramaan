import { BoardAffiliationType } from '@/constants/enum';

export interface IAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface ISchool {
  name: string;
  address: IAddress;
  boardAffiliation: BoardAffiliationType;
  boardAffiliationNumber: string;
  establishmentYear: number;
  contactInfo: {
    phone: string[];
    email: string[];
  };
  principalName: string;
  domain: string;
}
