//utils
import sarthi from '@/utils/sarthi.utils';

//Url Wrapper
const { getCDNUrlFromSourceUrl: getCDNVideoUrlFromSourceUrl } = sarthi.common.services.videos;
const { getCDNUrlFromSourceUrl } = sarthi.common.services.images;
/**
 * Defines where the page will appear on app/web. Is stored in page_type field of Page collection.
 */
export const PAGE_TYPES = {
  HOME_PAGE: 'home_page',
  PRODUCT_PAGE: 'product_page',
  FEATURED_PAGE: 'featured_page',
  ORDER_STATUS_PAGE: 'order_status_page',
  CUSTOMISATION_CATALOGUE: 'customisation_catalogue',
};

export const NS_COOKIE_KEYS = {
  NS_RECENTLY_VIEWED: '__ns_recently_viewed',
};

export const PAGE_ID_TO_DISPLAY_NAME_MAP = {
  'new-arrivals': 'New Arrivals',
  'best-sellers': 'Best Sellers',
  'all-products': 'All Products',
};

export const FIXED_FEATURE_PAGES = ['new-arrivals', 'best-sellers', 'all-products'];

// List of widgets that will be shown in first page
export const PAGE_ZERO_WIDGETS = [
  'product_media',
  'product_title',
  'product_colour_picker',
  'product_size_picker',
  'wa_reply_and_bag',
  'trust_markers',
  'product_description',
  'product_attributes',
  'coupons',
  'rating_and_review',
  'category_group',
];

export const COUPON_FIELDS = [
  'short_id',
  'code',
  'coupon_type',
  'discount_type',
  'discount',
  'max_discount',
  'min_order_value',
  'product_ids',
  'product_ids_invalid',
  'expiresAt',
  'fake_expiry_mins',
];

export const COUPON_FIELDS_SUPERSET = [
  'short_id',
  'code',
  'discount',
  'product_ids',
  'min_order_value',
  'globally_visible',
  'only_for_first_web_order',
  'only_for_new_customer',
  'discount_type',
  'max_discount',
  'is_active',
  'expiresAt',
  'coupon_type',
  'product_ids_invalid',
  'fake_expiry_mins',
];

export const DEFAULT_FORWARD_CTA = {
  gu: 'મને લાગે છે કે આ wmall ની પ્રોડક્ટ તમને ખુબ ગમશે.  આ પ્રોડક્ટ હમણાં સેલ માં  ડિસ્કાઉન્ટ માં મળે છે. અહીંયા ક્લિક કરીને  તમે ઓફર જોઈ શકો છો',
  hi: 'डिस्काउंट पर उपलब्ध हमारे इस प्रोडक्ट की डिटेल्स देखने के लिए यहाँ क्लिक करें, हम आशा करते हैं आपको पसंद आएगा।',
};

export const DEFAULT_PLATFORM = 'web';

export const ALLOWED_PAYMENTS = ['paytm', 'cod'];

export const CUSTOMISATION_PAGE_DEFAULT_TITLE = 'Would you like to personalise your product ?';

export const TEMPLATE_FIELDS_TO_BE_COPIED = [
  'short_id',
  'seller_id',
  'type',
  'sub_type',
  'title',
  'sub_title',
  'customisation_instructions',
  'add_on_price',
  'layout',
  'product_group',
  'tagged_entity',
  'banner_cross_link',
  'custom_style',
  'background_image',
  'is_visible',
  'is_active',
  'refreshed_at',
  'content_html',
  'pending_media_upload',
  'customisation_options',
  'template_settings',
];

// ---Checkout Flow  starting from here

// done
const WHATSAPP_PLACE_ORDER = {
  data: [
    {
      short_id: 'login_page',
      type: 'checkout',
      name: 'login',
      url_slug: 'login',
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 'u7DrrPjh',
        },
        {
          type: 'page_cta',
          layout: 'widget',
          short_id: 'XSFKFrao',
          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
    },
    {
      short_id: 'request_address_page',
      type: 'checkout',
      name: 'Request-Address',
      url_slug: 'address',
      flow_name: 'Address',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: '8rw39cjC',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: 'VPkQUKps',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
            // show_price : true
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'fzMH9Zvu',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'mbe0dLWZ',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'aox3O-NHG',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'w6oHB8kP',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'cEFoWjfY',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '2j8fikvg',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: false,
          },
        },
        {
          short_id: 'G4hcFlW8',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'y8vOtOxR',
          type: 'page_cta',
          layout: 'widget',

          action: 'waPlaceOrder',
          widget_settings: {
            title: 'Whatsapp Checkout',
            show_price: true,
            showWaIcon: true,
          },
        },
      ],
    },
  ],
  preview_urls: [
    'https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1716273118627_FQ5YQ8A7G5_2024-05-21_1.png',
    'https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1716273222716_NR210HDE9T_2024-05-21_1.png',
    'https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1716273253058_JNFVQS0R2A_2024-05-21_1.png',
  ],
  page_short_id: 'IQHEcgdx',
  flow_title: 'Whatsapp Checkout',
  type: 'default',
};

