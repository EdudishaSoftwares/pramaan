import { PAGE_TYPES } from './page.constants';
import { getStringedNumbersAsList } from '@/utils/util';

export const SUPPORTED_LANGUAGES = ['en', 'hi', 'gu'];

/**
 *
 * @param templateName
 * @param limitPerPage
 * @param pageTypes
 * @param templateNameForFrontEnd - use when there is logic coupled with the template that frontend does not need to know about. eg. new arrivals template can be processed and sent to frontend as a simple "product_group"
 * @returns {any}
 */
const getTemplateType = (
  templateName: string,
  limitPerPage: number | null = null,
  pageTypes: string[] | string | null = null,
  templateNameForFrontEnd: string | null = null,
) => {
  return {
    template_name: templateName, // as stored in db and for internal dashboard.
    fe_template_name: templateNameForFrontEnd || templateName, // value for frontend. eg NEW_ARRIVALS template will go to frontend as product_group
    limit_per_page: limitPerPage, // ignored if null
    page_types: pageTypes || Object.values(PAGE_TYPES), // page_types on which this template can appear
  };
};

export const TEMPLATE_TYPE_OBJECTS = {
  PRODUCT_GROUP: getTemplateType('product_group'),
  BANNER_CROSS_LINK: getTemplateType('banner_cross_link'),
  PRODUCT_MEDIA: getTemplateType('product_media'),
  PRODUCT_TITLE: getTemplateType('product_title'),
  PRODUCT_SIZE_PICKER: getTemplateType('product_size_picker'),
  PRODUCT_COLOUR_PICKER: getTemplateType('product_colour_picker'),
  WA_REPLY_AND_BAG: getTemplateType('wa_reply_and_bag'),
  PRODUCT_DESCRIPTION: getTemplateType('product_description'),
  TESTIMONIAL: getTemplateType('testimonial'),
  CATEGORY_GROUP: getTemplateType('category_group'),
  BANNER_CROSS_LINK_FULL: getTemplateType('banner_cross_link_full'),
  COLLECTION_POSTERS: getTemplateType('collection_posters'),
  PRODUCT_ATTRIBUTES: getTemplateType('product_attributes', 1, PAGE_TYPES.PRODUCT_PAGE),
  CONTENT_TEXT: getTemplateType('content_text'),
  CONTENT_TEXT_AND_MEDIA: getTemplateType('content_text_and_media'),
  VIDEO_CROSS_LINK: getTemplateType('video_cross_link'),
  RATING_AND_REVIEW: getTemplateType('rating_and_review', 1, PAGE_TYPES.PRODUCT_PAGE),
  SALES_ACTIVITY_WIDGET: getTemplateType('sales_activity', 1, PAGE_TYPES.PRODUCT_PAGE),
  WEBSITE_NAVIGATOR: getTemplateType('website_navigator'),
  PRODUCT_TESTIMONIAL: getTemplateType('product_testimonial'),
  ICON_DESCRIPTION: getTemplateType('icon_description'),
  PRODUCT_LIST: getTemplateType('product_list'),
  ANNOUNCEMENT_BAR: getTemplateType('announcement_bar'),

  //customisation templates
  CUSTOMISATION_TEXT: getTemplateType('customisation_text', null, PAGE_TYPES.CUSTOMISATION_CATALOGUE),
  CUSTOMISATION_NUMBER: getTemplateType('customisation_number', null, PAGE_TYPES.CUSTOMISATION_CATALOGUE),
  CUSTOMISATION_IMAGES: getTemplateType('customisation_images', null, PAGE_TYPES.CUSTOMISATION_CATALOGUE),
  CUSTOMISATION_MULTI_SELECT: getTemplateType('customisation_multi_select', null, PAGE_TYPES.CUSTOMISATION_CATALOGUE),
  CUSTOMISATION_SINGLE_SELECT: getTemplateType('customisation_single_select', null, PAGE_TYPES.CUSTOMISATION_CATALOGUE),
  CUSTOMISATION_HEADER: getTemplateType('customisation_header', null, PAGE_TYPES.CUSTOMISATION_CATALOGUE),
  CUSTOMISATION_DISPLAY_IMAGE: getTemplateType('customisation_display_image', null, PAGE_TYPES.CUSTOMISATION_CATALOGUE),
};

