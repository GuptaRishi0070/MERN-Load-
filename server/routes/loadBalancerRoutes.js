const express = require('express');
const router = express.Router();
const loadBalancerController = require('../controllers/loadBalancerController');

router.post('/route', loadBalancerController.routeRequest);
router.post('/enqueue', loadBalancerController.enqueueRequest);
router.post('/process', loadBalancerController.processQueue);
router.get('/metrics', loadBalancerController.getMetrics);

module.exports = router;
