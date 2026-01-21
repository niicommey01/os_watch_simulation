import React, { useState } from 'react';
import { useSystem } from '../kernel/SystemContext';

export const SettingsApp: React.FC = () => {
    const {
        isBluetoothOn,
        toggleBluetooth,
        brightness,
        setBrightness,
        isWifiOn,
        toggleWifi,
        wifiNetwork,
        connectWifi
    } = useSystem();

    const [isScanning, setIsScanning] = useState(false);

    // Mock Networks
    const networks = ['Home_WiFi', 'Gym_Guest', 'Starbucks_Free', 'iPhone_Hotspot'];

    const handleWifiToggle = () => {
        toggleWifi();
        if (!isWifiOn) {
            setIsScanning(true);
            setTimeout(() => setIsScanning(false), 2000); // Simulate scanning delay
        }
    };

    return (
        <div style={{
            height: '100%',
            width: '100%',
            overflowY: 'auto',
            padding: '40px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        }} className="settings-page">

            <h3 style={{ textAlign: 'center', margin: '0 0 10px 0', fontSize: '1rem' }}>Settings</h3>

            {/* Brightness Control */}
            <div className="setting-item">
                <label style={{ fontSize: '0.8rem', color: '#aaa', display: 'block', marginBottom: '5px' }}>
                    Brightness: {brightness}%
                </label>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    style={{ width: '100%' }}
                />
            </div>

            {/* Bluetooth Toggle */}
            <div className="setting-row" onClick={toggleBluetooth}>
                <span>Bluetooth</span>
                <div className={`toggle-switch ${isBluetoothOn ? 'active' : ''}`}>
                    <div className="toggle-knob" />
                </div>
            </div>

            {/* WiFi Section */}
            <div>
                <div className="setting-row" onClick={handleWifiToggle}>
                    <span>WiFi</span>
                    <div className={`toggle-switch ${isWifiOn ? 'active' : ''}`}>
                        <div className="toggle-knob" />
                    </div>
                </div>

                {isWifiOn && (
                    <div style={{ background: '#222', borderRadius: '8px', padding: '10px', marginTop: '10px', fontSize: '0.8rem' }}>
                        {isScanning ? (
                            <div style={{ textAlign: 'center', color: '#888' }}>Scanning...</div>
                        ) : (
                            <>
                                {wifiNetwork && <div style={{ color: '#4caf50', marginBottom: '8px' }}>✓ Connected: {wifiNetwork}</div>}
                                <div style={{ fontWeight: 'bold', color: '#666', marginBottom: '5px' }}>Available Networks:</div>
                                {networks.map(net => (
                                    <div
                                        key={net}
                                        onClick={() => connectWifi(net)}
                                        style={{
                                            padding: '8px',
                                            borderBottom: '1px solid #333',
                                            cursor: 'pointer',
                                            opacity: wifiNetwork === net ? 0.5 : 1
                                        }}
                                    >
                                        {net}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                .settings-page::-webkit-scrollbar { display: none; }
                .setting-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #333;
                    padding: 12px;
                    borderRadius: 8px;
                    cursor: pointer;
                }
                .toggle-switch {
                    width: 40px;
                    height: 20px;
                    background: #555;
                    border-radius: 10px;
                    position: relative;
                    transition: background 0.3s;
                }
                .toggle-switch.active {
                    background: #4caf50;
                }
                .toggle-knob {
                    width: 16px;
                    height: 16px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    transition: left 0.3s;
                }
                .toggle-switch.active .toggle-knob {
                    left: 22px;
                }
            `}</style>
        </div>
    );
};