export const TEMPLATE_TYPES = Object.keys(TEMPLATE_TYPE_OBJECTS).reduce((previousValue, currentValue) => {
  previousValue[currentValue as keyof typeof TEMPLATE_TYPE_OBJECTS] =
    TEMPLATE_TYPE_OBJECTS[currentValue as keyof typeof TEMPLATE_TYPE_OBJECTS].template_name;
  return previousValue;
}, {} as Record<keyof typeof TEMPLATE_TYPE_OBJECTS, string>);

export const TEMPLATE_SUB_TYPES = {
  NEW_ARRIVALS: 'new_arrivals',
  BEST_SELLERS: 'best_sellers',
  ALL_PRODUCTS: 'all_products',
  CURATED: 'curated',
  LIVE_PRODUCTS: 'live_products',
  RECENTLY_VIEWED: 'recently_viewed',
  SIMILAR_FOR_YOU: 'similar_for_you',
  BEST_SELLER_IN_RANGE: 'best_seller_range',
};

export const TEMPLATE_LAYOUTS = {
  CAROUSEL: 'carousel',
  GRID: 'grid',
  SINGLE: 'single',
  MULTIPLE: 'multiple',
  INFINITE: 'infinite',
};

export const PAGE_ID_TO_TEMPLATE_SUB_TYPE_MAP = {
  'new-arrivals': TEMPLATE_SUB_TYPES.NEW_ARRIVALS,
  'best-sellers': TEMPLATE_SUB_TYPES.BEST_SELLERS,
  'all-products': TEMPLATE_SUB_TYPES.ALL_PRODUCTS,
};

export const TEMPLATE_SUB_TYPE_TO_PAGE_ID = {
  [TEMPLATE_SUB_TYPES.NEW_ARRIVALS]: 'new-arrivals',
  [TEMPLATE_SUB_TYPES.BEST_SELLERS]: 'best-sellers',
  [TEMPLATE_SUB_TYPES.ALL_PRODUCTS]: 'all-products',
};

export const PAGE_ID_TO_DISPLAY_NAME_MAP = {
  'new-arrivals': 'New Arrivals',
  'best-sellers': 'Best Sellers',
  'all-products': 'All Products',
};

// these template sub_types are allowed to be shown on dashboard for seller to select
// some of them are used for internal use so seller cant access it
export const ALLOWED_TEMPLATE_SUB_TYPES_ON_DASHBOARD = Object.keys(TEMPLATE_SUB_TYPES).reduce<Record<string, string>>((acc, key) => {
  if ([TEMPLATE_SUB_TYPES.LIVE_PRODUCTS].includes(TEMPLATE_SUB_TYPES[key as keyof typeof TEMPLATE_SUB_TYPES])) {
    return acc;
  }

  acc[key] = TEMPLATE_SUB_TYPES[key as keyof typeof TEMPLATE_SUB_TYPES];
  return acc;
}, {});

export const DEFAULT_PRODUCT_PAGE_TEMPLATES = {
  PRODUCT_MEDIA: 'product_media',
  PRODUCT_TITLE: 'product_title',
  PRODUCT_SIZE_PICKER: 'product_size_picker',
  PRODUCT_COLOUR_PICKER: 'product_colour_picker',
  WA_REPLY_AND_BAG: 'wa_reply_and_bag',
  PRODUCT_DESCRIPTION: 'product_description',
  PRODUCT_ATTRIBUTES: 'product_attributes',
};

export const MEDIA_UPLOAD_PLACEHOLDER = 'https://s3.ap-south-1.amazonaws.com/nushop-catalogue/1651470308634_FG4MQY7RV2_2022-05-02_1.png';

export const DEFAULT_QUESTION_MARK_IMG = 'https://s3.ap-south-1.amazonaws.com/nushop-catalogue/1658824346792_E5R1AUK0O5_2022-07-26_1.png';