//done
const COD_OPTIMISE_FLOW = {
  data: [
    {
      short_id: 'request_number_page',
      type: 'checkout',
      name: 'Login',
      url_slug: 'mobile-no', //to be decided
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 'sTgp12g2',
        },
        {
          short_id: 'bWhDiC3A',
          type: 'page_cta',
          layout: 'widget',
          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
    },
    {
      short_id: 'request_address_page',
      type: 'checkout',
      name: 'Address',
      url_slug: 'request-address', // to be decided
      flow_name: 'Address',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'S7xnJ5N6',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: 'sNJPpcCX',
          type: 'page_cta',
          layout: 'widget',
          action: 'next',
          widget_settings: {
            title: 'Continue',
            // show_price : true
          },
        },
      ],
      popup_entites: [
        {
          type: 'duplicate_order',
          visible_on: 'un-mount',
          short_id: 'yxWbpqeD',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          type: 'payment_method',
          layout: 'widget',
          short_id: 'LswGRdnV',
          is_skippable: false,
        },
        {
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
          short_id: 'CVfAV3pW',
        },
        {
          short_id: 'gLiLkSHIR',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
          short_id: 'IJbYQxbq',
        },
        {
          short_id: 'QVezx4W3',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'P1ybBe7T',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: false,
          },
        },
        {
          short_id: '71pasQmJ',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },

        {
          short_id: 'eAmWcFIE',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
            // showWaIcon: true,
          },
        },
      ],
      popup_entites: [
        {
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          short_id: 'utFVjQdK',
          is_skippable_on_login: false,
        },
        {
          type: 'push_online',
          visible_on: 'un-mount',
          short_id: 'kT30YYAw',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'otp_page',
      type: 'checkout',
      name: 'OTP',
      flow_name: 'Payment',
      url_slug: 'otp-verify',
      is_skippable_on_login: true,
      entites: [
        {
          short_id: 'WBZITeWL',
          type: 'otp',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '6AC3K6BY',
          type: 'page_cta',
          layout: 'widget',

          action: 'placeOrder',
          widget_settings: {
            title: 'Confirm',
            // showWaIcon: true,
          },
        },
      ],
    },
  ],
  flow_title: 'COD Optimised',
  type: 'default',
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837300351_R8RUU8V8FG_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837496773_J0MG46X7Q0_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837528654_R2C4Z4468D_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837584255_BX3WLLAUKR_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837741138_8CKCVP073P_2024-07-01_1.png'),
  ],
  page_short_id: 'BACAcdsj',
};

const COD_PAYMENT_GATEWAY_OPTIMISATION = {
  data: [
    {
      short_id: 'OHMwxKVl',
      type: 'checkout',
      name: 'Login',
      url_slug: 'mobile-no', //to be decided
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 'nU4x8Ix_',
        },
        {
          short_id: 'WbN8QOeM',
          type: 'page_cta',
          layout: 'widget',
          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
    },
    {
      short_id: '5StMRlDB',
      type: 'checkout',
      name: 'Address',
      url_slug: 'request-address', // to be decided
      flow_name: 'Address',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: '1T6OnUpU',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: 'zp8RbuFM',
          type: 'page_cta',
          layout: 'widget',
          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          type: 'duplicate_order',
          visible_on: 'un-mount',
          short_id: 'obYzH7iw',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: '8v5owx5f',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          type: 'payment_method_with_gateway',
          layout: 'widget',
          short_id: 'Ar58y8fl',
          is_skippable: false,
        },
        {
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
          short_id: 'bYMXHntz',
        },
        {
          short_id: 'CZ0x6pWi',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
          short_id: 'KpP-qqej',
        },
        {
          short_id: 'IJj2Zind',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'Gm3JBTnH',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: false,
          },
        },
        {
          short_id: 'MwcfXlRS',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },

        {
          short_id: 'cuUlzmk7',
          type: 'page_cta',
          layout: 'widget',
          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
          },
        },
      ],
      popup_entites: [
        {
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          short_id: 'PJBdxCyF',
          is_skippable_on_login: false,
        },
        {
          type: 'push_online',
          visible_on: 'un-mount',
          short_id: 'kL9YL94l',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'lA37JWwH',
      type: 'checkout',
      name: 'OTP',
      flow_name: 'Payment',
      url_slug: 'otp-verify',
      is_skippable_on_login: true,
      entites: [
        {
          short_id: 'khqThpSE',
          type: 'otp',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'Xk0HtKnx',
          type: 'page_cta',
          layout: 'widget',
          action: 'placeOrder',
          widget_settings: {
            title: 'Confirm',
          },
        },
      ],
    },
  ],
  flow_title: 'COD Optimised with Payment Gateway Optimisation',
  type: 'default',
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837300351_R8RUU8V8FG_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837496773_J0MG46X7Q0_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837528654_R2C4Z4468D_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837584255_BX3WLLAUKR_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837741138_8CKCVP073P_2024-07-01_1.png'),
  ],
  page_short_id: 'YhBPAfZl',
};

//done
const ONLINE_OPTIMISE_FLOW = {
  data: [
    {
      short_id: 'request_number_page',
      type: 'checkout',
      name: 'Mobile no.',
      url_slug: 'mobile-no',
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 'Ig1G5ypL',
        },
        {
          short_id: 'LFuln9eH',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
    },
    {
      short_id: 'request_address',
      type: 'checkout',
      name: 'Request-Address',
      url_slug: 'Address',
      flow_name: 'Address',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: '9cWvSsj3',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: 'rJ9jmOmi',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
            // show_price : true
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'cKJkRMSm',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'PNEXVoey',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'BmJ66JBbF',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '6Sfkq4c7',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '86oko2UJ',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'CQtbg5zd',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: false,
          },
        },
        {
          short_id: 'pmuGW4KK',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'ZmpM9DJ3',
          type: 'payment_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'A0XdLwLB',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'next',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
          },
        },
      ],
    },
    {
      short_id: 'payment_gateway',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          type: 'payment_method_expandable',
          layout: 'widget',
          is_skippable: false,
          short_id: 'tHPg3APR',
        },
        {
          short_id: '6lZKOQwq',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'smhXi0D5',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Proceed',
            show_price: true,
          },
        },
      ],
      popup_entites: [
        {
          short_id: '3rbB0T6m',
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
        {
          short_id: 'W52q3Do4',
          type: 'push_online',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'otp_verification_page',
      type: 'checkout',
      name: 'otp-verification',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: true,
      entites: [
        {
          short_id: 'Q1oN2d3t',
          type: 'otp',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'lv1oaJIZ',
          type: 'page_cta',
          layout: 'widget',

          action: 'placeOrder',
          widget_settings: {
            title: 'Confirm',
          },
        },
      ],
    },
  ],
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837818022_K4AHNQ5A10_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837849223_7E5G0J4RRM_2024-07-01_1.png'),
  ],
  flow_title: 'Online Optimised',
  type: 'default',
  page_short_id: 'KsjUszPa',
};

