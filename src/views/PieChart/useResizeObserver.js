import { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useResizeObserver = (ref) => {
    const [dimensions, setDimensions] = useState(null);

    useEffect(() => {
        if (!!ref?.current) {
            const observeTarget = ref.current;
            const resizeObserver = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    setDimensions(entry?.contentRect);
                });
            });
            resizeObserver?.observe(observeTarget);
            return () => {
                resizeObserver.unobserve(observeTarget);
            };
        }
    }, [ref]);

    return dimensions;
};