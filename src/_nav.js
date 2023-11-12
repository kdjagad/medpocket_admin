import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBuilding, cilLockLocked, cilNewspaper, cilUser, cilFile } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Stockiest Request',
    to: '/stockiest-request',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Keys',
    to: '/keys',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'News',
    to: '/news',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Centers',
    to: '/centers',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Upload Data',
    to: '/upload-data',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
]

export default _nav
