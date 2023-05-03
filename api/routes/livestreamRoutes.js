const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const livestreamController = require('../controllers/livestreamController');

router.post('/stream', authMiddleware, livestreamController.createLivestream);
router.get('/stream', livestreamController.getAllLivestreams);
router.get('/stream/:id', livestreamController.getLivestreamById);
router.put('/stream/:id', authMiddleware, livestreamController.updateLivestreamById);
router.delete('/stream/:id', authMiddleware, livestreamController.deleteLivestreamById);

module.exports = router;
