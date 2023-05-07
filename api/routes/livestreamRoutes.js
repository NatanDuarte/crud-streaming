const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const livestreamController = require('../controllers/livestreamController');

router.post('/create', authMiddleware, livestreamController.createLivestream);
router.get('/all', livestreamController.getAllLivestreams);
router.get('/get/:id', livestreamController.getLivestreamById);
router.put('/put/:id', authMiddleware, livestreamController.updateLivestreamById);
router.delete('/delete/:id', authMiddleware, livestreamController.deleteLivestreamById);

module.exports = router;
