import React from 'react';
import './Timer.css';
import { useState, useEffect } from 'react';

const Timer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = 'August, 31, 2023';

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2>Tiempo restante del Censo:</h2>
      <div
        className="timer"
        role="timer"
        style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="box">
          <p id="day">{days < 10 ? '0' + days : days}</p>
          <span className="text">Días</span>
        </div>
        <div className="box">
          <p id="hour">{hours < 10 ? '0' + hours : hours}</p>
          <span className="text">Horas</span>
        </div>
        <div className="box">
          <p id="minute">{minutes < 10 ? '0' + minutes : minutes}</p>
          <span className="text">Minutos</span>
        </div>

        <div className="box">
          <p id="second">{seconds < 10 ? '0' + seconds : seconds}</p>
          <span className="text">Segundos</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
