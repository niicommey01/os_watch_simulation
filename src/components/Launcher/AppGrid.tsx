import React from 'react';
import './AppGrid.css';

interface AppItem {
    id: string;
    label: string;
    icon: string; // Unicode or initial
    color: string;
}

const APPS: AppItem[] = [
    { id: 'clock', label: 'Clock', icon: '🕒', color: '#333' },
    { id: 'health', label: 'Health', icon: '❤️', color: '#d32f2f' },
    { id: 'settings', label: 'Settings', icon: '⚙️', color: '#757575' },
    { id: 'weather', label: 'Weather', icon: '🌤️', color: '#0288d1' },
    { id: 'phone', label: 'Phone', icon: '📞', color: '#4caf50' },
    { id: 'music', label: 'Music', icon: '🎵', color: '#e91e63' },
];

interface AppGridProps {
    onLaunch: (appId: string) => void;
}

export const AppGrid: React.FC<AppGridProps> = ({ onLaunch }) => {
    return (
        <div className="app-grid-container">
            <div className="app-grid-scroll">
                {APPS.map(app => (
                    <div
                        key={app.id}
                        className="app-icon-item"
                        onClick={() => onLaunch(app.id)}
                    >
                        <div className="app-icon-circle" style={{ background: app.color }}>
                            {app.icon}
                        </div>
                        <span className="app-label">{app.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
