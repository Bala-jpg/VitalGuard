# main.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow React to connect to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Blueprint for the data coming from Arduino
class VitalsData(BaseModel):
    spo2: int
    heart_rate: int

# List to keep track of connected React screens
active_connections: List[WebSocket] = []

@app.websocket("/ws/vitals")
async def websocket_vitals(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    print("🟢 React Dashboard Connected!")
    try:
        while True:
            # Keep the WebSocket open
            await websocket.receive_text() 
    except WebSocketDisconnect:
        active_connections.remove(websocket)
        print("🔴 React Dashboard Disconnected")

@app.post("/api/vitals")
async def receive_vitals_from_arduino(data: VitalsData):
    print(f"Received from Arduino -> SpO2: {data.spo2}%, HR: {data.heart_rate} BPM")
    
    # Instantly forward this data to the React dashboard
    for connection in active_connections:
        await connection.send_json({
            "spo2": data.spo2,
            "heart_rate": data.heart_rate
        })
        
    return {"status": "success"}