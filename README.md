# 🩺 VitalGuard – IoT-Based Health Monitoring System

## 📌 Overview

**VitalGuard** is an IoT-based real-time health monitoring system designed to track critical patient vitals such as **Heart Rate** and **SpO₂ (Oxygen Saturation)**. It integrates embedded hardware with a modern web dashboard to provide continuous monitoring and remote accessibility.

The system aims to support **early detection of health anomalies**, making it suitable for chronic patient monitoring and remote healthcare solutions.

---

## 🚀 Features

* 📡 Real-time monitoring of Heart Rate and SpO₂
* 📊 Live data visualization on dashboard
* 🧠 Simulated fallback mode for testing without hardware
* 🌐 IoT integration for remote monitoring
* 📱 Responsive UI (desktop & mobile friendly)
* ⚠️ Alert indicators for abnormal readings
* 🔄 Continuous data updates with low latency

---

## 🏗️ System Architecture

```
MAX30100 Sensor → ESP32 → Wi-Fi → API → Web Dashboard
```

---

## 🧰 Tech Stack

### 🔹 Hardware

* ESP32 Microcontroller
* MAX30100 / MAX30102 Pulse Oximeter Sensor
* 16x2 LCD with I2C (optional)

### 🔹 Software

* Arduino IDE (C++)
* Embedded C++
*  HTTP Protocol

### 🔹 Frontend

* HTML, CSS, JavaScript
* React.js (Typescript)

### 🔹 IoT

* Custom API

---

## ⚙️ Working Principle

1. The sensor collects **Heart Rate and SpO₂ data**
2. ESP32 processes and filters the data
3. Data is transmitted via Wi-Fi to server
4. Dashboard fetches and displays real-time data
5. Alerts are triggered for abnormal values

---

## 🧪 Simulation Mode

If hardware is unavailable, the system can simulate realistic readings:

* Heart Rate: **69–76 bpm**
* SpO₂: **97–99%**

This allows testing of:

* UI/UX
* Data pipeline
* Cloud integration

---

## 🛠️ Setup & Installation

### 1️⃣ Hardware Setup

* Connect MAX30100 to ESP32:

  * VIN → 5V
  * GND → GND
  * SDA → GPIO21
  * SCL → GPIO22

### 2️⃣ Software Setup

* Install Arduino IDE
* Install required libraries:

  * MAX30100 Pulse Oximeter
  * Wire (I2C)

### 3️⃣ Upload Code

* Select ESP32 board
* Upload the firmware
* Open Serial Monitor (115200 baud)

---

## ⚠️ Challenges Faced

* I2C communication issues with sensor
* Power stability (3.3V vs 5V confusion)
* Library compatibility with ESP32
* Sensor detection failures
* Hardware soldering

---

## 💡 Future Enhancements

* AI-based anomaly detection
* Multi-patient monitoring system
* Mobile application integration
* Secure cloud storage (HIPAA-ready)
* Additional sensors (ECG, temperature, BP)

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit pull requests.

---

## 👨‍💻 Author

**Balaji V**

---

## 🌟 Acknowledgements

* Open-source IoT community
* Arduino & ESP32 ecosystem
* Sensor library contributors

---

⭐ If you like this project, give it a star!
