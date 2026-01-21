import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for our System State
export interface SystemNotification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    appId: string;
}

export interface SystemState {
    batteryLevel: number;
    isBluetoothOn: boolean;
    brightness: number;
    currentTime: Date;
    notifications: SystemNotification[];
    isScreenOn: boolean;
}

interface SystemContextType extends SystemState {
    // Actions
    toggleBluetooth: () => void;
    setBrightness: (level: number) => void;
    addNotification: (notification: Omit<SystemNotification, 'id' | 'timestamp'>) => void;
    clearNotification: (id: string) => void;
    toggleScreen: () => void;
    drainBattery: (amount: number) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const useSystem = () => {
    const context = useContext(SystemContext);
    if (!context) {
        throw new Error('useSystem must be used within a SystemProvider');
    }
    return context;
};

export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // --- Core State ---
    const [batteryLevel, setBatteryLevel] = useState(100);
    const [isBluetoothOn, setIsBluetoothOn] = useState(true);
    const [brightness, setBrightness] = useState(80);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [notifications, setNotifications] = useState<SystemNotification[]>([]);
    const [isScreenOn, setIsScreenOn] = useState(true);

    // --- "Kernel" Loop (Time & Battery) ---
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());

            // Base battery drain (higher if BT is on, screen is on)
            if (batteryLevel > 0) {
                let drain = 0.01; // Base idle drain per tick
                if (isScreenOn) drain += 0.05;
                if (isBluetoothOn) drain += 0.03;

                setBatteryLevel(prev => Math.max(0, prev - drain));
            }
        }, 1000); // 1-second "tick"

        return () => clearInterval(timer);
    }, [batteryLevel, isScreenOn, isBluetoothOn]);

    // --- Actions ---
    const toggleBluetooth = () => setIsBluetoothOn(prev => !prev);
    const setDisplayBrightness = (level: number) => setBrightness(level);
    const toggleScreen = () => setIsScreenOn(prev => !prev);

    const drainBattery = (amount: number) => {
        setBatteryLevel(prev => Math.max(0, prev - amount));
    };

    const addNotification = (notif: Omit<SystemNotification, 'id' | 'timestamp'>) => {
        const newNotif: SystemNotification = {
            ...notif,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date()
        };
        setNotifications(prev => [newNotif, ...prev]);

        // Auto-wake screen on notification
        if (!isScreenOn) setIsScreenOn(true);
    };

    const clearNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const value: SystemContextType = {
        batteryLevel,
        isBluetoothOn,
        brightness,
        currentTime,
        notifications,
        isScreenOn,
        toggleBluetooth,
        setBrightness: setDisplayBrightness,
        addNotification,
        clearNotification,
        toggleScreen,
        drainBattery
    };

    return (
        <SystemContext.Provider value={value}>
            {children}
        </SystemContext.Provider>
    );
};
