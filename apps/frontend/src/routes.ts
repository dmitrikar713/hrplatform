import {
  IconHome,
  IconUsers,
  IconSettings,
  IconBuilding,
  IconUser,
  IconLogout,
} from '@tabler/icons-react'

export const ROUTES = {
  // PUBLIC
  ABOUT: '/about',
  TEST_EXAMPLE: '/test-example',
  RESULTS_EXAMPLE: '/results-example',
  FAQ: '/faq',
  SIGN_IN: '/sign-in',

  // AUTHORIZED
  HOME: '/home',
  VACANCIES: '/vacancies',
  SETTINGS: '/settings',
  HELP: '/help',
  PROFILE: '/profile',
} as const

type Route = keyof typeof ROUTES
type RoutePath = (typeof ROUTES)[Route]

export interface RouteConfig {
  path: RoutePath
  title: string
  description?: string
  authRequired?: boolean
  showInNav?: boolean
  icon?: React.ComponentType
  layer: 'public' | 'authorized'
}

export const publicRoutesConfigs: Array<RouteConfig> = [
  {
    path: ROUTES.ABOUT,
    title: 'О сервисе',
    layer: 'public',
  },
  {
    path: ROUTES.TEST_EXAMPLE,
    title: 'Пример теста',
    layer: 'public',
  },
  {
    path: ROUTES.RESULTS_EXAMPLE,
    title: 'Пример результата',
    layer: 'public',
  },
  {
    path: ROUTES.SIGN_IN,
    title: 'Авторизация',
    layer: 'public',
  },
]
export const privateRoutesConfigs: Array<RouteConfig> = [
  {
    path: ROUTES.HOME,
    title: 'Главная',
    layer: 'authorized',
  },
  {
    path: ROUTES.PROFILE,
    title: 'Профиль',
    layer: 'authorized',
  },
  {
    path: ROUTES.VACANCIES,
    title: 'Вакансии',
    layer: 'authorized',
  },
]

export const RouteConfigs: Array<RouteConfig> = [
  ...publicRoutesConfigs,
  ...privateRoutesConfigs,
] as const

export function isPublicRoute(path: string): boolean {
  return !isAuthRoute(path)
}

export function isAuthRoute(path: string): boolean {
  return !!privateRoutesConfigs.some((config) => {
    return config.path === path
  })
}

function routeConfig(route: Route): RouteConfig {
  return RouteConfigs.find((config) => config.path === ROUTES[route])!
}
