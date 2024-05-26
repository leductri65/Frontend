import { lazy } from 'react';
import { FaStore } from 'react-icons/fa';
import { RouteType } from '../../types';

const route: RouteType = {
    name: 'Cửa hàng',
    logo: FaStore,
    accessModifier: 'public',
    path: '/store',
    HTMLTitle: 'Cửa hàng',
    component: lazy(() => import('.')),
    navigateSideBar: true,
};

export default route;
