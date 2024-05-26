import { useState } from 'react';
import type { OverlayScrollbars } from 'overlayscrollbars';

type CheckScrollOSBReturn = {
    isScroll: boolean;
    EventScroll: (e: OverlayScrollbars) => void;
};

const useCheckScrollOSB = (): CheckScrollOSBReturn => {
    const [isScroll, setIsScroll] = useState<boolean>(false);

    const handleEventScroll = (e: OverlayScrollbars) => {
        if (e.elements().scrollOffsetElement.scrollTop > 0 && isScroll === false) {
            setIsScroll(true);
        }
        if (e.elements().scrollOffsetElement.scrollTop === 0) {
            setIsScroll(false);
        }
    };

    return { isScroll: isScroll, EventScroll: handleEventScroll };
};
export default useCheckScrollOSB;
