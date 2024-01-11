const router = require('express').Router();
const { Location } = require('../../models');
const withAuth = require('../../utils/auth');

// find all locations
router.get('/', async (req, res) => {
    try {
        const locationData = await Location.findAll({
            // the listing should also show the agent who listed it, how to include?
            include: [{ model: Listing }]
        });
        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// find an individual location
router.get('/:id', async (req, res) => {
    try {
        const locationData = await Location.findByPk(req.params.id, {
            // the listing should also show the agent who listed it, how to include?
            include: [{ model: Listing }]
        });
        if (!locationData) {
            res.status(404).json({ message: 'No Location found with this ID' });
            return;
        };
        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new location
router.post('/', async (req, res) => {
    try {
        const locationData = await Location.create(req.body);
        res.status(200).json(locationData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// not sure if neccessary but will include anyways. Agents shoudl not be able to touch these because they would delete or update other listings for other listings

// dev use only i guess

// // update a location by its `id` value
// router.put('/:id', async (req, res) => {
//     await Location.update(req.body, {
//         where: {
//             id: req.params.id,
//         },
//     })
//         .then((location) => {
//             res.status(200).json(location);
//         }).catch((err) => {
//             console.log(err);
//             res.status(400).json(err);
//         })
// });
// // delete a category by its id value
// router.delete('/:id', async (req, res) => {
//     const locationData = Location.destroy({
//         where: {
//             id: req.params.id,
//         },
//     })
//         .then(locationData => res.status(200).json(locationData))
//         .catch((err) => {
//             res.status(500).json(err)
//         })
// });

module.exports = router;