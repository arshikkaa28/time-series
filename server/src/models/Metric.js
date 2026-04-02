const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    },
    cpuUsage: {
        type: Number,
        required: true
    },
    memoryUsage: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    visitors: {
        type: Number,
        required: true
    },
    uptime: {
        type: Number,
        required: true
    }
}, {
    timeseries: {
        timeField: 'timestamp',
        metaField: null,
        granularity: 'seconds'
    }
});

module.exports = mongoose.model('Metric', metricSchema);
