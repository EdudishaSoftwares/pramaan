// Modules
import fetch from 'node-fetch';
// Config
import { services } from '@/config';
// Constants
import { RequestMethodEnum } from '@/constants/enum';
// Typings
import { ISchool } from '@/typings/pathshala';

export default class PathshalaInternal {
  private pathshalaService = services.pathshala_service;

  /**
   * Retrive all school details by domain
   * @param {string} domain
   */
  public getSchoolDetailByDomainName = (payload: { domain: string }): Promise<ISchool> => {
    return fetch(`${this.pathshalaService}/school?identifier=${JSON.stringify(payload)}`, {
      method: RequestMethodEnum.GET,
    }).then(res => res.json() as unknown as ISchool);
  };
}
