# System Diagrams (Group 45)

This document contains visual diagrams reflecting the architecture and design of our Wearable OS Simulation. These can be used in the Technical Report or Presentation.

## 1. System Architecture Diagram
This high-level overview shows the layered architecture of the simulation, from the simulated hardware up to the user-facing applications.

```mermaid
graph TD
    subgraph "Layer 4: Applications"
        App1[Clock App]
        App2[Health App]
        App3[Phone App]
        App4[Weather App]
    end

    subgraph "Layer 3: UI Shell"
        Shell["WatchFrame (Container)"]
        Status[Status Bar]
        Notifs[Notification Overlay]
        Launcher[App Grid]
    end

    subgraph "Layer 2: Kernel (Core Logic)"
        SysContext["SystemContext (OS State)"]
        Scheduler["Tick Scheduler (1Hz)"]
        BatMan[Battery Manager]
        ConnMan[Connectivity Manager]
    end

    subgraph "Layer 1: Hardware Simulation"
        SimPanel[Simulation Control Panel]
        Sensors["SensorContext (HR, Steps)"]
        Inputs["Physical Buttons & Touch"]
    end

    %% Connections
    SimPanel -->|Injects Data| Sensors
    Inputs -->|Events| Shell
    Sensors -->|Updates| SysContext
    
    SysContext -->|Provides State| Status
    SysContext -->|Provides State| Notifs
    
    Shell -->|Hosts| Launcher
    Launcher -->|Launches| App1
    Launcher -->|Launches| App2
    Launcher -->|Launches| App3
    Launcher -->|Launches| App4
    
    App2 -->|Reads| Sensors
    App3 -->|Uses| SysContext
```

## 2. Kernel Class Diagram
A detailed view of the primary state containers (Contexts) acting as the OS Kernel.

```mermaid
classDiagram
    class SystemContext {
        +int batteryLevel
        +bool isScreenOn
        +bool isWifiOn
        +string wifiNetwork
        +int brightness
        +Array notifications
        +toggleScreen()
        +drainBattery()
        +addNotification()
    }

    class SensorContext {
        +int heartRate
        +int steps
        +bool isMoving
        +setHeartRate()
        +toggleMotion()
    }

    class SystemNotification {
        +string id
        +string title
        +string message
        +Date timestamp
    }

    SystemContext "1" *-- "*" SystemNotification : manages
    SystemContext ..> SensorContext : interacts_with
```

## 3. Battery Management State Machine
Visualizing the transitions between different battery states and the actions triggered (Alerts, Shutdown).

```mermaid
stateDiagram-v2
    [*] --> Normal
    
    state Normal {
        [*] --> HighBattery
    }

    Normal --> LowBattery : < 15%
    LowBattery : Entry / Send 'Low Battery' Notification
    
    LowBattery --> Critical : < 5%
    Critical : Entry / Send 'Critical Warning' Notification
    
    Critical --> Shutdown : = 0%
    Shutdown : Entry / Screen Off
    Shutdown : Exit / Requires Recharge
    
    Shutdown --> Normal : Recharged
```

## 4. Sensor Data Flow Sequence
Tracing the path of a sensor event (simulated heart rate change) through the system.

```mermaid
sequenceDiagram
    participant User
    participant SimPanel as Simulation Panel
    participant SensorCtx as Sensor Context
    participant HealthApp as Health App
    participant Screen as Watch Screen

    User->>SimPanel: slides Heart Rate to 120bpm
    SimPanel->>SensorCtx: setHeartRate(120)
    Note over SensorCtx: State Update Triggered
    SensorCtx-->>HealthApp: Context Broadcast (New Value)
    HealthApp->>HealthApp: Re-render Graph
    HealthApp-->>Screen: Update DOM
    Screen-->>User: Visual Spike on Graph
```
