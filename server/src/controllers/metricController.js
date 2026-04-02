const { validationResult } = require('express-validator');
const Metric = require('../models/Metric');

// @desc    Ingest new metrics
// @route   POST /api/metrics
const ingestMetrics = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { cpuUsage, memoryUsage, temperature, visitors, uptime } = req.body;
        
        const metric = await Metric.create({
            cpuUsage,
            memoryUsage,
            temperature,
            visitors,
            uptime
        });

        res.status(201).json({ success: true, data: metric });
    } catch (error) {
        next(error);
    }
};

// @desc    Get real-time metrics (latest 50)
// @route   GET /api/metrics/realtime
const getRealtimeMetrics = async (req, res, next) => {
    try {
        const metrics = await Metric.find().sort({ timestamp: -1 }).limit(50);
        res.status(200).json({ success: true, data: metrics.reverse() });
    } catch (error) {
        next(error);
    }
};

// @desc    Get hourly aggregated metrics
// @route   GET /api/metrics/hourly
const getHourlyMetrics = async (req, res, next) => {
    try {
        const metrics = await Metric.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$timestamp" },
                        month: { $month: "$timestamp" },
                        day: { $dayOfMonth: "$timestamp" },
                        hour: { $hour: "$timestamp" }
                    },
                    avgCpu: { $avg: "$cpuUsage" },
                    avgMem: { $avg: "$memoryUsage" },
                    avgTemp: { $avg: "$temperature" },
                    totalVisitors: { $sum: "$visitors" }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1, "_id.hour": -1 } },
            { $limit: 24 }
        ]);

        res.status(200).json({ success: true, data: metrics });
    } catch (error) {
        next(error);
    }
};

// @desc    Get daily aggregated metrics
// @route   GET /api/metrics/daily
const getDailyMetrics = async (req, res, next) => {
    try {
        const metrics = await Metric.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$timestamp" },
                        month: { $month: "$timestamp" },
                        day: { $dayOfMonth: "$timestamp" }
                    },
                    avgCpu: { $avg: "$cpuUsage" },
                    avgMem: { $avg: "$memoryUsage" },
                    avgTemp: { $avg: "$temperature" },
                    totalVisitors: { $sum: "$visitors" }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } },
            { $limit: 7 }
        ]);

        res.status(200).json({ success: true, data: metrics });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    ingestMetrics,
    getRealtimeMetrics,
    getHourlyMetrics,
    getDailyMetrics
};
