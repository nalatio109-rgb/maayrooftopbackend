const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new contact
router.post('/', async (req, res) => {
  const { name, contactInfo, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      contactInfo,
      message
    });

    const savedContact = await newContact.save();

    // Emit event to Admin via Socket.IO
    const io = req.app.get('io');
    if (io) {
      io.emit('new_contact', savedContact);
    }

    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.status = req.body.status;
    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.deleteOne();
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
