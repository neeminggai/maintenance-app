const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

router.post('/', jobController.create);           // create job
router.get('/', jobController.findAll);           // look up all jobs
router.put('/batch', jobController.batchUpdate);  // look up all jobs
router.put('/:id', jobController.updateOne);      // look up all jobs
router.patch('/:id/archive', jobController.archive); // archive

module.exports = router;