export const COMMON_CATALOGUE_FIELDS = [
  'short_id',
  'hero_media',
  'customer_skus',
  'en',
  'is_visible',
  'internal_display_name',
  'enable_deals',
  'is_active',
  'media',
  'grouped_product_id',
  'size_chart',
  'colour',
  'seller_id',
  'product_rating',
  'amazon_rating',
  'fake_feedback',
  'customisation_page_short_id',
  'size_type',
];

export const TAGGED_ENTITY_TYPES = {
  COLLECTION: 'collection',
  FEATURED: 'featured',
};

export const NUSHOP_LOGO = 'https://d1311wbk6unapo.cloudfront.net/ResellerGroup/tr:w-600,f-webp,fo-auto/saheli_group_WSY5IEHKB6_2020-04-21_1.png';

export const AMAZON_RATING_BREAKDOWN_MAP = {
  five_star: 5,
  four_star: 4,
  three_star: 3,
  two_star: 2,
  one_star: 1,
};

export const DEFAULT_PLATFORM = 'web';
export const ENRICHED_TEXT_MEDIA = 'enriched_text_media';

export const SKU_SIZES = [
  'FREE SIZE',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL',
  '6-12 MONTHS',
  '12-18 MONTHS',
  '18-24 MONTHS',
  '2-3 YEARS',
  '3-4 YEARS',
  '4-5 YEARS',
  '5-6 YEARS',
  '6-7 YEARS',
  '7-8 YEARS',
  '9-10 YEARS',
  '11-12 YEARS',
  '13-14 YEARS',
  '14-15 YEARS',
  '15-16 YEARS',
  '2.4',
  '2.6',
  '2.8',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '12',
  '14',
  '16',
  ...getStringedNumbersAsList(28, 70),
  '2XL',
  '3XL',
  '4XL',
  '5XL',
  '6XL',
  '7XL',
  '8XL',
  '9XL',
  '10XL',
  'PACK OF 1',
  'PACK OF 2',
  'PACK OF 3',
  'PACK OF 4',
  'PACK OF 5',
  'PACK OF 6',
  '6.3 MTR',
  '6 MTR',
  '30B',
  '32B',
  '34B',
  '36B',
  '38B',
  '40B',
  '4 UK/IND',
  '5 UK/IND',
  '6 UK/IND',
  '7 UK/IND',
  '8 UK/IND',
  '9 UK/IND',
  // Append the sizes in a sorted manner
];

export const WHATSAPP_ICON = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png';

export const PRODUCT_LANGUAGES = ['gu', 'hi', 'en'];

// THESE MUST BE SYNCED WITH DUK-AADHAR VALID_RETURN_CONDITIONS
export const RETURN_CONDITIONS = [
  {
    type: 'return_condition',
    condition_days: '5',
    label: 'Easy 5 days return',
    is_active: true,
    key: '1',
  },
  {
    type: 'return_condition',
    condition_days: '3',
    label: '3 days Return (Wrong/damaged items only)',
    is_active: true,
    key: '2',
  },
  {
    type: 'return_condition',
    condition_days: '3',
    label: 'Easy 3 days return',
    is_active: true,
    key: '3',
  },
  {
    type: 'exchange_condition',
    condition_days: '5',
    label: 'Exchange Only within 5 days',
    is_active: true,
    key: '4',
  },
  {
    type: 'exchange_condition',
    condition_days: '3',
    label: 'Exchange Only within 3 days',
    is_active: true,
    key: '5',
  },
  {
    type: 'return_condition',
    condition_days: '0',
    label: 'This product cannot be returned',
    is_active: true,
    key: '1050',
  },
];

export const WA_REPLY_AND_BAG_WIDGET_TITLE = 'WhatsApp reply and Bag';

export const COLLECTION_POSTER_IMAGES = {
  COLLECTION_299: 'https://s3.ap-south-1.amazonaws.com/nushop-catalogue/1648533035619_5ZUAOBDRWS_2022-03-29_1.jpg',
  COLLECTION_499: 'https://s3.ap-south-1.amazonaws.com/nushop-catalogue/1648533035619_ND0OYS8ZKE_2022-03-29_2.jpg',
  COLLECTION_999: 'https://s3.ap-south-1.amazonaws.com/nushop-catalogue/1648533035619_YLA83KY4H4_2022-03-29_3.jpg',
};

