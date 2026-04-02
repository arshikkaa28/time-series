# 📈 Time Series Monitoring System

A production-ready full-stack application natively built to track and visualize real-time CPU, Memory, Temperature, Visitors, and Uptime metrics dynamically via the MERN stack and Chart.js.

## Overview
- **/client**: React, Vite, Chart.js, Axios
- **/server**: Node.js, Express.js, MongoDB (Mongoose), Shell Scripts

## Setup Procedure
1. Have MongoDB installed and running on `localhost:27017` locally.
2. Navigate to `time-series-monitor/server/`.
3. Start Backend: Run `node src/server.js` or `npm start`
4. Navigate to `time-series-monitor/client/`.
5. Start Frontend: Run `npm run dev`
6. Open your local web browser dynamically pointed out by Vite to view the live dashboard.

## Ingesting Data into System
Submit a POST request to `http://localhost:5000/api/metrics` with standard HTTP JSON mapping:
```json
{
  "cpuUsage": 85,
  "memoryUsage": 4096,
  "temperature": 77,
  "visitors": 150,
  "uptime": 3600
}
```

## Maintenance Script
Execute `bash server/scripts/cleanup.sh` to remove legacy metric records older than 30 days.
