import React from 'react';
import './WatchFrame.css';
import { useSystem } from '../../kernel/SystemContext';

interface WatchFrameProps {
    children: React.ReactNode;
    onHome: () => void;
}

export const WatchFrame: React.FC<WatchFrameProps> = ({ children, onHome }) => {
    const { toggleScreen, brightness } = useSystem();

    return (
        <div className="watch-wrapper" style={{ position: 'relative', width: 'fit-content', margin: 'auto' }}>
            <div className="watch-container">
                <div className="watch-screen" style={{ filter: `brightness(${brightness}%)` }}>
                    {children}
                </div>
            </div>

            {/* Physical Buttons */}
            <div
                className="watch-button btn-power"
                title="Power / Toggle Screen"
                onClick={toggleScreen}
            />
            <div
                className="watch-button btn-home"
                title="Home"
                onClick={onHome}
            />
        </div>
    );
};
