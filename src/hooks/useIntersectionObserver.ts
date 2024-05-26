import { EntryType } from 'perf_hooks';
import { useState, useEffect, RefObject } from 'react';

const useIntersectionObserver = <T extends HTMLElement>(element: RefObject<T>): IntersectionObserverEntry | null => {
    const [entryProps, setEntryProps] = useState<IntersectionObserverEntry | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setEntryProps(entry);
                    observer.unobserve(element.current!);
                }
            },
            { threshold: 0.4 },
        );

        if (element.current!) {
            observer.observe(element.current!);
        }
    }, [element]);

    return entryProps;
};

// (entries) => {
//     if (entries[0].isIntersecting) {
//         setIsVisible(entries[0].isIntersecting);
//         observer.unobserve(element);
//     }
// },

export default useIntersectionObserver;
