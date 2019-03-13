import axios from 'axios';
import _ from 'lodash';

class SwapiService {
    constructor() {
        this.httpClient = axios.create({
            baseURL: 'https://swapi.co/api/',
            headers: {
                'User-Agent': 'swapi-node',
                'SWAPI-Node-Version': require('../package.json').version
            }
        });
    }

    async countPlanetFilms(planetName) {
        const response = await this.httpClient.get('/planets', {
            "name": planetName
        });

        if (response.data.count === 0) {
            return 0;
        }

        const planet = _.find(response.data.results, ["name", planetName]);

        if (!planet) {
            return 0;
        }

        return planet.films.length;
    }
}

const swapiService = new SwapiService();

export default swapiService;
