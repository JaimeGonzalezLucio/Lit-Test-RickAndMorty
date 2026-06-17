
import { assert } from '../helpers/assertions.js';
import { buildFilter } from '../../src/services/filterService.js';

describe('buildFilter', () => {
    it('returns an empty string when there are no valid params', () => {
        assert.equal(buildFilter({
            name: '',
            status: null,
            species: undefined
        }), '');
    });

    it('builds a query string with only valid params', () => {
        assert.equal(buildFilter({
            name: 'rick',
            status: 'Alive',
            species: '',
            gender: undefined
        }), '?name=rick&status=Alive');
    });
});