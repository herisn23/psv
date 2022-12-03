import {useCallback, useEffect} from "react";

export const useReachBottom = (callback: () => void) => {
    const handleScroll = useCallback(() => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (bottom) {
            callback()
        }
    }, [callback])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
}