// routes/pictureRoutes.js
import express from 'express';
import Picture from '../models/pictureModel.js';

const router = express.Router();

// CREATE (POST) - Add a new picture
router.post('/', async (req, res) => {
  try {
    const { url, description } = req.body;
    const newPicture = new Picture({ url, description });
    const savedPicture = await newPicture.save();
    res.status(201).json(savedPicture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ALL (GET) - Get all pictures
router.get('/', async (req, res) => {
  try {
      const pictures = await Picture.find(); // Fetch all pictures from MongoDB
      res.status(200).json(pictures); // Send pictures data as JSON
  } catch (error) {
      res.status(500).json({ message: 'Error fetching pictures' });
  }
});

// READ ONE (GET by ID) - Get a picture by ID
router.get('/:id', async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) return res.status(404).json({ message: 'Picture not found' });
    res.json(picture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE (PUT) - Update a picture by ID
router.put('/:id', async (req, res) => {
  try {
    const { url, description } = req.body;
    const updatedPicture = await Picture.findByIdAndUpdate(
      req.params.id,
      { url, description },
      { new: true }
    );
    if (!updatedPicture) return res.status(404).json({ message: 'Picture not found' });
    res.json(updatedPicture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE (DELETE) - Remove a picture by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPicture = await Picture.findByIdAndDelete(req.params.id);
    if (!deletedPicture) return res.status(404).json({ message: 'Picture not found' });
    res.json({ message: 'Picture deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
