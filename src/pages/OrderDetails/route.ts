import { lazy } from 'react';
import { RouteType } from '~/types';

const route: RouteType = {
    name: 'Chi tiết hóa đơn',
    accessModifier: 'public',
    path: '/order/:orderId',
    component: lazy(() => import('.')),
    navigateSideBar: false,
};

export default route;
