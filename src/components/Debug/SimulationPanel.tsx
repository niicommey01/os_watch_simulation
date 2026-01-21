import React from 'react';
import { useSensors } from '../../kernel/SensorContext';
import { useSystem } from '../../kernel/SystemContext';

export const SimulationPanel: React.FC = () => {
    const { heartRate, setSimulatedHeartRate, isMoving, toggleMotion } = useSensors();
    const { batteryLevel, isBluetoothOn, addNotification, drainBattery } = useSystem();

    return (
        <div style={{
            width: '300px',
            background: '#1e1e1e',
            borderLeft: '1px solid #333',
            padding: '20px',
            color: '#eee',
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            height: '100vh',
            overflowY: 'auto'
        }}>
            <h2 style={{ borderBottom: '1px solid #444', paddingBottom: '10px' }}>Simulation Console</h2>

            {/* System Stats */}
            <div style={{ background: '#252525', padding: '10px', borderRadius: '5px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#888' }}>SYSTEM STATE</h3>
                <div>Battery: <span style={{ color: batteryLevel < 20 ? 'red' : 'lightgreen' }}>{batteryLevel.toFixed(1)}%</span></div>
                <div>Bluetooth: {isBluetoothOn ? 'ON' : 'OFF'}</div>
                <button
                    onClick={() => drainBattery(10)}
                    style={{ marginTop: '10px', padding: '5px', background: '#d32f2f', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    Force Drain 10%
                </button>
            </div>

            {/* Sensor Controls */}
            <div style={{ background: '#252525', padding: '10px', borderRadius: '5px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#888' }}>SENSORS (HARDWARE)</h3>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Heart Rate: {heartRate} BPM</label>
                    <input
                        type="range"
                        min="40"
                        max="200"
                        value={heartRate}
                        onChange={(e) => setSimulatedHeartRate(Number(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label>Movement:</label>
                    <button
                        onClick={() => toggleMotion(!isMoving)}
                        style={{
                            padding: '5px 15px',
                            background: isMoving ? '#4caf50' : '#444',
                            border: 'none',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {isMoving ? 'RUNNING' : 'IDLE'}
                    </button>
                </div>
            </div>

            {/* Events */}
            <div style={{ background: '#252525', padding: '10px', borderRadius: '5px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#888' }}>EVENTS</h3>
                <button
                    onClick={() => {
                        const messages = [
                            { title: 'New Message', message: 'Hey, are you coming to the gym?' },
                            { title: 'Missed Call', message: 'Mom called (2m ago)' },
                            { title: 'Email', message: 'Meeting rescheduled to 3 PM.' },
                            { title: 'Instagram', message: '@sarah liked your story.' },
                            { title: 'Calendar', message: 'Dentist Appointment in 30 mins.' },
                            { title: 'WhatsApp', message: 'Group: Lunch at 12?' },
                            { title: 'News', message: 'Breaking: Local cat wins award.' },
                            { title: 'Uber', message: 'Your ride is 2 mins away.' },
                            { title: 'Spotify', message: 'Now Playing: Blinding Lights' }
                        ];
                        const randomMsg = messages[Math.floor(Math.random() * messages.length)];

                        addNotification({
                            title: randomMsg.title,
                            message: randomMsg.message,
                            appId: 'system'
                        });
                    }}
                    style={{
                        width: '100%',
                        padding: '8px',
                        background: '#0288d1',
                        border: 'none',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginBottom: '10px'
                    }}
                >
                    Push Notification (Random)
                </button>

                <button
                    onClick={() => {
                        const healthAlerts = [
                            { title: 'Goal Reached!', message: 'You walked 10,000 steps today.' },
                            { title: 'High Heart Rate', message: 'HR above 120bpm while resting.' },
                            { title: 'Stand Up!', message: 'Time to stand up and move a bit.' },
                            { title: 'Hydration', message: 'Drink some water.' },
                            { title: 'Sleep Goal', message: 'You met your sleep goal (8h).' },
                            { title: 'Workout', message: 'Workout auto-detected: Walking' }
                        ];
                        const randomHealth = healthAlerts[Math.floor(Math.random() * healthAlerts.length)];

                        addNotification({
                            title: randomHealth.title,
                            message: randomHealth.message,
                            appId: 'health'
                        });
                    }}
                    style={{
                        width: '100%',
                        padding: '8px',
                        background: '#7b1fa2',
                        border: 'none',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Push Health Alert (Random)
                </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: 'auto' }}>
                Group 45 - Wearable OS Sim
            </div>
        </div>
    );
};
