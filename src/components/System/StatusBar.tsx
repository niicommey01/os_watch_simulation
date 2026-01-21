import React from 'react';
import { useSystem } from '../../kernel/SystemContext';
import './StatusBar.css';

export const StatusBar: React.FC = () => {
    const { currentTime, batteryLevel, isBluetoothOn } = useSystem();

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="status-bar">
            {/* Left Side: Icons like BT or Notifications */}
            <div className="status-left">
                {isBluetoothOn && <span className="status-icon">ᛒ</span>}
            </div>

            {/* Center: Time */}
            <div className="status-time">
                {formatTime(currentTime)}
            </div>

            {/* Right: Battery */}
            <div className="status-right">
                <div className={`battery-pill ${batteryLevel < 20 ? 'battery-low' : ''}`}>
                    <div
                        className="battery-level"
                        style={{ width: `${batteryLevel}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
