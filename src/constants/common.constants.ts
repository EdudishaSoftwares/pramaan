export const DEFAULT_LANG = 'en';

export enum ROLES {
  CUSTOMER_CARE = 'customer-care',
  CHAT_AGENT = 'chat-agent',
  INVENTORY_MGMT = 'inventory-mgmt',
  CATALOGUE_DESCRIPTION = 'catalogue-description',
  CATALOGUE_INVENTORY_MGMT = 'catalogue-inventory-mgmt',
  CATALOGUE_HEAD = 'catalogue-head',
  CATALOGUE_MEDIA = 'catalogue-media',
  SCREEN_MGMT = 'screen-mgmt',
  SELLER_MGMT = 'seller-mgmt',
  RESELLER_MGMT = 'reseller-mgmt',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super-admin',
  SELLER = 'seller',
  CUSTOMER_SEARCH_ADMIN = 'customer-search-admin',
  SELLER_ADMIN = 'seller-admin',
  DEVELOPER = 'developer',
  SELLER_SUPER_ADMIN = 'seller-super-admin', // only seller super admins can edit the seller data from dashboard
}

export const PLATFORMS = {
  WEB: 'web', // seller's webpage
  ANDROID: 'android', // seller's app
  WHATSAPP_BUSINESS: 'whatsapp_business',
  WHATSAPP_WEB: 'whatsapp',
  DASHBOARD: 'dashboard',
  CUSTOMER_APP: 'customer_app',
};
