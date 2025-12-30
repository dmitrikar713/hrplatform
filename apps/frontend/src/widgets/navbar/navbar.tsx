'use client'

import { isPublicRoute } from '@/routes'
import { usePathname } from 'next/navigation'
import { PublicNavbar } from './publicNavbar'
import { PrivateNavbar } from './privateNavbar'

export const Navbar = () => {
  const pathname = usePathname()

  return isPublicRoute(pathname) ? <PublicNavbar /> : <PrivateNavbar />
}
