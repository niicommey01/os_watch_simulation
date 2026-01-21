# Presentation Slides: Wearable Device OS (Group 45)

## Slide 1: Title Slide
*   **Project Title**: Wearable Device Operating System
*   **Subtitle**: A React-based Simulation of Next-Gen WatchOS
*   **Group**: 45
*   **Course**: Operating Systems (DCIT 301)

> **Speaker Notes**: Good morning/afternoon. We are Group 45, and we are presenting our simulation of a new wearable operating system tailored for smartwatches.

---

## Slide 2: Problem Statement & Motivation
*   **The Challenge**:
    *   Smartwatches have tiny screens (circular form factor).
    *   Battery life is critical (300mAh capacity).
    *   Need to process sensor data continuously.
*   **Our Solution**:
    *   A lightweight, event-driven OS focused on efficiency.
    *   Optimized UI for circular displays.

> **Speaker Notes**: Traditional OSs like Windows or even Android are too heavy for a watch. Our motivation was to build something from the ground up that prioritizes battery life and usability on a small, round screen.

---

## Slide 3: System Architecture
*   **Kernel Layer**: Manages Global State (Time, Battery, Connectivity).
*   **Sensor Layer**: Simulates Hardware Inputs (Heart Rate, Accelerometer).
*   **UI Shell**: Handles rendering "Round" apps on square pixels.
*   **Application Sandbox**: Isolated environments for Clock, Health, Phone apps.

> **Speaker Notes**: We adopted a modular architecture. The Kernel acts as the brain, broadcasting state changes like "Low Battery" to all apps. The UI Shell ensures that no matter what app you run, it fits perfectly within the circular bezel.

---

## Slide 4: Key Features - Power Management
*   **Intelligent Battery Drain Model**:
    *   **Idle**: 0.01% / sec
    *   **Screen On**: +0.05% / sec
    *   **Sensor Active**: +0.02% / sec
*   **Critical Alerts**:
    *   Warnings at 15%, 10%, 5%.
    *   **Hard Shutdown** at 0% (Screen Lockout).

> **Speaker Notes**: Power is our biggest constraint. Our kernel isn't just a timer; it calculates drain based on *context*. If you leave WiFi on and the screen bright, your watch dies much faster, just like in real life.

---

## Slide 5: Key Features - Sensor Integration
*   **Real-Time Data Visualization**:
    *   Health App plots live graph of Heart Rate.
    *   Simulated hardware inputs (Sliders) allow testing "High Intensity" scenarios.
*   **Connectivity**:
    *   WiFi Scanning simulation.
    *   Bluetooth toggling.

> **Speaker Notes**: We didn't just build a UI; we built a hardware simulation. Our "Debug Panel" lets us act as the physical sensors, injecting data into the OS to see how it reacts.

---

## Slide 6: Demonstration (Live Demo)
*   **Scenario 1**: Boot up and Navigation.
*   **Scenario 2**: Health Tracking (Spiking the Heart Rate).
*   **Scenario 3**: Notifications & Multitasking.
*   **Scenario 4**: Battery Drain & Shutdown.

> **Speaker Notes**: (Switch to the Live Demo now. Walk through the scenarios outlined in our Walkthrough document.)

---

## Slide 7: Technical Implementation
*   **Tech Stack**: TypeScript + React (Vite).
*   **Reasoning**:
    *   **TypeScript**: Enforces strict data types, simulating the memory safety needed in C/C++.
    *   **React Context**: Perfect model for a "Event Bus" or "Interrupt Controller".
*   **Challenges**:
    *   Clipping content to a circle (CSS masking).
    *   Managing shared state across 6+ applications.

> **Speaker Notes**: We chose TypeScript to model our data structures strictly. We used React's "Context" to behave like a system bus—allowing the Battery component to talk to the Settings component without them directly knowing about each other.

---

## Slide 8: Conclusion & Future Work
*   **Achievements**:
    *   Fully functional simulation.
    *   Met all Project Requirements (Sensors, Battery, UI).
*   **Future Improvements**:
    *   Gesture Support (Swipe Navigation).
    *   Persistent Storage (Save settings to disk).
    *   Integration with real Web Bluetooth API.

> **Speaker Notes**: In conclusion, we have built a robust platform for testing wearable OS concepts. It successfully mimics the constraints and capabilities of real hardware. Thank you. Questions?