//done
const PAYMENT_METHOD_OPTIMISE_FLOW = {
  data: [
    {
      short_id: 'request_number_page',
      type: 'checkout',
      name: 'Mobile no.',
      url_slug: 'mobile-no',
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 's2C6VBMy',
        },
        {
          short_id: 'q8H78hjy',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
    },
    {
      short_id: 'request_address_page',
      type: 'checkout',
      name: 'Request-Address',
      url_slug: 'Address',
      flow_name: 'Address',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'oiCPEq2r',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: 'nOGsdfqC',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
            // show_price : true
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'QwG0qdEH',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'VVJwdZCk',
          type: 'payment_method_expandable',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'SyeiQOmW',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '00gQr-V-S',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '0PSlgk9J',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '5cf7B9Ud',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'YrKlboMN',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: true,
          },
        },
        {
          short_id: 'q5fsCOYK',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'e1WyN1Ud',
          type: 'payment_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'xrivVd60',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'et58oPpr',
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
        {
          short_id: 'xsTSS7KG',
          type: 'push_online',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'otp_verification_page',
      type: 'checkout',
      name: 'otp-verification',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: true,
      entites: [
        {
          short_id: 'QracqVs9',
          type: 'otp',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'aWnxrJ65',
          type: 'page_cta',
          layout: 'widget',

          action: 'placeOrder',
          widget_settings: {
            title: 'Confirm',
          },
        },
      ],
    },
  ],
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837941596_RXZHFILVQZ_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837988507_F2RQ982AD8_2024-07-01_1.png'),
  ],
  flow_title: 'Payment Method Optimised Flow',
  type: 'default',
  page_short_id: 'PsjULzPa',
};

//done
const FAST_LOGIN_WITH_COD_OPTIMISE_FLOW = {
  data: [
    {
      short_id: 'request_number_page',
      type: 'checkout',
      name: 'Login',
      url_slug: 'mobile-no', //to be decided
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: '060IHISs',
        },
        {
          short_id: 'oEi1xsxp',
          type: 'page_cta',
          layout: 'widget',
          action: 'next',
          widget_settings: {
            title: 'Get OTP',
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'BDRgIkMF',
          type: 'otp_popup',
          visible_on: 'un-mount',
          is_skippable_on_login: true,
        },
      ],
    },
    {
      short_id: 'request_address_page',
      type: 'checkout',
      name: 'Address',
      url_slug: 'request-address', // to be decided
      flow_name: 'Address',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: '163njxgt',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: '3u0zVey3',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
            // show_price : true
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'ZvCBKog1',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          type: 'payment_method',
          layout: 'widget',
          short_id: 'ua1kJTN0',
          is_skippable: false,
        },
        {
          short_id: 'oaAbmtaA',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'cSPohQy2q',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'qAXDtaXv',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '8YVXoCiC',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'JiHgr7Ij',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: true,
          },
        },
        {
          short_id: 'csVDppO0',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },

        {
          short_id: 'seQvBPw2',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
            // showWaIcon: true,
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'TnZzGClW',
          type: 'push_online',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
        {
          short_id: '7mUltTMv',
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
  ],
  flow_title: 'Fast login with COD optimised',
  type: 'default',
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838052271_Q5WQUMR8Z4_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838088629_3ETBOYJ77C_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838140399_QLPYZCLZ9L_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838173205_W5JBP4OADN_2024-07-01_1.png'),
  ],
  page_short_id: 'BSJsnxIp',
};

//done
const FAST_LOGIN_WITH_ONLINE_OPTIMISE_FLOW = {
  data: [
    {
      short_id: 'request_number_page',
      type: 'checkout',
      name: 'Login',
      url_slug: 'mobile-no', //to be decided
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: '3ycS2HAz',
        },
        {
          short_id: 'VBtQny7U',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'rtg5VAf4',
          type: 'otp_popup',
          visible_on: 'un-mount',
          is_skippable_on_login: true,
        },
      ],
    },
    {
      short_id: 'request_address_page',
      type: 'checkout',
      name: 'Address',
      url_slug: 'request-address', // to be decided
      flow_name: 'Address',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 't2MIMjKp',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: 'gF9QjH1U',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
            // show_price : true
          },
        },
      ],
    },
    {
      short_id: 'payment_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'VnvANJFQ',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'EMJSFtsUV',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'EGQhczzh',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'htp4eR9X',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'QhL0foqC',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: true,
          },
        },
        {
          short_id: 'IAZuACI1',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '5VdTwgv3',
          type: 'payment_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '3OPVFp91',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'next',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
            // showWaIcon: true,
          },
        },
      ],
      popup_entites: [
        {
          short_id: '31qzxfZy',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_gateway_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'RDoLsF0m',
          type: 'payment_method_expandable',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'PGH7bY6S',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'yMvf6eXh',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Proceed',
            show_price: true,
            // showWaIcon: true,
          },
        },
      ],
      popup_entites: [
        {
          short_id: '8ER2be02',
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
        {
          short_id: 'XBuY8XN8',
          type: 'push_online',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
  ],
  flow_title: 'Fast login with Online Optimised',
  type: 'default',
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838052271_Q5WQUMR8Z4_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838088629_3ETBOYJ77C_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837818022_K4AHNQ5A10_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837849223_7E5G0J4RRM_2024-07-01_1.png'),
  ],
  page_short_id: 'QlJsnx0p',
};

//done
const FAST_LOGIN_WITH_PAYMENT_METHOD_OPTIMISE_FLOW = {
  data: [
    {
      short_id: 'request_number_page',
      type: 'checkout',
      name: 'Login',
      url_slug: 'mobile-no', //to be decided
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 'tVpDTAns',
        },
        {
          short_id: 'Jv6S4fUh',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          short_id: '7NM0SSUV',
          type: 'otp_popup',
          visible_on: 'un-mount',
          is_skippable_on_login: true,
        },
      ],
    },
    {
      short_id: 'request_address_page',
      type: 'checkout',
      name: 'Address',
      url_slug: 'request-address', // to be decided
      flow_name: 'Address',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'lSFJpy1A',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: 'FkDH296k',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
            // show_price : true
          },
        },
      ],
      popup_entites: [
        {
          short_id: '2t1hGXcd',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'ji7TupiL',
          type: 'payment_method_expandable',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'S82xMwUh',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'qrmJtqlm5',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'X6r93TP9',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'Mn9K3yRD',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'WzHsP8Kf',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: true,
          },
        },
        {
          short_id: 'GFdJ9WO3',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'mYhSXDL0',
          type: 'payment_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'jTFLH1Fw',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
            // showWaIcon: true,
          },
        },
      ],
      popup_entites: [
        {
          short_id: '2Gaot1Fz',
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
        {
          short_id: 'VDIylso0',
          type: 'push_online',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
  ],
  flow_title: 'Fast login with Payment Method Optimised',
  type: 'default',
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838052271_Q5WQUMR8Z4_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838088629_3ETBOYJ77C_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837988507_F2RQ982AD8_2024-07-01_1.png'),
  ],
  page_short_id: 'JJJLnx0p',
};

