import { lazy } from 'react';
import { RiCurrencyLine } from 'react-icons/ri';
import { RouteType } from '../../types';

const route: RouteType = {
    name: 'Hóa đơn',
    logo: RiCurrencyLine,
    accessModifier: 'public',
    path: '/bill',
    HTMLTitle: 'Hóa đơn',
    component: lazy(() => import('.')),
    navigateSideBar: true,
};

export default route;
