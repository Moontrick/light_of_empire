import { useEffect, useState } from 'react';

const secondsUntil = (deadline: number | null) =>
  deadline === null ? 0 : Math.max(0, Math.ceil((deadline - Date.now()) / 1000));

// Секунды до deadline (timestamp в мс), обновляются раз в секунду; 0 — срок вышел или не задан
export function useCountdown(deadline: number | null): number {
  const [seconds, setSeconds] = useState(() => secondsUntil(deadline));

  useEffect(() => {
    setSeconds(secondsUntil(deadline));
    if (deadline === null || deadline <= Date.now()) return;

    const timer = window.setInterval(() => {
      const left = secondsUntil(deadline);
      setSeconds(left);
      if (left === 0) window.clearInterval(timer);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [deadline]);

  return seconds;
}
