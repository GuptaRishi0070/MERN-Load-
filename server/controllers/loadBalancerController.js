const LoadBalancer = require('../services/loadBalancer');

const lb = new LoadBalancer();

exports.routeRequest = async (req, res) => {
    const { apiType, payload } = req.body;
    const response = await lb.routeRequest(apiType, payload);
    res.json(response);
};

exports.enqueueRequest = (req, res) => {
    const { apiType, payload, priority } = req.body;
    lb.enqueueRequest(apiType, payload, priority);
    res.json({ status: 'queued' });
};

exports.processQueue = async (req, res) => {
    const { queueType } = req.body;
    await lb.processRequests(queueType);
    res.json({ status: 'processed' });
};

exports.getMetrics = (req, res) => {
    res.json(lb.getMetrics());
};
