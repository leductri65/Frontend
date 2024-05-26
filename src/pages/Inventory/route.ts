import { lazy } from 'react';
import { MdOutlineInventory2 } from 'react-icons/md';
import { RouteType } from '../../types';

const route: RouteType = {
    name: 'Tồn kho',
    logo: MdOutlineInventory2,
    accessModifier: 'public',
    path: '/inventory',
    HTMLTitle: 'Tồn kho',
    component: lazy(() => import('.')),
    navigateSideBar: true,
};

export default route;
