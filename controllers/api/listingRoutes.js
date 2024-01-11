const router = require('express').Router();
const { Listing, User, Agent } = require('../../models');
const withAuth = require('../../utils/auth');

// find all listings
// the listing should also show the agent who listed it, how to include?
router.get('/', async (req, res) => {
    try {
        const listingData = await Listing.findAll({
            include: [
                {
                    model: Agent,
                    attributes: ['name'],
                },
            ]
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
            include: [
                {
                    model: Agent,
                    attributes: ['name'],
                },
            ]
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
            agent_id: req.session.user_id,
        });

        res.status(200).json(newListing);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a current listing
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            price,
            address,
            postal_code,
            listing_type,
            rooms,
            baths,
        } = req.body;

        // see if the agent is logged in
        if (!req.session.agent_id) {
            return res.status(401).json({ message: 'Not logged in' });
        }

        // see if the agent exists and retrieve their information
        const agent = await Agent.findByPk(req.session.agent_id);

        // see if the agent has the authority to update the listing
        const listing = await Listing.findByPk(id);
        if (!listing || listing.agent_id !== agent.id) {
            return res.status(403).json({ message: 'Not allowed to change' });
        }

        // Update the listing
        const updatedListing = await Listing.update(
            {
                price,
                address,
                postal_code,
                listing_type,
                rooms,
                baths,
            },
            {
                where: {
                    id,
                },
            }
        );

        res.status(200).json(updatedListing);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

// delete a listing
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const listingData = await Listing.destroy({
            where: {
                id: req.params.id,
                //   agent id? cuz theyre the ones who should be able to delete
                // agent id can match session's user id when they log in then ity can give them the permission to delete (also add a confirmation)
                agent_id: req.session.user_id,
            },
        });

        if (!listingData) {
            // check what it comes back with, if 0 means nothing was deleted, could infer the listing doesnt belong to the user logged in
            res.status(404).json({ message: 'No Listing found with this id!' });
            return;
        }

        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

// we would add the id of the person who is logged into the session
// in the view, when i display listings if the listing agent id does not match the users id i will not give them the optiion to delete