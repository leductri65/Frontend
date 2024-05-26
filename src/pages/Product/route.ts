import { lazy } from 'react';
import { RiProductHuntLine } from 'react-icons/ri';
import { RouteType } from '../../types';

const route: RouteType = {
    name: 'Sản phẩm',
    logo: RiProductHuntLine,
    accessModifier: 'public',
    path: '/product',
    HTMLTitle: 'Sản phẩm',
    navigateSideBar: true,
    component: lazy(() => import('.')),
};

export default route;
