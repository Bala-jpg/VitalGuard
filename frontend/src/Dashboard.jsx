import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [vitals, setVitals] = useState({ heart_rate: '--', spo2: '--' });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/vitals');
    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setVitals({ heart_rate: data.heart_rate || '--', spo2: data.spo2 || '--' });
    };
    return () => ws.close();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <style>
        {`
          :root {
            --cyan-glow: #00f2fe;
            --dark-bg: #0b0e14;
            --card-bg: rgba(255, 255, 255, 0.03);
            --text-main: #e2e8f0;
            --text-dim: #94a3b8;
          }

          /* Global Layout */
          .dashboard-wrapper {
            min-height: 100vh;
            background-color: var(--dark-bg);
            background-image: 
              radial-gradient(circle at 0% 0%, rgba(0, 242, 254, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(79, 172, 254, 0.05) 0%, transparent 50%);
            color: var(--text-main);
            font-family: 'Inter', system-ui, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
          }
            /* COMPACT PATIENT INFO BOX */
.patient-info-box {
  position: absolute;
  top: 20px;     /* Moved closer to the edge */
  right: 20px;    /* Moved closer to the edge */
  text-align: right;
  background: rgba(255, 255, 255, 0.02);
  padding: 10px 18px; /* Reduced padding from 15/25 to 10/18 */
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  max-width: 220px;   /* Constrains the width */
}

.patient-name {
  font-size: 0.95rem; /* Shrunk from 1.2rem */
  font-weight: 800;
  color: var(--cyan-glow);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.patient-details {
  font-size: 0.7rem;  /* Shrunk from 0.85rem */
  color: var(--text-dim);
  margin-top: 4px;
  line-height: 1.4;   /* Tighter spacing between lines */
  display: flex;
  flex-direction: column;
  gap: 1px;
}

/* Optional: Make the "labels" even subtler */
.patient-details strong {
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
}

          /* Header Section */
          .header-group {
            text-align: center;
            margin-bottom: 50px;
          }

          .main-title {
            text-shadow: 0 0 10px rgba(0,242,254,0.3);
            font-size: clamp(1.8rem, 5vw, 2.8rem);
            font-weight: 800;
            letter-spacing: -1px;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 15px;
          }

          /* Live Indicator */
          .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 8px 20px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 1px;
          }

          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
          }

          .pulse-dot::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: inherit;
            animation: ripple 1.5s infinite;
          }

          @keyframes ripple {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
          }

          /* RESPONSIVE GRID - This centers your cards perfectly */
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            width: 100%;
            max-width: 1000px;
            justify-content: center; /* Centers cards if they don't fill the row */
          }

          /* Metric Cards */
          .metric-card {
            background: var(--card-bg);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 40px;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
          }

          .metric-card:hover {
            transform: translateY(-10px);
            border-color: var(--cyan-glow);
            box-shadow: 0 0 30px rgba(0, 242, 254, 0.15);
          }

          /* Hover Glow Overlay */
          .metric-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: radial-gradient(circle at center, rgba(0, 242, 254, 0.1), transparent 70%);
            opacity: 0;
            transition: opacity 0.4s;
          }

          .metric-card:hover::before { opacity: 1; }

          .label {
            color: var(--text-dim);
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 20px;
          }

          .value-group {
            display: flex;
            align-items: baseline;
            justify-content: center;
            gap: 10px;
          }

          .big-number {
            font-size: 5rem;
            font-weight: 900;
            line-height: 1;
          }

          .unit {
            font-size: 1.2rem;
            color: var(--text-dim);
            font-weight: 500;
          }

          /* Responsive Breakpoints */
          @media (max-width: 680px) {
            .metrics-grid {
              grid-template-columns: 1fr;
              max-width: 400px;
            }
            .big-number { font-size: 4rem; }
          }
        `}
      </style>
    <div className="patient-info-box">
        <h3 className="patient-name">Heisenberg</h3>
        <div className="patient-details">
          <span><strong>Age:</strong> 52 Years</span>
          <span><strong>ID:</strong> PT-99-6-2008</span>
          <span><strong>Ward:</strong> Normal | <strong>Bed:</strong> 12</span>
        </div>
      </div>
      <header className="header-group">
        <h2 className="main-title">Vital-Guard</h2>
        <div className="status-badge">
          <div className="pulse-dot" style={{ backgroundColor: isConnected ? '#00fe6a' : '#ff4b2b' }} />
          <span style={{ color: isConnected ? '#00fe6a' : '#ff4b2b' }}>
            {isConnected ? 'STABLE CONNECTION' : 'LINK SEVERED'}
          </span>
        </div>
      </header>

      <main className="metrics-grid">
        <div className="metric-card">
          <div className="label">Heart Rate</div>
          <div className="value-group">
            <span className="big-number" style={{ color: '#e2e8f0', textShadow: '0 0 20px rgba(0,242,254,0.3)' }}>
              {vitals.heart_rate}
            </span>
            <span className="unit">BPM</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="label">Blood Oxygen Level</div>
          <div className="value-group">
            <span className="big-number" style={{ color: '#e2e8f0', textShadow: '0 0 20px rgba(0,242,254,0.3)'}}>
              {vitals.spo2}
            </span>
            <span className="unit">%</span>
          </div>
        </div>
      </main>
    </div>
  );
}