// done
const FAST_LOGIN_ADDRESS_AUTOSKIP_WITH_COD_OPTIMISED = {
  data: [
    {
      short_id: 'request_number_page',
      type: 'checkout',
      name: 'login',
      url_slug: 'login',
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 'qv2faPXf',
        },
        {
          short_id: 'RSlLdnS3',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'next',
          widget_settings: {
            title: 'Get OTP',
          },
        },
      ],
      popup_entites: [
        {
          short_id: '1Q74EMbw',
          type: 'otp_popup',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'request_address_page',
      type: 'checkout',
      name: 'address',
      url_slug: 'Address',
      flow_name: 'Address',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'request_address',
          layout: 'widget',
          short_id: 'LyNKzDpr',
          is_skippable_on_login: true,
        },
        {
          short_id: 'K4zWgJRS',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          short_id: 's57AdDYd',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'gIcUPXuF',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: true,
          },
        },
        {
          short_id: 'UEAD4PeS',
          type: 'payment_method',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'jRoGTsCJ',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'FVIJkcxr5',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'KJDfZx8i',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'Cwwwp58N',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '5AUZYLQf',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '9TOAmn7xg',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'rfAIhOaFu',
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
        {
          short_id: 'cqS5rJoji',
          type: 'push_online',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
  ],
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838052271_Q5WQUMR8Z4_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838088629_3ETBOYJ77C_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838427293_0BDPRAJPHK_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838479381_GUEY3HSORO_2024-07-01_1.png'),
  ],
  flow_title: 'Fast login and Address autoskip with COD optimised',
  type: 'default',
  page_short_id: 'KsjUszna',
};

// done
const FAST_LOGIN_ADDRESS_AUTOSKIP_WITH_ONLINE_OPTIMISED = {
  data: [
    {
      short_id: 'request_number_page',
      type: 'checkout',
      name: 'login',
      url_slug: 'login',
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: '6jXWKSXhb',
        },
        {
          short_id: 't8AcEsLw8',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'ufXJOh2Zb',
          type: 'otp_popup',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'request_address_page',
      type: 'checkout',
      name: 'address',
      url_slug: 'Address',
      flow_name: 'Address',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'request_address',
          layout: 'widget',
          short_id: 'LULlWxnuS',
          is_skippable_on_login: true,
        },
        {
          short_id: 'PxHi9ptNj',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'yuWqclwX1',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'SJpfzmA8f',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: true,
          },
        },
        {
          short_id: 'EY3U8OFmd',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'O6J_Pc4fR',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '8wvebhc32',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'ueyMkztKL',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'ZrImimark',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '3wY4TtEgN',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'next',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
          },
        },
      ],
    },
    {
      short_id: 'payment_gateway_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'o4cQ3LgMX',
          type: 'payment_method_expandable',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'rVGvI1CW4',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'zyUnzheYj',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Proceed',
            show_price: true,
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'NFexPt6KV',
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
        {
          short_id: 'ZaXZOiDDh',
          type: 'push_online',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
  ],
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838052271_Q5WQUMR8Z4_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838088629_3ETBOYJ77C_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838427293_0BDPRAJPHK_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838479381_GUEY3HSORO_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838568927_X23RCM5PJO_2024-07-01_1.png'),
  ],
  flow_title: 'Fast login and Address autoskip with Online Optimised',
  type: 'default',
  page_short_id: 'LsmZopnX',
};

//done
const FAST_LOGIN_ADDRESS_AUTOSKIP_WITH_PAYMENT_METHOD_OPTIMISED = {
  data: [
    {
      short_id: 'request_number_page',
      type: 'checkout',
      name: 'login',
      url_slug: 'login',
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 'vo0gIqWJ6',
        },
        {
          short_id: 'rJLFY1Aic',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'kVmQ2AcyY',
          type: 'otp_popup',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'request_address_page',
      type: 'checkout',
      name: 'address',
      url_slug: 'Address',
      flow_name: 'Address',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'request_address',
          layout: 'widget',
          short_id: 'JOlCGVXVW',
          is_skippable_on_login: true,
        },
        {
          short_id: 'TPZGO9HIA',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'tmSOXoAxv',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: '1kOM3YTgx',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: true,
          },
        },
        {
          short_id: 'JTEb9BCY8',
          type: 'payment_method_expandable',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'KvDCJHhkT',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'l7U8MSw6j',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'rmafuFehu',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'W7mNxXZ8V',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'YpKvrHMAS',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'CbJLGqbFs',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'EevOBHswE',
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
        {
          short_id: '9w1kOEfTY',
          type: 'push_online',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
  ],
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838052271_Q5WQUMR8Z4_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838088629_3ETBOYJ77C_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838427293_0BDPRAJPHK_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838479381_GUEY3HSORO_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838568927_X23RCM5PJO_2024-07-01_1.png'),
  ],
  flow_title: 'Fast login and Address autoskip with Payment Method Optimised',
  type: 'default',
  page_short_id: 'Psm0opnX',
};

// done
const SINGLE_PAGE_USER_DETAILS_WITH_COD_OPTIMISED = {
  data: [
    {
      short_id: 'request_details_page',
      type: 'checkout',
      name: 'Details',
      url_slug: 'details',
      flow_name: 'Details',
      is_skippable_on_login: false,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 'cN313Q6li',
        },
        {
          short_id: 'RHnbXmw2W',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: 'RhDJYbEvv',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'q7ltx3y0P',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_method_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment-method',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'X49vs0Mru',
          type: 'payment_method',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'NZyhsC2n1',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'Lz17tKGcE',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '1QZLXrSFS',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'z547q3xMT',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'unwd0UO0Q',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: true,
          },
        },
        {
          short_id: 'RWJPkSMbo',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '6dkTtneLJ',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'H8zIFqPIP',
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
        {
          short_id: 'Ay0PAT68Y',
          type: 'push_online',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'otp_verification_page',
      type: 'checkout',
      name: 'otp-verification',
      url_slug: 'otp-verify',
      flow_name: 'Payment',
      is_skippable_on_login: true,
      entites: [
        {
          short_id: 'opXWH01Qa',
          type: 'otp',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'nZ5Zgoh6R',
          type: 'page_cta',
          layout: 'widget',

          action: 'placeOrder',
          widget_settings: {
            title: 'Confirm',
            // showWaIcon: true,
          },
        },
      ],
    },
  ],
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838757657_857EMA96F2_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838809918_T4PJNDCT1P_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838854855_12IS4I88S4_2024-07-01_1.png'),
  ],
  flow_title: 'Single Page User Details with COD Optimised',
  type: 'default',
  page_short_id: 'P0jUszna',
};

