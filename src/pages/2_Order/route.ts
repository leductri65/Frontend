import { lazy } from 'react';
import { CgFileDocument } from 'react-icons/cg';
import { RouteType } from '../../types';

const route: RouteType = {
    name: 'Đơn hàng',
    logo: CgFileDocument,
    accessModifier: 'public',
    path: '/order',
    HTMLTitle: 'Đơn hàng',
    component: lazy(() => import('.')),
    navigateSideBar: true,
};

export default route;
