const ensureAuthenticated = require('../Middlewares/Auth');
const { getAllCandidates, addCandidate ,updateCandidate,deleteCandidate} = require('../Controllers/CandidateController');
const router = require('express').Router();

// Retrieve all candidates (protected)
router.get('/', ensureAuthenticated, getAllCandidates);

// Add a new candidate (protected)
router.post('/', ensureAuthenticated, addCandidate);

// Update a candidate by ID (protected)
router.put('/:id', ensureAuthenticated, updateCandidate);

// Delete a candidate by ID (protected)
router.delete('/:id', ensureAuthenticated, deleteCandidate);

module.exports = router;