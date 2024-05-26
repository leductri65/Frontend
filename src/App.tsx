// import { Fragment, Suspense } from 'react';
import { Routes, Route, Navigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { childrenRoutes, publicRoutes, userRoutes } from './pages';
import { RouteType } from './types';
// import { Fragment } from 'react/jsx-runtime';
// import { Suspense } from 'react';
import { Layout, LoadingSpinner } from './components';
import { Fragment } from 'react/jsx-runtime';
import { Suspense } from 'react';
// import { userLoginSelector } from './api/userSlice';
// import { RouteType } from './types';
// import { Layout } from './components';

// Object.hasOwn(childrenRoutes, path) ? `${path}/*` : path
const renderChildrenRoutes = (routes: Array<RouteType>) =>
    routes.map(({ path, component: Component }) => {
        return (
            <Fragment key={path}>
                {/* {indexRoute && <Route index path="" element={<Navigate to={path} replace />} />} */}
                <Route
                    path={path}
                    element={
                        <Suspense fallback={<LoadingSpinner />}>
                            <Component />
                        </Suspense>
                    }
                >
                    {Object.hasOwn(childrenRoutes, path) && renderChildrenRoutes(childrenRoutes[path])}
                </Route>
            </Fragment>
        );
    });

const renderParentRoutes = (routes: Array<RouteType>) =>
    routes.map(({ component: Component, path, layoutSetting }) => {
        return (
            <Route
                key={path}
                path={path}
                element={
                    <Layout
                        isHeader={layoutSetting! && layoutSetting?.isHeader}
                        isSidebar={layoutSetting! && layoutSetting?.isSideBar}
                    >
                        <Component />
                    </Layout>
                }
            >
                {/* Render children route */}
                {Object.hasOwn(childrenRoutes, path) && renderChildrenRoutes(childrenRoutes[path])}
            </Route>
        );
    });

const App: React.FC = () => {
    return (
        <Routes>
            {renderParentRoutes(publicRoutes)}
            {/* {renderParentRoutes(userRoutes)} */}

            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
    );
};

export default App;
