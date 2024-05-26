import { lazy } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { RouteType } from '../../types';

const route: RouteType = {
    name: 'Khách hàng',
    logo: FaUserTie,
    accessModifier: 'public',
    path: '/customer',
    HTMLTitle: 'Khách hàng',
    component: lazy(() => import('.')),
    navigateSideBar: true,
};

export default route;