//done
const SINGLE_PAGE_USER_DETAILS_WITH_ONLINE_OPTIMISED = {
  data: [
    {
      short_id: 'request_details_page',
      type: 'checkout',
      name: 'Details',
      url_slug: 'details',
      flow_name: 'Details',
      is_skippable_on_login: false,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 'MJQQb5h8r',
        },
        {
          short_id: 'ju4tXcy8E',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: 'fIx57Tv94',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'ubAOGqtCE',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment-checkout',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'Gd62bxUMW',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '4ATNydjk3',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'mKs0yrBwW',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'HzdtxRWtF',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'hFJR9nQ06',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: true,
          },
        },
        {
          short_id: 'FyuzbnvSV',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'Um1A0qXdK',
          type: 'payment_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'r85jVa0Vz',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'next',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
          },
        },
      ],
    },
    {
      short_id: 'payment_method_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment-option',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'mAwXU9ynj',
          type: 'payment_method_expandable',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'SN5IoTwgY',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'gCOBGxSTT',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Proceed',
            show_price: true,
          },
        },
      ],
      popup_entites: [
        {
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          short_id: 'mtB1jxI87',
          is_skippable_on_login: false,
        },
        {
          type: 'push_online',
          visible_on: 'un-mount',
          short_id: 'ForemAvo5',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'otp_verification_page',
      type: 'checkout',
      name: 'otp-verification',
      url_slug: 'otp-verify',
      flow_name: 'Payment',
      is_skippable_on_login: true,
      entites: [
        {
          short_id: 'UIX2dFLCq',
          type: 'otp',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'IF3MxTJgP',
          type: 'page_cta',
          layout: 'widget',

          action: 'placeOrder',
          widget_settings: {
            title: 'Confirm',
            // showWaIcon: true,
          },
        },
      ],
    },
  ],
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838757657_857EMA96F2_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838809918_T4PJNDCT1P_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837818022_K4AHNQ5A10_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837849223_7E5G0J4RRM_2024-07-01_1.png'),
  ],
  flow_title: 'Single Page User Details with Online Optimised',
  type: 'default',
  page_short_id: 'K0jUseOa',
};

// done
const SINGLE_PAGE_USER_DETAILS_WITH_PAYMENT_METHOD_OPTIMISED = {
  data: [
    {
      short_id: 'request_details_page',
      type: 'checkout',
      name: 'Details',
      url_slug: 'details',
      flow_name: 'Details',
      is_skippable_on_login: false,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: '1b95fcCq1',
        },
        {
          short_id: 'qkRGN0v39',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: '3NMawTNiB',
          type: 'page_cta',
          layout: 'widget',
          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          short_id: 'KpNsfJ4Kl',
          type: 'duplicate_order',
          visible_on: 'un-mount',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'payment_method_page',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment-method',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'UKPe2uoD5',
          type: 'payment_method_expandable',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'odBl6JU8L',
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '-Kq5Muoni',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'M8OYHLQTq',
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'pRuiz0DmI',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'zN2U4l7fu',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: true,
          },
        },
        {
          short_id: 'EzBQdo28D',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'epGxL9oKj',
          type: 'payment_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'FVdJ0dISL',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
          },
        },
      ],
      popup_entites: [
        {
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          short_id: '0E2azQYAp',
          is_skippable_on_login: false,
        },
        {
          type: 'push_online',
          visible_on: 'un-mount',
          short_id: '1H6mwYc8B',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'otp_verification_page',
      type: 'checkout',
      name: 'otp-verification',
      url_slug: 'otp-verify',
      flow_name: 'Payment',
      is_skippable_on_login: true,
      entites: [
        {
          short_id: 'NLybmbMed',
          type: 'otp',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: '1VKwoulUY',
          type: 'page_cta',
          layout: 'widget',

          action: 'placeOrder',
          widget_settings: {
            title: 'Confirm',
            // showWaIcon: true,
          },
        },
      ],
    },
  ],
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838757657_857EMA96F2_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719838809918_T4PJNDCT1P_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837818022_K4AHNQ5A10_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837849223_7E5G0J4RRM_2024-07-01_1.png'),
  ],
  flow_title: 'Single Page User Details with Payment Method Optimised',
  type: 'default',
  page_short_id: 'P0jUsexa',
};

