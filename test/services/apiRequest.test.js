import { assert } from '../helpers/assertions.js';
import { getData } from '../../src/services/apiRequest.js';

describe('getData', () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = globalThis.fetch;
    });

    afterEach(() => {
        globalThis.fetch = originalFetch;
    });

    it('fetch, builds filters and normalizes the response', async () => {
        let requestedUrl = '';
        let requestedSignal = null;

        globalThis.fetch = async (url, options) => {
            requestedUrl = url;
            requestedSignal = options.signal;

            return {
                ok: true,
                json: async () => ({
                    info: {
                        count: 107,
                        pages: 6,
                        next: 'https://rickandmortyapi.com/api/character?page=3&name=rick',
                        prev: 'https://rickandmortyapi.com/api/character?page=1&name=rick'
                    },
                    results: [
                        {
                            id: 1,
                            image: 'rick.png',
                            name: 'Rick Sanchez',
                            status: 'Alive',
                            species: 'Human',
                            gender: 'Male',
                            origin: { name: 'Earth' }
                        }
                    ]
                })
            };
        };

        const controller = new AbortController();
        const response = await getData({
            name: 'rick',
            status: 'Alive',
            page: 2
        }, controller.signal);

        assert.equal(requestedUrl, 'https://rickandmortyapi.com/api/character?name=rick&status=Alive&page=2');
        assert.equal(requestedSignal, controller.signal);
        assert.equal(response.message, '');
        assert.deepEqual(response.info, {
            count: 107,
            pages: 6,
            next: 'https://rickandmortyapi.com/api/character?page=3&name=rick',
            prev: 'https://rickandmortyapi.com/api/character?page=1&name=rick',
            currentPage: 2
        });
        assert.equal(response.data[0].name, 'Rick Sanchez');
        assert.equal(response.data[0].status, 'Alive');
        assert.equal(response.data[0].origin.name, 'Earth');
    });

    it('returns an empty payload and a mapped message for failed responses', async () => {
        globalThis.fetch = async () => ({
            ok: false,
            status: 404
        });

        const response = await getData({ page: 3 });

        assert.deepEqual(response, {
            data: [],
            info: {
                count: 0,
                pages: 0,
                next: null,
                prev: null,
                currentPage: 3
            },
            message: 'Sin registros'
        });
    });

});

    