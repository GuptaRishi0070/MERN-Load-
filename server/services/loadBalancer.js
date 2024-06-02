const axios = require('axios');

class LoadBalancer {
    constructor() {
        this.endpoints = {
            "REST": "http://localhost:5000/api/rest",
            "GraphQL": "http://localhost:5000/api/graphql",
            "gRPC": "http://localhost:5000/api/grpc"
        };
        this.metrics = [];
        this.fifoQueue = [];
        this.priorityQueue = [];
    }

    async routeRequest(apiType, payload) {
        const url = this.selectEndpoint(apiType);
        const startTime = Date.now();
        const response = await axios.post(url, payload);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        const logEntry = {
            api_type: apiType,
            endpoint: url,
            response_time: responseTime,
            payload_size: JSON.stringify(payload).length
        };
        this.metrics.push(logEntry);
        console.log(`Routed to ${url} with response time ${responseTime}, total time ${endTime - startTime}`);
        return response.data;
    }

    selectEndpoint(apiType) {
        if (apiType in this.endpoints) {
            return this.endpoints[apiType];
        } else {
            const keys = Object.keys(this.endpoints);
            return this.endpoints[keys[Math.floor(Math.random() * keys.length)]];
        }
    }

    getMetrics() {
        return this.metrics;
    }

    enqueueRequest(apiType, payload, priority = 1) {
        if (priority === 1) {
            this.fifoQueue.push({ apiType, payload });
        } else {
            this.priorityQueue.push({ priority, apiType, payload });
            this.priorityQueue.sort((a, b) => b.priority - a.priority); // Sort by priority
        }
    }

    async processRequests(queueType = 'fifo') {
        if (queueType === 'fifo') {
            while (this.fifoQueue.length > 0) {
                const { apiType, payload } = this.fifoQueue.shift();
                await this.routeRequest(apiType, payload);
            }
        } else if (queueType === 'priority') {
            while (this.priorityQueue.length > 0) {
                const { apiType, payload } = this.priorityQueue.shift();
                await this.routeRequest(apiType, payload);
            }
        }
    }
}

module.exports = LoadBalancer;