//done
const PAYMENT_UI_VARIATION_WITH_COD_OPTIMISED = {
  data: [
    {
      short_id: 'Orq6E1on',
      type: 'checkout',
      name: 'Login',
      url_slug: 'mobile-no',
      flow_name: 'Login',
      is_skippable_on_login: true,
      entites: [
        {
          type: 'contact_details',
          layout: 'widget',
          is_skippable_on_login: true,
          short_id: 'Nb0WIEQB',
        },
        {
          short_id: 'fMLVXKCd',
          type: 'page_cta',
          layout: 'widget',
          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
    },
    {
      short_id: 'copZqCKd',
      type: 'checkout',
      name: 'Address',
      url_slug: 'request-address',
      flow_name: 'Address',
      is_skippable_on_login: false,
      entites: [
        {
          short_id: 'qVrZgCEA',
          type: 'request_address',
          layout: 'widget',
          is_skippable_on_login: false,
        },
        {
          short_id: 'Mqty3CK4',
          type: 'page_cta',
          layout: 'widget',
          action: 'next',
          widget_settings: {
            title: 'Continue',
          },
        },
      ],
      popup_entites: [
        {
          type: 'duplicate_order',
          visible_on: 'un-mount',
          short_id: 'nV9jGJvn',
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'gCwJIzhf',
      type: 'checkout',
      name: 'Payment',
      url_slug: 'payment',
      flow_name: 'Payment',
      is_skippable_on_login: false,
      entites: [
        {
          type: 'payment_method',
          layout: 'widget',
          short_id: '46_5Jtvj',
          is_skippable: false,
          widget_settings: {
            show_gif: true,
          },
        },
        {
          type: 'offer_panel',
          layout: 'widget',
          is_skippable: false,
          short_id: 'HaCx2GEf',
        },
        {
          short_id: '0f9Re4tw',
          type: 'acko_verified_trust_marker',
          layout: 'widget',
          is_skippable: false,
        },
        {
          type: 'bag_details',
          layout: 'widget',
          is_skippable: false,
          short_id: '9B_7GYcF',
        },
        {
          short_id: 'Hcl6HZZ9',
          type: 'bill_details',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'cPgfLWoA',
          type: 'delivery_details',
          layout: 'widget',
          is_skippable: false,
          widget_settings: {
            is_changeable: false,
          },
        },
        {
          short_id: 'xFvO6s7X',
          type: 'trust_marker_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'QPpM9DJ2',
          type: 'payment_strip',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'dDD7_P4L',
          type: 'page_cta',
          layout: 'widget',

          action: 'next',
          action_on_logged_in: 'placeOrder',
          widget_settings: {
            title: 'Place Order',
            show_price: true,
            // showWaIcon: true,
          },
        },
      ],
      popup_entites: [
        {
          type: 'partial_cod_pop_up',
          visible_on: 'un-mount',
          short_id: 'TRou6KtP',
          is_skippable_on_login: false,
        },
        {
          type: 'push_online',
          visible_on: 'un-mount',
          short_id: 'J-jZsxoE', // ch
          is_skippable_on_login: false,
        },
      ],
    },
    {
      short_id: 'PhqJKm2g',
      type: 'checkout',
      name: 'OTP',
      flow_name: 'Payment',
      url_slug: 'otp-verify',
      is_skippable_on_login: true,
      entites: [
        {
          short_id: 'a_ar6LkW',
          type: 'otp',
          layout: 'widget',
          is_skippable: false,
        },
        {
          short_id: 'Bw-LQWGC',
          type: 'page_cta',
          layout: 'widget',

          action: 'placeOrder',
          widget_settings: {
            title: 'Confirm',
            // showWaIcon: true,
          },
        },
      ],
    },
  ],
  flow_title: 'Payment UI variation with COD optimised',
  type: 'default',
  preview_urls: [
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837300351_R8RUU8V8FG_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837496773_J0MG46X7Q0_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837528654_R2C4Z4468D_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837584255_BX3WLLAUKR_2024-07-01_1.png'),
    getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1719837741138_8CKCVP073P_2024-07-01_1.png'),
  ],
  page_short_id: 'Mx_xLqmk',
};

export const DEFAULT_CHECKOUT_TEMPLATES = [
  WHATSAPP_PLACE_ORDER, // flow 13
  COD_OPTIMISE_FLOW, // flow 1
  ONLINE_OPTIMISE_FLOW, // flow 2
  PAYMENT_METHOD_OPTIMISE_FLOW, // flow 3
  COD_PAYMENT_GATEWAY_OPTIMISATION, // flow 14
  FAST_LOGIN_WITH_COD_OPTIMISE_FLOW, // flow 4
  FAST_LOGIN_WITH_ONLINE_OPTIMISE_FLOW, // flow 5
  FAST_LOGIN_WITH_PAYMENT_METHOD_OPTIMISE_FLOW, // flow 6
  FAST_LOGIN_ADDRESS_AUTOSKIP_WITH_COD_OPTIMISED, // flow 7
  FAST_LOGIN_ADDRESS_AUTOSKIP_WITH_ONLINE_OPTIMISED, // flow 8
  FAST_LOGIN_ADDRESS_AUTOSKIP_WITH_PAYMENT_METHOD_OPTIMISED, // flow 9
  SINGLE_PAGE_USER_DETAILS_WITH_COD_OPTIMISED, // flow 10
  SINGLE_PAGE_USER_DETAILS_WITH_ONLINE_OPTIMISED, // flow  11
  SINGLE_PAGE_USER_DETAILS_WITH_PAYMENT_METHOD_OPTIMISED, // flow 12,
  PAYMENT_UI_VARIATION_WITH_COD_OPTIMISED, // flow 15
];

export const DEFAULT_CHECKOUT_FLOW_ID = 'BACAcdsj';

// Checkout Flow constants ending from here

// eslint-disable-next-line max-lines-per-function
export const getTenxLandingPageData = () => ({
  service_list: [
    {
      service_id: '10x_cataloguing',
      service_name: '10x Cataloguing',
    },
    {
      service_id: '10x_influencer_marketing',
      service_name: '10x Influencer Marketing',
    },
    {
      service_id: '10x_video_boost',
      service_name: '10x Video Boost',
    },
    {
      service_id: '10x_customer_support',
      service_name: '10x Customer Support',
    },
    {
      service_id: '10x_seo_services',
      service_name: '10x SEO services',
    },
    {
      service_id: '10x_social_media',
      service_name: '10x Social Media',
    },
    {
      service_id: '10x_product_packaging',
      service_name: '10x Product Packaging',
    },
  ],
  hero_banner: {
    service_name: '10x Cataloguing',
    service_desc: 'Create Stunning Product Images, Video and content for your website',
    video_url: getCDNVideoUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718371624498_67JT9AQHZ3_2024-06-14_1.mp4'),
    service_status: 'Newly Launched',
    sub_service: [
      {
        sub_service_id: 'ai_generated_photoshoot',
        sub_service_name: 'AI-generated Photoshoot',
        description: 'Generate real-looking, AI-driven product photoshoot for your products, that boost sales and brand image.',
        status: 'available', //'coming soon' | 'available'
        action_cta: {
          type: 'secondary', //'primary' | 'secondary',
          action_type: 'explore', // "explore" | "I'm interested"
        },
      },
      {
        sub_service_id: 'ai_generated_product_videos',
        sub_service_name: 'AI-generated Product videos',
        description: 'Realistic AI-generated product videos for all your products, to help boost conversion.',
        status: 'coming soon', //'coming soon' | 'available',
        action_cta: {
          type: 'primary', //'primary' | 'secondary',
          action_type: "I'm interested", //"explore" | "I'm interested"
        },
      },
      {
        sub_service_id: 'manual_photoshoot_video',
        sub_service_name: 'Manual Photoshoot + Video',
        description: 'Get photoshoots done by leading Myntra affiliated agencies and models, at best value packages',
        status: 'coming soon', //'coming_soon' | 'available',
        action_cta: {
          type: 'primary', //'primary' | 'secondary',
          action_type: "I'm interested", //"explore" | "I'm interested"
        },
      },
      {
        sub_service_id: 'seo_optimised_cataloguing',
        sub_service_name: 'SEO optimised cataloguing',
        description: 'Upgrade your Product naming, descriptions & attributes, comparable to best-in-class D2C brands.',
        status: 'coming soon', //'coming_soon' | 'available',
        action_cta: {
          type: 'primary', //'primary' | 'secondary',
          action_type: "I'm interested", // "explore" | "I'm interested"
        },
      },
    ],
  },
  service_card: [
    {
      service_id: '10x_influencer_marketing',
      service_name: '10x Influencer Marketing',
      service_desc: 'Maximise reach & ROI with barter influencers, paid influencers & celebrity engagement.',
      img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103018724_N6LF5WIN5Z_2024-06-11_1.png'),
      status: 'coming soon', //'coming soon' | 'available',
      action_cta: {
        type: 'secondary', //'primary' | 'secondary',
        action_type: "I'm interested", //"explore" | "I'm interested"
      },
    },
    {
      service_id: '10x_video_boost',
      service_name: '10x Video Boost',
      service_desc: 'Drive exceptional ROI on Meta, Instagram & Youtube, with expert video content tailored to maximize clicks.',
      img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103019032_EJM7FHCLBR_2024-06-11_1.png'),
      status: 'coming soon', //'coming_soon' | 'available',
      action_cta: {
        type: 'primary', //'primary' | 'secondary',
        action_type: "I'm interested", //"explore" | "I'm interested"
      },
    },
    {
      service_id: '10x_customer_support',
      service_name: '10x Customer Support',
      service_desc: 'Let ShopDeck handle all your customer queries, via Phone, WhatsApp, Facebook comments.',
      img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718102915241_MB251U8664_2024-06-11_1.png'),
      status: 'coming soon', //'coming_soon' | 'available',
      action_cta: {
        type: 'primary', //'primary' | 'secondary',
        action_type: "I'm interested", //"explore" | "I'm interested"
      },
    },
    {
      service_id: '10x_seo_services',
      service_name: '10x SEO services',
      service_desc: 'Launch your SEO journey with the leading SEO experts in the market.',
      img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103019468_FVVKD4SAOP_2024-06-11_1.png'),
      status: 'coming soon', //'coming_soon' | 'available',
      action_cta: {
        type: 'primary', //'primary' | 'secondary',
        action_type: "I'm interested", //"explore" | "I'm interested"
      },
    },
    {
      service_id: '10x_social_media',
      service_name: '10x Social Media',
      service_desc: 'Let ShopDeck manage your social media, to multiply your brand presence.',
      img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103019707_H9DGYKWUJE_2024-06-11_1.png'),
      status: 'coming soon', //'coming_soon' | 'available',
      action_cta: {
        type: 'primary', //'primary' | 'secondary',
        action_type: "I'm interested", //"explore" | "I'm interested"
      },
    },
    {
      service_id: '10x_product_packaging',
      service_name: '10x Product Packaging',
      service_desc: "Get your own branded packaging to elevate customer's Brand Loyalty and retention.",
      img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103019290_83EUDTJKWY_2024-06-11_1.png'),
      status: 'coming soon', //'coming_soon' | 'available',
      action_cta: {
        type: 'primary', //'primary' | 'secondary',
        action_type: "I'm interested", //"explore" | "I'm interested"
      },
    },
  ],
});

// eslint-disable-next-line max-lines-per-function
export const getTenxServiceLandingPageData = () => ({
  hero_banner: {
    sub_service_name: 'AI- Generated Photoshoot',
    sub_service_status: 'Newly Launched',
    sub_service_pointers: ['High quality product images at <1/10th the price', 'Choose the models that suit your brand'],
    video_url: getCDNVideoUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718371624498_67JT9AQHZ3_2024-06-14_1.mp4'),
  },
  sample_carousel: {
    title: 'Checkout these sample AI photoshoot',
    description: '',
    sub_service_images: [
      {
        img_url: [
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718691730584_OCM30FJD7H_2024-06-18_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105249491_6C82ZIB5J9_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105249638_FM56ZRIGUP_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105249822_761A8INHF8_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105249980_8BZH6GRCMB_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105250161_HN2U1260AO_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105250297_3NE1V7VPYA_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105250477_D2GGID2157_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105250661_IXB8NJYBQS_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105250861_Q5B13PE62N_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105251069_PVQ1HFE2B3_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105251269_7WACTX6NZO_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105251455_ZP55V0W6A3_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105251632_IJRL4FSIHJ_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105251844_V0SA1IFJGF_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105252034_E7LE37Z6GZ_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105252229_IM9EJ51RN4_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105252377_2MW5OHH7U1_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105252557_8795TQ78KN_2024-06-11_1.jpeg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718105252727_C9L991TJEM_2024-06-11_1.jpeg'),
        ],
      },
      {
        img_url: [
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718691719430_LC5WPB9DCN_2024-06-18_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106870595_HPHJ0YF6P9_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106870963_0IMJ4E0WKM_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106871309_RPAK3CR90E_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106871613_6QHY15KXA6_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106871972_034BV29754_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106872256_WXGXMSYGTC_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106872577_9VNUJEVCZY_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106872933_7JC4QN50JT_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106873277_D4K32FXQF4_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106873593_MGD81BVKGG_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106873996_MVNQF8D392_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106874497_BUTU1K7TV9_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106874806_Q19AB316IZ_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106875138_G1NDWBWA07_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106875435_4T2PFDZNM2_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106875781_HAKSU8FR7L_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106876083_DAITFT47GT_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718106876511_F4OTRKJGEO_2024-06-11_1.jpg'),
        ],
      },
      {
        img_url: [
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718691699618_47WATU8L7S_2024-06-18_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107461015_2TAFQMJPXQ_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107461437_DZ9NNKK8LW_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107461807_PWPYC3WPL5_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107462232_TZRS9U4DNZ_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107462688_QKES7AAFXX_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107463168_GS25FN3Z5X_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107463510_EYH52KNOV3_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107463909_KUBPA1ON89_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107464275_Y5VXP4R1VP_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107464719_6QMYYL2UA9_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107465009_5P9AHM09RP_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107465402_O49ZG3OQF6_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107465814_KI94021J55_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107466155_TR7TNRXVLQ_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107466532_5JUGFOGJIC_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107466923_XM5THQYMVA_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107467343_UCPBDUSYVL_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107467641_OUI51DD1FN_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107468036_7SWVB1IRK8_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107468401_1Z3DXZU0CB_2024-06-11_1.jpg'),
        ],
      },
      {
        img_url: [
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718691759756_2DXY05LVRC_2024-06-18_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107802049_TPKC83F67F_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107802529_YY3LR9DSE5_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107802962_QXVUGPXWW7_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107803460_UDY0AY7GP6_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107804004_0O0OY59I9K_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107804482_HG9NKHQJ7R_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107804906_40FKG93HN2_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107805405_Y13ZNLLK3Y_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107805878_R828AXVEWQ_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107806276_AQ1VCU6AEK_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107806677_HUO0D67N2T_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107807145_U92XFYUJOE_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107807552_TU88U7KL51_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107807925_08PITEVOJH_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107808413_PZMNDBSMUH_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107808893_3ZGF38Y9OM_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107809324_0QMO6PGK39_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107809782_PNCY0EIXIR_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107810285_NF3F3VG8LZ_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107810750_G986NVZ824_2024-06-11_1.jpg'),
        ],
      },
      {
        img_url: [
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718691759624_FVLE2PRZH0_2024-06-18_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107944647_9RDRXNIGV5_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107945097_RM43KQUOO7_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107945491_79Y1MIJGQK_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107945859_V60E9BH7KA_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107946255_HJ2W6BKIR7_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107946634_96W3RN7UM7_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107947015_S0UJEJW4OI_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107947441_ECQIVDGT6S_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107947804_N8BKGKS0OY_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107948144_30T19IOGLO_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107948529_WCHJSXKKGS_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107948987_QSOQOJWIRZ_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107949326_791901S4IG_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107949750_MDR2WWP2RN_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107950177_FLKUD7VEYX_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107950547_Q282O975HM_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107950926_4GLML0YYN7_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107951352_WCYVR58FGJ_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107951712_DF6Q9ZQK0P_2024-06-11_1.jpg'),
          getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718107952121_NW45N6S8EY_2024-06-11_1.jpg'),
        ],
      },
    ],
  },
  vertical_carousel: {
    heading: 'Make your brand stand out with AI',
    carousel_data: [
      {
        description: 'Generate unique high quality listings for your website',
        img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103345108_58QVO41VSB_2024-06-11_1.png'),
      },
      {
        description: 'Give your website the premium look within budget',
        img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103345377_MIJK96QWAF_2024-06-11_1.png'),
      },
      {
        description: 'Upgrade your products images across all marketplaces',
        img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103345621_YKA31FIUN0_2024-06-11_1.png'),
      },
      {
        description: 'Choose the models that suit your brand',
        img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103344821_CCRL1020RD_2024-06-11_1.png'),
      },
      {
        description: 'Build brand recall with consistent premium images',
        img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103344511_QSYVADI0KE_2024-06-11_1.png'),
      },
      {
        description: 'Use existing catalogue images to generate premium photoshoots.',
        img_url: getCDNUrlFromSourceUrl('https://s3.ap-south-1.amazonaws.com/nushop-website-assets/1718103345857_J48BM1WMQK_2024-06-11_1.png'),
      },
    ],
  },
  step_tracker: {
    heading: 'How to get started?',
    step_data: [
      {
        title: 'Step 1 :',
        description: 'Choose a package from the next section and confirm.',
        img_url: 'https://cdn.zeplin.io/6398384696642b16ee423c73/assets/0cea3434-9ff7-4529-86aa-7a7f06fb6a97.svg',
      },
      {
        title: 'Step 2 :',
        description: 'The ShopDeck team will reach out to you for assistance.',
        img_url: 'https://cdn.zeplin.io/6398384696642b16ee423c73/assets/9a0538d5-edd0-4873-a091-8b103810a5a1.svg',
      },
      {
        title: 'Step 3 :',
        description: 'Image generation will take 3-5 days.',
        img_url: 'https://cdn.zeplin.io/6398384696642b16ee423c73/assets/bb925a22-fe7d-4e95-8c15-8560fded1725.svg',
      },
      {
        title: 'Step 4 :',
        description: 'Payment will be processed after the images are shared with you.',
        img_url: 'https://cdn.zeplin.io/6398384696642b16ee423c73/assets/bb925a22-fe7d-4e95-8c15-8560fded1725.svg',
      },
    ],
  },
  price_card: {
    title: 'Best in class tech, at minimal prices…',
    description: 'with recommendations for product overhaul.',
    price_data: [
      {
        package_name: 'Shutter Package',
        number_of_products: 20,
        mrp_price: 6000,
        selling_price: 2999,
        offer_till: `July' 2024`,
        delivery_time: '3- 5 day delivery',
        what_you_get: ['20 Images per product (across 3 models)', '5 poses', '4 background'],
        shopdeck_pricing: ['₹150 Per product (₹8 per Photo)'],
      },
      {
        package_name: 'Capture Package',
        number_of_products: 40,
        mrp_price: 12000,
        selling_price: 4999,
        offer_till: `July' 2024`,
        delivery_time: '3- 5 day delivery',
        what_you_get: ['20 Images per product (across 3 models)', '5 poses', '4 background'],
        shopdeck_pricing: ['₹125 Per product (₹6 per Photo)'],
        added_features: ['Sample Links of other brands can be shared, to draw inspiration from'],
      },
      {
        package_name: 'Vision Package',
        number_of_products: 70,
        mrp_price: 21000,
        selling_price: 6999,
        offer_till: `July' 2024`,
        delivery_time: '3- 5 day delivery',
        what_you_get: ['20 Images per product (across 3 models)', '5 poses', '4 background'],
        shopdeck_pricing: ['₹100 Per product (₹5 per Photo)'],
        added_features: ['Sample Links of other brands can be shared, to draw inspiration from'],
      },
    ],
  },
});
