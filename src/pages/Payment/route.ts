import { lazy } from 'react';
import { BiDollar } from 'react-icons/bi';
import { RouteType } from '../../types';

const route: RouteType = {
    name: 'Thanh toán khách hàng',
    logo: BiDollar,
    accessModifier: 'public',
    path: '/payments',
    HTMLTitle: 'Thanh toán khách hàng',
    component: lazy(() => import('.')),
    navigateSideBar: true,
};

export default route;
