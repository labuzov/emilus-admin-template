import { 
  DashboardOutlined,
  FileTextOutlined,
  GiftOutlined,
  MailOutlined,
  MobileOutlined,
  PictureOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const mainNavTree = [{
  key: 'main',
  path: `${APP_PREFIX_PATH}/main`,
  title: 'sidenav.main',
  icon: '',
  breadcrumb: false,
  submenu: [
    {
      key: 'dashboard',
      path: `${APP_PREFIX_PATH}/dashboard`,
      title: 'sidenav.main.dashboard',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'catalog',
      path: `${APP_PREFIX_PATH}/catalog`,
      title: 'sidenav.main.catalog',
      icon: ShoppingCartOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'catalog-items',
          path: `${APP_PREFIX_PATH}/catalog/items`,
          title: 'sidenav.main.catalog.items',
          icon: '',
          breadcrumb: false,
          submenu: [],
        },
        {
          key: 'catalog-categories',
          path: `${APP_PREFIX_PATH}/catalog/categories`,
          title: 'sidenav.main.catalog.categories',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'catalog-collections',
          path: `${APP_PREFIX_PATH}/catalog/collections`,
          title: 'sidenav.main.catalog.collections',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'catalog-combo',
          path: `${APP_PREFIX_PATH}/catalog/combo`,
          title: 'sidenav.main.catalog.combo',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'orders',
      path: `${APP_PREFIX_PATH}/orders`,
      title: 'sidenav.main.orders',
      icon: ShoppingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'customers',
      path: `${APP_PREFIX_PATH}/customers`,
      title: 'sidenav.main.customers',
      icon: UserOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'customers-list',
          path: `${APP_PREFIX_PATH}/customers/list`,
          title: 'sidenav.main.customers.list',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'customers-groups',
          path: `${APP_PREFIX_PATH}/customers/groups`,
          title: 'sidenav.main.customers.groups',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'banners',
      path: `${APP_PREFIX_PATH}/banners`,
      title: 'sidenav.main.banners',
      icon: PictureOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'codes',
      path: `${APP_PREFIX_PATH}/codes`,
      title: 'sidenav.main.codes',
      icon: GiftOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'places',
      path: `${APP_PREFIX_PATH}/places`,
      title: 'sidenav.main.places',
      icon: ShopOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'places-addresses',
          path: `${APP_PREFIX_PATH}/places/addresses`,
          title: 'sidenav.main.places.addresses',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'places-geofences',
          path: `${APP_PREFIX_PATH}/places/geofences`,
          title: 'sidenav.main.places.geofences',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'employees',
      path: `${APP_PREFIX_PATH}/employees`,
      title: 'sidenav.main.employees',
      icon: TeamOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'mailing',
      path: `${APP_PREFIX_PATH}/mailing`,
      title: 'sidenav.main.mailing',
      icon: MailOutlined,
      breadcrumb: false,
      submenu: []
    },
  ]
}];

const systemNavTree = [
  {
    key: 'system',
    path: `${APP_PREFIX_PATH}/system`,
    title: 'sidenav.system',
    icon: '',
    breadcrumb: false,
    submenu: [
      {
        key: 'system-settings',
        path: `${APP_PREFIX_PATH}/settings`,
        title: 'sidenav.system.settings',
        icon: SettingOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'system-mobile-app',
        path: `${APP_PREFIX_PATH}/mobile-app`,
        title: 'sidenav.system.mobile.app',
        icon: MobileOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'system-logs',
        path: `${APP_PREFIX_PATH}/logs`,
        title: 'sidenav.system.logs',
        icon: FileTextOutlined,
        breadcrumb: false,
        submenu: []
      },
    ]
  },
];

const navigationConfig = [
  ...mainNavTree,
  ...systemNavTree
]

export default navigationConfig;
