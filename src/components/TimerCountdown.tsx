import { useEffect, useState } from 'react';

export function TimerCountdown({ initialDeciSeconds }: { initialDeciSeconds: number }) {
    const [timeLeft, setTimeLeft] = useState(initialDeciSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const seconds = Math.floor(timeLeft / 10);
    const deciSeconds = timeLeft % 10;

    return (
        <p className='absolute text-muted-foreground text-xs text-center bottom-1.5 right-1/2 translate-x-1/2'>
            {String(seconds).padStart(1, '0')}.{String(deciSeconds).padStart(1, '0')}
        </p>
    );
}