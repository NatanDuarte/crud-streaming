const Livestream = require('../models/Livestream');

async function createLivestream(req, res) {
  try {
    const { title, description, date } = req.body;
    const userId = req.decoded.id;
    const livestream = await Livestream.create({ title, description, date, userId });
    res.status(201).json(livestream);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllLivestreams(req, res) {
  try {
    const livestreams = await Livestream.find().populate('userId', 'name email');
    res.json(livestreams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getLivestreamById(req, res) {
  try {
    const livestream = await Livestream.findById(req.params.id).populate('userId', 'name email');
    if (!livestream) {
      return res.status(404).json({ message: 'Livestream not found' });
    }
    res.json(livestream);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateLivestreamById(req, res) {
  try {
    const { title, description, date } = req.body;
    const livestream = await Livestream.findById(req.params.id);
    if (!livestream) {
      return res.status(404).json({ message: 'Livestream not found' });
    }
    if (livestream.userId.toString() !== req.decoded.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    livestream.title = title;
    livestream.description = description;
    livestream.date = date;
    await livestream.save();
    res.json(livestream);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteLivestreamById(req, res) {
  try {
    const livestream = await Livestream.findById(req.params.id);
    if (!livestream) {
      return res.status(404).json({ message: 'Livestream not found' });
    }
    if (livestream.userId.toString() !== req.decoded.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await livestream.remove();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createLivestream,
  getAllLivestreams,
  getLivestreamById,
  updateLivestreamById,
  deleteLivestreamById,
};
