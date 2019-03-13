import cache from '../database/cache';
import Planet from '../models/planets.model';
import SwapiService from '../services/swapi.service';

export default {
    async listAction(req, res) {
        const options = {
            select: {
                _id: 1,
                name: 1,
                terrain: 1,
                climate: 1
            },
            page: req.query.page || 1,
            limit: req.query.limit || 10
        };

        const query = {};
        if (req.query.name) {
            query.name = { $regex: '.*' + req.query.name + '.*' };
        }

        const paginatedPlanets = await Planet.paginate(query, options);
        for (let i = 0; i < paginatedPlanets.planets.length; i++) {
            let planet = paginatedPlanets.planets[i];
            let cachedCount = await cache.get(planet.name);
            if (!cachedCount) {
                planet.totalAppearances = await SwapiService.countPlanetFilms(planet.name);
                cache.set(planet.name, planet.totalAppearances, 'EX', 100000);
            } else {
                planet.totalAppearances = parseInt(cachedCount);
            }
            planet.imageUrl = "https://placehold.it/450x450&text=PLANET";
        }

        res.status(200).json(paginatedPlanets);
    },
    async detailAction(req, res) {
        try {
            const planet = await Planet.findById(req.params.id, {
                _id: 1,
                name: 1,
                terrain: 1,
                climate: 1
            }).lean();

            let cachedCount = await cache.get(planet.name);
            if (!cachedCount) {
                planet.totalAppearances = await SwapiService.countPlanetFilms(planet.name);
                cache.set(planet.name, planet.totalAppearances, 'EX', 100000);
            } else {
                planet.totalAppearances = parseInt(cachedCount);
            }
            planet.imageUrl = "https://placehold.it/450x450&text=PLANET";

            res.status(200).json(planet);
        } catch (error) {
            res.status(404).json({
                "message": "Planet not found"
            });
        }
    },
    async addAction(req, res) {
        let planet = new Planet({
            name: req.body.name,
            terrain: req.body.terrain,
            climate: req.body.climate
        });
        const errors = planet.validateSync();
        if (errors) {
            res.status(401).json({
                "errors": errors.errors
            });
            return;
        }
        try {
            await planet.save();
            res.status(201).json({});
        } catch (error) {
            res.status(500).json({
                "message": error
            })
        }
    },
    async deleteAction(req, res) {
        try {
            await Planet.findByIdAndRemove(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({
                "message": "Planet not found"
            });
        }
    }
}
