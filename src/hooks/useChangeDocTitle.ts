import { useEffect } from 'react';

const useChangeDocTitle = (title: string | undefined) => {
    useEffect(() => {
        if (title) document.title = title;
    }, []);
};
export default useChangeDocTitle;
