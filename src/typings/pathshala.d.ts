
export interface ISchool {
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
  };
  boardAffiliation: 'CBSE' | 'ICSE' | 'State' | 'International';
  boardAffiliationNumber: string;
  establishmentYear: number;
  contactInfo: {
    phone: string[];
    email: string[];
  };
  principalName: string;
  domain: string;
}
