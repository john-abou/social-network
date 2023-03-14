const router = require('express').Router();
const {
    allThoughts,
    newThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought');

// /api/thoughts
router.route('/').get(allThoughts).post(newThought)

// /api/thoughts/:thoughtId
router.route('/').get(getThoughtById).post(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/').post(addReaction).delete(deleteReaction);

module.exports = router;