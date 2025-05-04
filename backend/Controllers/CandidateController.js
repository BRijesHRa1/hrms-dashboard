// backend/Controllers/CandidateController.js
const Candidate = require('../Models/Candidate');

exports.addCandidate = async (req, res) => {
  try {
    const { name, email, phoneNumber, position, status, experience } = req.body;

    if (await Candidate.findOne({ email })) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const candidate = await Candidate.create({ name, email, phoneNumber, position, status, experience });
    res.status(201).json({ success: true, data: candidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    // Return the candidates array directly
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update one by ID
exports.updateCandidate = async (req, res) => {
    try {
      const { id } = req.params;
      // runValidators ensures enums etc. are checked
      const updated = await Candidate.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Candidate not found' });
      }
      res.json({ success: true, data: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  // Delete one by ID
exports.deleteCandidate = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Candidate.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Candidate not found' });
      }
      res.json({ success: true, message: 'Candidate deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
