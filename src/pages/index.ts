import { RouteType } from '../types';

const publicRoutes: Array<RouteType> = [];

const userRoutes: Array<RouteType> = [];

const adminRoutes: Array<RouteType> = [];

const childrenRoutes: { [x: string]: Array<RouteType> } = {};

const allPage = import.meta.glob('./**/route.ts', { import: 'default', eager: true });
const pathPages = Object.keys(allPage);

pathPages.forEach((path) => {
    const route = allPage[path] as RouteType;

    switch (route.accessModifier) {
        case 'public':
            publicRoutes.push(route);
            break;
        case 'user':
            userRoutes.push(route);
            break;
        case 'admin':
            adminRoutes.push(route);
            break;
        default:
            if (childrenRoutes[route.accessModifier]) childrenRoutes[route.accessModifier].push(route);
            else childrenRoutes[route.accessModifier] = [route];

            break;
    }
});

console.log(childrenRoutes);

export { publicRoutes, userRoutes, adminRoutes, childrenRoutes };
