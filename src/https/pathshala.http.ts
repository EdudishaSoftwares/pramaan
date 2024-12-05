// Modules
import fetch from 'node-fetch';
// Config
import { services } from '@/config';
// Constants
import { RequestMethodEnum } from '@/constants/enum';
// Typings
import { ISchool } from '@/typings/pathshala';

export default class PathshalaInternal {
  //Services
  private pathshalaService = services.pathshala_service;

  /**
   * Retrive all school details by identifier
   * @param {string} domain - identifier for fetching school details
   */
  public getSchoolDetailByDomainName = async (domain: string): Promise<ISchool> => {
    const queryParams = new URLSearchParams({ identifier: JSON.stringify({ domain }) }).toString();
    const url = `${this.pathshalaService}/school?${queryParams}`;
    console.log(url);
    return await fetch(url, {
      method: RequestMethodEnum.GET,
    }).then(res => res.json());
  };
}
