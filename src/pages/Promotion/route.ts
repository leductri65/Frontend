import { lazy } from 'react';
import { MdOutlineDiscount } from 'react-icons/md';
import { RouteType } from '../../types';

const route: RouteType = {
    name: 'Quản lý khuyến mãi',
    logo: MdOutlineDiscount,
    accessModifier: 'public',
    path: '/promotion',
    HTMLTitle: 'Khuyến mãi',
    component: lazy(() => import('.')),
    navigateSideBar: true,
};

export default route;
