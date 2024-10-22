export enum requestMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum DiscountSettingEnum {
  REAL = 'real',
  FAKE = 'fake',
}

export enum DiscountTypeEnum {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

export type TSaleEventCategory = 'Republic Day' | 'Custom';

export enum slackMessageTypeEnums {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
}
/**
 * Defines where the page will appear on app/web. Is stored in page_type field of Page collection.
 */
export enum pageTypeEnum {
  HOME_PAGE = 'home_page',
  PRODUCT_PAGE = 'product_page',
  FEATURED_PAGE = 'featured_page',
  ORDER_STATUS_PAGE = 'order_status_page',
  CUSTOMISATION_CATALOGUE = 'customisation_catalogue',
}

export enum couponTypeEnum {
  FREE_GIFT = 'free_gift',
  BUMPER = 'bumper',
}