export const DISCOUNT_TYPES = {
  PERCENT: 'percentage',
  FIXED: 'fixed',
};

export const PAYMENT_MODE = {
  COD: 'cod',
  PARTIAL_COD: 'partial-cod',
  PREPAID: 'prepaid',
  ONLINE: 'online',
};

export const TESTIMONIAL_SORT_BY = {
  DEFAULT: 'default',
  PRODUCT_WISE: 'product_wise',
};

export const TESTIMONIAL_FILTER_BY = {
  DEFAULT: 'default',
  PRODUCT_WISE: 'product_wise',
};

export const ALLOWED_TEMPLATE_TYPES_BY_PAGE = {
  [PAGE_TYPES.HOME_PAGE]: [
    TEMPLATE_TYPES.BANNER_CROSS_LINK,
    TEMPLATE_TYPES.BANNER_CROSS_LINK_FULL,
    TEMPLATE_TYPES.CATEGORY_GROUP,
    TEMPLATE_TYPES.COLLECTION_POSTERS,
    TEMPLATE_TYPES.CONTENT_TEXT,
    TEMPLATE_TYPES.CONTENT_TEXT_AND_MEDIA,
    TEMPLATE_TYPES.PRODUCT_GROUP,
    TEMPLATE_TYPES.TESTIMONIAL,
    TEMPLATE_TYPES.VIDEO_CROSS_LINK,
    TEMPLATE_TYPES.WEBSITE_NAVIGATOR,
    TEMPLATE_TYPES.PRODUCT_TESTIMONIAL,
    TEMPLATE_TYPES.ICON_DESCRIPTION,
    TEMPLATE_TYPES.PRODUCT_LIST,
  ],
  [PAGE_TYPES.PRODUCT_PAGE]: [
    TEMPLATE_TYPES.BANNER_CROSS_LINK,
    TEMPLATE_TYPES.BANNER_CROSS_LINK_FULL,
    TEMPLATE_TYPES.CATEGORY_GROUP,
    TEMPLATE_TYPES.COLLECTION_POSTERS,
    TEMPLATE_TYPES.CONTENT_TEXT,
    TEMPLATE_TYPES.CONTENT_TEXT_AND_MEDIA,
    TEMPLATE_TYPES.PRODUCT_GROUP,
    TEMPLATE_TYPES.TESTIMONIAL,
    TEMPLATE_TYPES.VIDEO_CROSS_LINK,
    TEMPLATE_TYPES.RATING_AND_REVIEW,
    TEMPLATE_TYPES.SALES_ACTIVITY_WIDGET,
    TEMPLATE_TYPES.WEBSITE_NAVIGATOR,
    TEMPLATE_TYPES.PRODUCT_TESTIMONIAL,
    TEMPLATE_TYPES.ICON_DESCRIPTION,
    TEMPLATE_TYPES.PRODUCT_LIST,
    TEMPLATE_TYPES.PRODUCT_MEDIA,
    TEMPLATE_TYPES.PRODUCT_TITLE,
    TEMPLATE_TYPES.PRODUCT_SIZE_PICKER,
    TEMPLATE_TYPES.PRODUCT_COLOUR_PICKER,
    TEMPLATE_TYPES.WA_REPLY_AND_BAG,
    TEMPLATE_TYPES.PRODUCT_DESCRIPTION,
    TEMPLATE_TYPES.PRODUCT_ATTRIBUTES,
  ],
  [PAGE_TYPES.FEATURED_PAGE]: [
    TEMPLATE_TYPES.BANNER_CROSS_LINK,
    TEMPLATE_TYPES.BANNER_CROSS_LINK_FULL,
    TEMPLATE_TYPES.CATEGORY_GROUP,
    TEMPLATE_TYPES.COLLECTION_POSTERS,
    TEMPLATE_TYPES.CONTENT_TEXT,
    TEMPLATE_TYPES.CONTENT_TEXT_AND_MEDIA,
    TEMPLATE_TYPES.PRODUCT_GROUP,
    TEMPLATE_TYPES.TESTIMONIAL,
    TEMPLATE_TYPES.VIDEO_CROSS_LINK,
    TEMPLATE_TYPES.WEBSITE_NAVIGATOR,
    TEMPLATE_TYPES.PRODUCT_TESTIMONIAL,
    TEMPLATE_TYPES.ICON_DESCRIPTION,
    TEMPLATE_TYPES.PRODUCT_LIST,
  ],
  [PAGE_TYPES.ORDER_STATUS_PAGE]: [
    TEMPLATE_TYPES.BANNER_CROSS_LINK,
    TEMPLATE_TYPES.BANNER_CROSS_LINK_FULL,
    TEMPLATE_TYPES.CATEGORY_GROUP,
    TEMPLATE_TYPES.COLLECTION_POSTERS,
    TEMPLATE_TYPES.CONTENT_TEXT,
    TEMPLATE_TYPES.CONTENT_TEXT_AND_MEDIA,
    TEMPLATE_TYPES.PRODUCT_GROUP,
    TEMPLATE_TYPES.TESTIMONIAL,
    TEMPLATE_TYPES.VIDEO_CROSS_LINK,
    TEMPLATE_TYPES.WEBSITE_NAVIGATOR,
    TEMPLATE_TYPES.PRODUCT_TESTIMONIAL,
    TEMPLATE_TYPES.ICON_DESCRIPTION,
    TEMPLATE_TYPES.PRODUCT_LIST,
  ],
  [PAGE_TYPES.CUSTOMISATION_CATALOGUE]: [
    TEMPLATE_TYPES.CUSTOMISATION_TEXT,
    TEMPLATE_TYPES.CUSTOMISATION_NUMBER,
    TEMPLATE_TYPES.CUSTOMISATION_IMAGES,
    TEMPLATE_TYPES.CUSTOMISATION_MULTI_SELECT,
    TEMPLATE_TYPES.CUSTOMISATION_SINGLE_SELECT,
  ],
};

