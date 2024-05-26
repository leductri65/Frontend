import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from './useRedux';
import { useEffect } from 'react';
import type { RootState } from '../redux/store';

const useGetDataRedux = <T>(
    selector: (state: RootState) => T,
    actionCreator: AsyncThunk<unknown, void, { [x: string]: string }>,
) => {
    const dispatch = useAppDispatch();

    const dataReturn: T = useAppSelector(selector);

    useEffect(() => {
        dispatch(actionCreator());
    }, []);

    return dataReturn;
};

export default useGetDataRedux;
