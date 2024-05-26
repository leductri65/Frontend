import { lazy } from 'react';
import { GiHumanPyramid } from 'react-icons/gi';
import { RouteType } from '../../types';

const route: RouteType = {
    name: 'Quản lý nhân viên',
    logo: GiHumanPyramid,
    accessModifier: 'public',
    path: '/employee',
    HTMLTitle: 'Nhân viên',
    component: lazy(() => import('.')),
    navigateSideBar: true,
};

export default route;
