import React, { useState } from 'react';
import { SystemProvider, useSystem } from './kernel/SystemContext';
import { SensorProvider } from './kernel/SensorContext';
import { WatchFrame } from './components/Hardware/WatchFrame';
import { StatusBar } from './components/System/StatusBar';
import { SimulationPanel } from './components/Debug/SimulationPanel';
import { AppGrid } from './components/Launcher/AppGrid';
import { ClockApp } from './apps/ClockApp';
import { HealthApp } from './apps/HealthApp';
import { NotificationOverlay } from './components/System/NotificationOverlay';
import './App.css'; // Global styles

const OSInterface: React.FC = () => {
  const { isScreenOn } = useSystem();
  // Navigation State
  const [currentApp, setCurrentApp] = useState<string>('clock');

  const handleLaunch = (appId: string) => {
    setCurrentApp(appId);
  };

  const handleHome = () => {
    if (currentApp === 'clock') {
      setCurrentApp('launcher');
    } else {
      setCurrentApp('clock');
    }
  };

  // Render Content based on App ID
  const renderContent = () => {
    if (!isScreenOn) return <div style={{ width: '100%', height: '100%', background: 'black' }} />;

    switch (currentApp) {
      case 'clock':
        return <ClockApp />;
      case 'launcher':
        return <AppGrid onLaunch={handleLaunch} />;
      case 'health':
        return <HealthApp />;
      case 'settings':
        return (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <h3>Settings</h3>
            <p>Bluetooth: On</p>
            <p>Brightness: 80%</p>
          </div>
        );
      default:
        return <div style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>App not found</div>;
    }
  };

  return (
    <div className="os-layout" style={{ display: 'flex', width: '100vw', height: '100vh', background: '#111', overflow: 'hidden' }}>

      {/* Simulation Panel (Left or Right) */}
      <SimulationPanel />

      {/* Main Watch Area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

        <WatchFrame onHome={handleHome}>
          {/* Always show Status Bar if screen is on (or maybe not in full screen apps, but for now yes) */}
          {isScreenOn && <StatusBar />}

          {/* Main App Content */}
          <div className="app-content" style={{ height: '100%', width: '100%' }}>
            {renderContent()}
          </div>

          {/* Overlays */}
          {isScreenOn && <NotificationOverlay />}

        </WatchFrame>

        {/* Instructions */}
        <div style={{ position: 'absolute', bottom: '20px', color: '#555', fontSize: '0.8rem' }}>
          <p>Use the panel on the left to simulate inputs.</p>
        </div>
      </div>

    </div>
  );
};

// Main Entry Point with Providers
const App: React.FC = () => {
  return (
    <SystemProvider>
      <SensorProvider>
        <OSInterface />
      </SensorProvider>
    </SystemProvider>
  );
};

export default App;
