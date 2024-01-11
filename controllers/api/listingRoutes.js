const router = require('express').Router();
const { Listing, Location, Agent } = require('../../models');
const withAuth = require('../../utils/auth');

// find all listings
// the listing should also show the agent who listed it, how to include?
router.get('/', async (req, res) => {
    try {
        const listingData = await Listing.findAll({
            include: [{ model: { Location }, }]
        });
        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// find an individua llisting
router.get('/:id', async (req, res) => {
    try {
        const listingData = await Listing.findByPk(req.params.id, {
            include: [{ model: { Location }, }]
        });
        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// create a new listing
router.post('/', withAuth, async (req, res) => {
    try {
        const newListing = await Listing.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newListing);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a current listing
router.put('/:id', async (req, res) => {
    try {
        const updatedListing = await Listing.update(req.body, {
            where: {
                id: req.params.id
            },
        });

        res.status(200).json(updatedListing);
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete a listing
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const listingData = await Listing.destroy({
            where: {
                id: req.params.id,
                //   agent id? cuz theyre the ones who should be able to delete
                user_id: req.session.user_id,
            },
        });

        if (!listingData) {
            res.status(404).json({ message: 'No Listing found with this id!' });
            return;
        }

        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;