export const ALLOWED_EDITABLE_PRODUCT_TEMPLATE_TYPES = [
  TEMPLATE_TYPES.BANNER_CROSS_LINK,
  TEMPLATE_TYPES.BANNER_CROSS_LINK_FULL,
  TEMPLATE_TYPES.CATEGORY_GROUP,
  TEMPLATE_TYPES.COLLECTION_POSTERS,
  TEMPLATE_TYPES.CONTENT_TEXT,
  TEMPLATE_TYPES.CONTENT_TEXT_AND_MEDIA,
  TEMPLATE_TYPES.PRODUCT_GROUP,
  TEMPLATE_TYPES.TESTIMONIAL,
  TEMPLATE_TYPES.VIDEO_CROSS_LINK,
  TEMPLATE_TYPES.RATING_AND_REVIEW,
  TEMPLATE_TYPES.SALES_ACTIVITY_WIDGET,
  TEMPLATE_TYPES.WEBSITE_NAVIGATOR,
  TEMPLATE_TYPES.PRODUCT_TESTIMONIAL,
  TEMPLATE_TYPES.PRODUCT_MEDIA,
  TEMPLATE_TYPES.ICON_DESCRIPTION,
  TEMPLATE_TYPES.PRODUCT_LIST,
];

export const PRODUCT_GROUP_SORT_FILTER_TYPE = {
  DEFAULT: 'default',
  PRODUCT_WISE: 'product_wise',
};

export const TEMPLATE_FIT_TO_CONTAINER = {
  CONTAIN: 'contain',
  COVER: 'cover',
};

export const WEBSITE_THEMES = {
  LINE: 'line',
  PREMIUM: 'premium',
  COSMETICS: 'cosmetics',
  GLASSES: 'glasses',
  BASIC: 'basic',
};

export const VIEW_PORT = {
  MOBILE: 'mobile',
  WEB: 'web',
};
