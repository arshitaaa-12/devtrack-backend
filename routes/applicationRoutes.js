const router = require('express').Router();
const {
  createApplication,
  getApplications,
  getStats,
  getApplication,
  updateApplication,
  deleteApplication
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getApplications)
  .post(createApplication);

router.get('/stats', getStats);

router.route('/:id')
  .get(getApplication)
  .patch(updateApplication)
  .delete(deleteApplication);

module.exports = router;