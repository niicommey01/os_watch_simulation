# Wearable OS Simulation: Technical & Non-Technical Explanations

## For Non-Technical Stakeholders (The "What" and "Why")

### What is this Project?
We have built a simulation of a smartwatch operating system (OS). Since building a physical watch from scratch is complex and expensive, we use a web-based simulation to demonstrate how the software would work on a real device. Think of it like a flight simulator for a pilot—it looks and behaves like the real thing, but runs on a computer screen.

### Key Concepts

1.  **The "Operating System" (OS)**: This is the brain of the watch. Just as your phone manages your battery, notifications, and apps, our simulated OS does the same. It decides which app is shown on the screen and how much battery is being used.
2.  **Sensors**: Smartwatches have sensors to detect movement (Accelerometer) and health stats (Heart Rate). In our simulation, we provide a "Control Panel" where you can adjust simulated heart rate sliders. You'll see the watch react instantly—if you slide the heart rate up, the health app graph spikes!
3.  **Battery Management**: One of the biggest challenges for wearables is battery life. Our system simulates this by calculating "energy drain." If you turn on Bluetooth or run a high-intensity game, you'll watch the battery percentage drop faster. This demonstrates our attention to the requirement of "Optimizing for battery life."
4.  **User Interface (UI)**: The screen is small and round. We designed the interface specifically for this "form factor." Buttons are large and easy to tap, and lists curve around the edges of the screen to maximize space.

---

## For Technical Stakeholders (The "How")

### Architecture Overview
The simulation is built using **React** with **TypeScript** and **Vite**. This modern stack ensures high performance and type safety, critical for a complex state-driven application.

### Core Components

1.  **Global State Management (The Kernel)**:
    We use React's `Context API` to act as the OS Kernel. The `SystemContext` holds the "Global Truth" of the device:
    *   `batteryLevel`: `number` (0-100)
    *   `isBluetoothOn`: `boolean`
    *   `notifications`: `Array<Notification>`
    *   `currentTime`: `Date`

    This ensures that no matter which "App" is open, the top status bar always shows the correct time and battery, just like a real OS.

2.  **The Event Loop (The Heartbeat)**:
    A real OS has a scheduler. We simulate this using a `monitor` loop (using `useEffect` and `setInterval`). Every second (or faster in simulation time), the "Kernel":
    *   Checks active processes.
    *   Calculates battery drain (Base drain + drain from active sensors).
    *   Updates the system clock.

3.  **Sensor Simulation**:
    Instead of reading physical hardware registers, we subscribe to a `SensorContext`. This context exposes setters that are bound to HTML Range Sliders in the debug panel.
    *   *Real Implementation*: `read_gpio(PIN_1)`
    *   *Simulation*: `const [heartRate, setHeartRate] = useState(72)`

4.  **Component Modularity**:
    *   `WatchFrame`: A CSS-styled container that clips content to a circle (`border-radius: 50%`, `overflow: hidden`).
    *   `AppLauncher`: A grid system that renders available applications.
    *   `NotificationOverlay`: A high Z-index layer that acts as an "interrupt" to the current screen.

### Key Code Highlights to Look For
*   **Custom Hooks**: `useBattery(drainRate)` to encapsulate energy logic.
*   **CSS Modules/Styled Components**: Usage of `backdrop-filter: blur()` to create glassmorphism effects common in modern OS design (like watchOS).
