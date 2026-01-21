import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

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
    isWifiOn: boolean;
    wifiNetwork: string | null;
    brightness: number;
    currentTime: Date;
    notifications: SystemNotification[];
    isScreenOn: boolean;
}

interface SystemContextType extends SystemState {
    // Actions
    toggleBluetooth: () => void;
    toggleWifi: () => void;
    connectWifi: (ssid: string) => void;
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
    const [isWifiOn, setIsWifiOn] = useState(false);
    const [wifiNetwork, setWifiNetwork] = useState<string | null>(null);
    const [brightness, setBrightness] = useState(100); // 0-100
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
                if (isWifiOn) drain += 0.08; // High drain for WiFi
                if (brightness > 80 && isScreenOn) drain += 0.05;

                setBatteryLevel(prev => Math.max(0, prev - drain));
            }
        }, 1000); // 1-second "tick"

        return () => clearInterval(timer);
    }, [batteryLevel, isScreenOn, isBluetoothOn, isWifiOn, brightness]);

    // --- Actions ---
    const toggleBluetooth = () => setIsBluetoothOn(prev => !prev);
    const toggleWifi = () => {
        setIsWifiOn(prev => {
            if (prev) setWifiNetwork(null); // Disconnect on off
            return !prev;
        });
    };
    const connectWifi = (ssid: string) => setWifiNetwork(ssid);

    const setDisplayBrightness = (level: number) => setBrightness(level);
    const toggleScreen = () => {
        if (batteryLevel > 0) {
            setIsScreenOn(prev => !prev);
        }
    };

    const drainBattery = (amount: number) => {
        setBatteryLevel(prev => Math.max(0, prev - amount));
    };

    const addNotification = (notif: Omit<SystemNotification, 'id' | 'timestamp'>) => {
        // If battery is dead, don't allow notifications to wake screen
        if (batteryLevel <= 0) return;

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

    // --- Battery Monitor Effect ---
    // We use a ref to ensure we don't spam notifications if it hovers around the integer
    const lastBatteryRef = useRef(batteryLevel);

    useEffect(() => {
        const prev = lastBatteryRef.current;
        const curr = batteryLevel;

        // Check thresholds (crossing downwards)
        if (prev > 15 && curr <= 15) {
            addNotification({ title: 'Low Battery', message: '15% remaining', appId: 'system' });
        } else if (prev > 10 && curr <= 10) {
            addNotification({ title: 'Low Battery', message: '10% remaining', appId: 'system' });
        } else if (prev > 5 && curr <= 5) {
            addNotification({ title: 'Critical Battery', message: '5% remaining. Charge now.', appId: 'system' });
        }

        // Shutdown at 0
        if (curr <= 0 && isScreenOn) {
            setIsScreenOn(false);
        }

        lastBatteryRef.current = curr;
    }, [batteryLevel, isScreenOn, addNotification]); // addNotification is a dependency because it's called inside

    const value: SystemContextType = {
        batteryLevel,
        isBluetoothOn,
        isWifiOn,
        wifiNetwork,
        brightness,
        currentTime,
        notifications,
        isScreenOn,
        toggleBluetooth,
        toggleWifi,
        connectWifi,
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
