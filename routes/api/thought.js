const router = require('express').Router();
const {
    allThoughts,
    newThought,
    singleThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thought');

// /api/thoughts
router.route('/').get(allThoughts).post(newThought)

// /api/thoughts/:thoughtId
router.route('/').get(singleThought).post(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/').post(newReaction).delete(deleteReaction);

module.exports = router;