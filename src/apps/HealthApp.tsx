import React, { useEffect, useState } from 'react';
import { useSensors } from '../kernel/SensorContext';

export const HealthApp: React.FC = () => {
    const { heartRate, steps, isMoving } = useSensors();
    const [history, setHistory] = useState<number[]>([]);

    // Update graph history
    useEffect(() => {
        const interval = setInterval(() => {
            setHistory(prev => {
                const newHist = [...prev, heartRate];
                if (newHist.length > 20) newHist.shift(); // Keep last 20 points
                return newHist;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [heartRate]);

    // Simple SVG Path generation
    const generatePath = () => {
        if (history.length < 2) return "";
        const maxVal = 200;
        const width = 240; // Approx usable width
        const height = 80;
        const stepX = width / (history.length - 1);

        return history.map((val, idx) => {
            const x = idx * stepX;
            const y = height - ((val / maxVal) * height);
            return `${idx === 0 ? 'M' : 'L'} ${x + 60} ${y + 160}`; // Offset to center roughly
        }).join(" ");
    };

    return (
        <div style={{
            height: '100%',
            width: '100%',
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f05555'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <div style={{ fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase' }}>Heart Rate</div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                    {heartRate} <span style={{ fontSize: '1rem' }}>BPM</span>
                </div>
            </div>

            {/* Steps Mini Display */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                background: '#1a1a1a',
                padding: '5px 15px',
                borderRadius: '15px'
            }}>
                <span style={{ color: '#448aff' }}>Steps: {steps}</span>
                <span style={{ color: isMoving ? '#4caf50' : '#888' }}>
                    {isMoving ? 'Running...' : 'Idle'}
                </span>
            </div>

            {/* Simple Graph Visualization */}
            <div style={{ width: '80%', height: '50px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2px' }}>
                {history.map((val, i) => (
                    <div key={i} style={{
                        width: '100%',
                        background: '#f05555',
                        height: `${(val / 200) * 100}%`,
                        opacity: 0.8,
                        borderRadius: '2px'
                    }} />
                ))}
            </div>
        </div>
    );
};
