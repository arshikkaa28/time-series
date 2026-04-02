const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
    ingestMetrics,
    getRealtimeMetrics,
    getHourlyMetrics,
    getDailyMetrics
} = require('../controllers/metricController');

router.route('/')
    .post([
        check('cpuUsage', 'CPU usage is required and must be a number').isNumeric(),
        check('memoryUsage', 'Memory usage is required and must be a number').isNumeric(),
        check('temperature', 'Temperature is required and must be a number').isNumeric(),
        check('visitors', 'Visitors is required and must be an integer').isInt(),
        check('uptime', 'Uptime is required and must be an integer').isInt(),
    ], ingestMetrics);

router.route('/realtime')
    .get(getRealtimeMetrics);

router.route('/hourly')
    .get(getHourlyMetrics);

router.route('/daily')
    .get(getDailyMetrics);

module.exports = router;
