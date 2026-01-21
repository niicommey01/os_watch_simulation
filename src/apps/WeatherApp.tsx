import React from 'react';

export const WeatherApp: React.FC = () => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom, #2196f3, #64b5f6)',
            color: 'white',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}>
            <div style={{ fontSize: '4rem', lineHeight: 1 }}>🌤️</div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>24°</div>
            <div style={{ fontSize: '1rem' }}>Partly Cloudy</div>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.9 }}>
                H: 26° L: 18°
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                Accra, GH
            </div>
        </div>
    );
};
