import classNames from 'classnames/bind';

import styles from './Overview.module.scss';

import route from './route';
// import { getDataHomepage, dataHomePageSelector } from './homeSlice';
// import type { IDataHomePage } from './homeSlice';

import { useChangeDocTitle } from '../../hooks';
// import useGetDataRedux from '~/hooks/useGetDataRedux';

const cx = classNames.bind(styles);

type HomeProps = object;

const Home: React.FC<HomeProps> = () => {
    useChangeDocTitle(route.HTMLTitle);
    // Get data for homepage
    // const { dataHomePage, status }: IDataHomePage | undefined = useGetDataRedux(dataHomePageSelector, getDataHomepage);

    return (
        <div className={cx('wrapper')}>
            {/*Menu item of Carousel*/}
            {/* <MenuCard /> */}
            {/*Artist item of Carousel*/}
            {/* <ArtistCard /> */}
            <h1>Tổng quan</h1>
        </div>
    );
};

export default Home;
