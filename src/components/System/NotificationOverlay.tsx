import React from 'react';
import { useSystem } from '../../kernel/SystemContext';

export const NotificationOverlay: React.FC = () => {
    const { notifications, clearNotification } = useSystem();

    if (notifications.length === 0) return null;

    // Show top-most (most recent) notification
    const activeNotif = notifications[0];

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(5px)',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease'
        }}>
            <div style={{
                background: '#333',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px'
            }}>
                🔔
            </div>

            <h3 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{activeNotif.title}</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '0.8rem', color: '#ccc', textAlign: 'center' }}>
                {activeNotif.message}
            </p>

            <button
                onClick={() => clearNotification(activeNotif.id)}
                style={{
                    background: '#444',
                    border: '1px solid #666',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    cursor: 'pointer'
                }}
            >
                Dismiss
            </button>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};
