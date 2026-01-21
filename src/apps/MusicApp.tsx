import React, { useState } from 'react';

export const MusicApp: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [track, setTrack] = useState({ title: 'Blinding Lights', artist: 'The Weeknd' });

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        setTrack({ title: 'Levitating', artist: 'Dua Lipa' });
        setIsPlaying(true);
    };

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #424242, #212121)',
            color: 'white'
        }}>
            {/* Album Art Placeholder */}
            <div style={{
                width: '80px', height: '80px',
                background: '#555',
                borderRadius: '8px',
                marginBottom: '15px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem'
            }}>
                🎵
            </div>

            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{track.title}</div>
            <div style={{ fontSize: '0.7rem', color: '#aaa', marginBottom: '15px' }}>{track.artist}</div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>⏮</button>

                <button
                    onClick={togglePlay}
                    style={{
                        width: '50px', height: '50px',
                        borderRadius: '50%',
                        background: '#e91e63',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>

                <button
                    onClick={nextTrack}
                    style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}
                >⏭</button>
            </div>
        </div>
    );
};
