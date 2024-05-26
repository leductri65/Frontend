import { IconType } from 'react-icons';

type LayoutSettingType = {
    isHeader?: boolean;
    isSideBar?: boolean;
};

type RouteType = {
    name: string;
    HTMLTitle?: string;
    path: string;
    navigateSideBar: boolean;
    layoutSetting?: LayoutSettingType;
    accessModifier: 'public' | 'user' | 'admin' | string;
    indexRoute?: boolean;
    logo?: IconType;
    component: React.LazyExoticComponent<React.FC>;
};

export default RouteType;
