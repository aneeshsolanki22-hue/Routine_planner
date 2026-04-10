import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(durationMinutes, onComplete) {
  const totalSeconds = durationMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const clear = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    setSecondsLeft(totalSeconds);
    setRunning(false);
    clear();
  }, [totalSeconds]);

  useEffect(() => {
    if (!running) { clear(); return; }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clear();
          setRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clear;
  }, [running, onComplete]);

  useEffect(() => () => clear(), []);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    clear();
    setRunning(false);
    setSecondsLeft(totalSeconds);
  }, [totalSeconds]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return { secondsLeft, running, start, pause, reset, display: `${mm}:${ss}`, progress: (totalSeconds - secondsLeft) / totalSeconds };
}
