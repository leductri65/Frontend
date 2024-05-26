import { lazy } from 'react';
import { MdOutlineApps } from 'react-icons/md';
import { RouteType } from '../../types/index';

const route: RouteType = {
    name: 'Tổng quan',
    logo: MdOutlineApps,
    path: '/',
    accessModifier: 'public',
    component: lazy(() => import('.')),
    HTMLTitle: 'Tổng quan',
    navigateSideBar: true,
};

export default route;
