import React from 'react';
import { useSystem } from '../kernel/SystemContext';

export const ClockApp: React.FC = () => {
    const { currentTime } = useSystem();

    // Simple formatting
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            background: 'linear-gradient(135deg, #111, #222)',
        }}>
            <div style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '2px' }}>
                {formattedTime}
            </div>
            <div style={{ fontSize: '1.2rem', color: '#aaa' }}>
                {seconds.toString().padStart(2, '0')}
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#888' }}>
                {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
        </div>
    );
};
