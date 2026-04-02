require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const metricRoutes = require('./routes/metricRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const startMockDataStream = require('./utils/mockDataGenerator');

// Connect Database
connectDB();

// Start simulating live data points
if (process.env.NODE_ENV === 'development') {
    startMockDataStream();
}

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/metrics', metricRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
