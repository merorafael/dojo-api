import mongoose from 'mongoose';

const PlanetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    terrain: {
        type: String,
        required: true
    },
    climate: {
        type: String,
        required: true
    }
}, {collection : 'Planet'});

let PlanetsModel = mongoose.model('Planet', PlanetSchema);

PlanetsModel.paginate = async (query, options) => {
    query   = query || {};
    const select = options.select;
    const limit = parseInt(options.limit) || 10;

    let skip, page;
    page = parseInt(options.page);
    skip = (page - 1) * limit;

    const totalPlanets = await PlanetsModel.countDocuments(query).exec();
    const planets = await PlanetsModel.find(query)
        .select(select)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();

    return {
        planets: planets,
        page: page,
        limit: limit,
        total: totalPlanets,
        pages: Math.ceil(totalPlanets / limit) || 1
    };
};

PlanetsModel.addPlanet = (planet) => {
    return planet.save();
};

export default PlanetsModel;
