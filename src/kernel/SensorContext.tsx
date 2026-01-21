import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Simulated Sensor Data
export interface SensorState {
    heartRate: number; // BPM
    steps: number;
    isMoving: boolean;
    // Simulated raw accelerometer data typically handled by drivers, 
    // here we just expose a simple boolean for "motion detected"
}

interface SensorContextType extends SensorState {
    // Simulation Controls (Hardware Inputs)
    setSimulatedHeartRate: (bpm: number) => void;
    toggleMotion: (isMoving: boolean) => void;
    resetSteps: () => void;
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export const useSensors = () => {
    const context = useContext(SensorContext);
    if (!context) {
        throw new Error('useSensors must be used within a SensorProvider');
    }
    return context;
};

export const SensorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Default resting HR
    const [heartRate, setSimulatedHeartRate] = useState(72);
    const [steps, setSteps] = useState(0);
    const [isMoving, toggleMotion] = useState(false);

    // Simulation Loop: Update steps if moving
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isMoving) {
            interval = setInterval(() => {
                // Randomly add steps if "moving"
                setSteps(prev => prev + Math.floor(Math.random() * 3) + 1);

                // Fluctuate HR slightly if moving
                setSimulatedHeartRate(prev => {
                    const fluctuation = Math.floor(Math.random() * 5) - 2; // -2 to +2
                    // Clamp between 60 and 180 for realism in this demo logic
                    return Math.min(180, Math.max(60, prev + fluctuation));
                });

            }, 2000);
        }

        return () => clearInterval(interval);
    }, [isMoving]);

    const value: SensorContextType = {
        heartRate,
        steps,
        isMoving,
        setSimulatedHeartRate,
        toggleMotion,
        resetSteps: () => setSteps(0)
    };

    return (
        <SensorContext.Provider value={value}>
            {children}
        </SensorContext.Provider>
    );
};
