// Timer.js
import React, { useState, useEffect } from 'react';
import '../Css/timer.css';

const Timer = ({ onTimerEnd }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      onTimerEnd();
    }
  }, [countdown, onTimerEnd]);

  return (
    <div className={`timer countdown-${countdown}`}>
      <div className="countdown-number">{countdown}</div>
    </div>
  );
};

export default Timer;
