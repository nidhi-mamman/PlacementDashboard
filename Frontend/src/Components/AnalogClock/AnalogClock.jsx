import React, { useEffect, useRef } from 'react';
import './AnalogClock.css';

const AnalogClock = () => {
    const hourRef = useRef(null);
    const minuteRef = useRef(null);
    const secondRef = useRef(null);
    const clockRef = useRef(null);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours();

            const secondDeg = seconds * 6;
            const minuteDeg = minutes * 6 + seconds * 0.1;
            const hourDeg = ((hours % 12) / 12) * 360 + minutes * 0.5;

            if (secondRef.current) {
                secondRef.current.style.transform = `rotate(${secondDeg}deg)`;
                // Add subtle length change for gravity effect
                if (seconds % 2 === 0) {
                    secondRef.current.style.height = '88px';
                } else {
                    secondRef.current.style.height = '90px';
                }
            }
            if (minuteRef.current) minuteRef.current.style.transform = `rotate(${minuteDeg}deg)`;
            if (hourRef.current) hourRef.current.style.transform = `rotate(${hourDeg}deg)`;
        };

        // Initial update
        updateClock();

        // Set interval for smooth updates
        const interval = setInterval(updateClock, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock" ref={clockRef}>
            {/* Clock numbers */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <div
                    key={num}
                    className="number"
                    style={{ transform: `rotate(${num * 30}deg)` }}
                >
                    <span style={{ transform: `rotate(-${num * 30}deg)` }}>{num}</span>
                </div>
            ))}

            {/* Minute ticks */}
            {Array.from({ length: 60 }).map((_, i) => (
                <div
                    key={`tick-${i}`}
                    className={`tick ${i % 5 === 0 ? 'major-tick' : 'minor-tick'}`}
                    style={{ transform: `rotate(${i * 6}deg)` }}
                />
            ))}

            {/* Clock hands */}
            <div className="hand hour" ref={hourRef}></div>
            <div className="hand minute" ref={minuteRef}></div>
            <div className="hand second" ref={secondRef}></div>

            {/* Center pieces */}
            <div className="center-outer"></div>
            <div className="center-dot"></div>
        </div>
    );
};

export default AnalogClock;