const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
    api_type: { type: String, required: true },
    endpoint: { type: String, required: true },
    response_time: { type: Number, required: true },
    payload_size: { type: Number, required: true },
});

module.exports = mongoose.model('Metric', MetricSchema);
