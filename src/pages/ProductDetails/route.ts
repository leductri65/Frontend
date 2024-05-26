import { lazy } from 'react';
import { RouteType } from '~/types';

const route: RouteType = {
    name: 'Chi tiết sản phẩm',
    accessModifier: 'public',
    path: '/product/:productId',
    component: lazy(() => import('.')),
    navigateSideBar: false,
};

export default route;
