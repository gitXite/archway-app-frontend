import { useEffect } from 'react';

export function useGlobalKeybind(
    keys: (e: KeyboardEvent) => boolean,
    callback: () => void,
) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (
                document.activeElement instanceof HTMLTextAreaElement ||
                document.activeElement instanceof HTMLInputElement
            ) {
                return;
            }
            
            if (keys(e)) {
                e.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [keys, callback]);
}
