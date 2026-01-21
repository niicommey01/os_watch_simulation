# Wearable OS Simulation (Group 45)

A React-based simulation of a next-generation Operating System designed for circular smartwatch displays.

## Project Overview
This project simulates the core functions of a wearable OS, focusing on resource constraints, circular UI interaction, and hardware sensor integration. It allows developers to test OS logic (battery management, interrupts) in a web browser without needing physical hardware.

## Features
*   **Circular UI**: Custom CSS engine to handle round displays and bezel masking.
*   **Kernel Simulation**:
    *   **Battery Management**: Dynamic drain based on active peripherals (WiFi, Screen, Sensors).
    *   **Shutdown Logic**: Hard lockout when battery hits 0%.
*   **Applications**:
    *   **Clock**: Real-time timekeeping.
    *   **Health**: Live heart-rate visualization (SVG Graphs).
    *   **Settings**: Control Brightness, WiFi, and Bluetooth.
    *   **Phone**: Functional T9 Dialer.
*   **Simulation Panel**: Sidebar controls to inject "Hardware" events (Sensor data, Notifications).

## Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Simulation
Start the development server:
```bash
npm run dev
```
Open your browser to the URL shown (usually `http://localhost:5173`).

## Project Structure
*   `src/kernel`: Contains `SystemContext` (OS State) and `SensorContext` (Hardware Simulation).
*   `src/components/Hardware`: The WatchFrame and Bezel UI.
*   `src/components/System`: System-level overlays (Status Bar, Notifications).
*   `src/apps`: Individual application modules (Clock, Health, Phone, etc).

## Documentation
*   [Technical Report Content](Technical_Report_Content.md): Full detailed report.
*   [Presentation Slides](Presentation_Slides.md): Content for the final presentation.
*   [Technical Notes](Technical_Non_Technical_Notes.md): Additional implementation details.

---
**Group 45** - DCIT 301 Operating Systems
