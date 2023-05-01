const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const livestreamController = require('../controllers/livestreamController');

router.post('/', authMiddleware, livestreamController.createLivestream);
router.get('/', livestreamController.getAllLivestreams);
router.get('/:id', livestreamController.getLivestreamById);
router.put('/:id', authMiddleware, livestreamController.updateLivestreamById);
router.delete('/:id', authMiddleware, livestreamController.deleteLivestreamById);

module.exports = router;
