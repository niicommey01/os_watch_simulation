import React, { useState } from 'react';

export const PhoneApp: React.FC = () => {
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState<'idle' | 'calling'>('idle');

    const handlePress = (digit: string) => {
        if (status === 'idle') {
            setNumber(prev => (prev + digit).slice(0, 10));
        }
    };

    const handleCall = () => {
        if (number.length > 0) {
            setStatus('calling');
            setTimeout(() => setStatus('idle'), 3000); // Simulate short call/busy
        }
    };

    const handleDelete = () => {
        setNumber(prev => prev.slice(0, -1));
    };

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0d0d0d',
            paddingTop: '20px'
        }}>
            {/* Screen */}
            <div style={{ height: '40px', fontSize: '1.2rem', color: 'white', marginBottom: '10px' }}>
                {status === 'calling' ? 'Calling...' : number || 'Enter #'}
            </div>

            {/* Dial Pad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((d) => (
                    <button
                        key={d}
                        onClick={() => handlePress(d.toString())}
                        style={{
                            width: '40px', height: '40px',
                            borderRadius: '50%',
                            background: '#333',
                            border: 'none',
                            color: 'white',
                            fontSize: '1rem'
                        }}
                    >
                        {d}
                    </button>
                ))}
            </div>

            {/* Controls */}
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button
                    onClick={handleCall}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        background: '#4caf50',
                        border: 'none',
                        color: 'white'
                    }}
                >
                    📞
                </button>
                <button
                    onClick={handleDelete}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        background: '#d32f2f',
                        border: 'none',
                        color: 'white'
                    }}
                >
                    ⌫
                </button>
            </div>
        </div>
    );
};
