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
    return await fetch(`${this.pathshalaService}/school?identifier=${JSON.stringify({ domain })}`, {
      method: RequestMethodEnum.GET,
    }).then(res => res.json());
  };
}
