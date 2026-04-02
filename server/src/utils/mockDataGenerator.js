const Metric = require('../models/Metric');

const startMockDataStream = () => {
    console.log('Starting mock data stream simulator...');
    setInterval(async () => {
        try {
            await Metric.create({
                cpuUsage: Math.round((Math.random() * 20 + 20) * 100) / 100, 
                memoryUsage: Math.floor(Math.random() * 1000 + 4000), 
                temperature: Math.round((Math.random() * 15 + 40) * 100) / 100, 
                visitors: Math.floor(Math.random() * 50) + 100, 
                uptime: Math.floor(process.uptime())
            });
        } catch (error) {
            console.error('Data Mock Error:', error.message);
        }
    }, 5000); // Posts live data every 5 seconds
};

module.exports = startMockDataStream;
