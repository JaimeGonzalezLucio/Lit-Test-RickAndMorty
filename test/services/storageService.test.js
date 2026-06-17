import { assert } from '../helpers/assertions.js';
import { favorites_changed_event, storageService } from '../../src/services/storageService.js';

const localStorageKey = 'ArrayCharacters';
const character = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'rick.png'
};

describe('storageService', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('return empty array, count and empy array if localStorage is empty', () => {
        const service = new storageService();

        assert.deepEqual(service.getFavoriteCharacters(), []);
        assert.equal(service.getFavoriteCharactersCount(), 0);
        assert.deepEqual(service.getFavoriteCharactersIds(), []);
    });

    it('load favorites from localStorage', () => {
        localStorage.setItem(localStorageKey, JSON.stringify([character]));

        const service = new storageService();

        assert.deepEqual(service.getFavoriteCharacters(), [character]);
        assert.equal(service.getFavoriteCharactersCount(), 1);
        assert.isTrue(service.isCharacterExist(character.id));
    });

    it('saves a favorite character', () => {
        const service = new storageService();
        let emittedDetail = null;

        service.addEventListener(favorites_changed_event, (event) => {
            emittedDetail = event.detail;
        });

        service.saveCharacter(character);

        assert.deepEqual(service.getFavoriteCharacters(), [character]);
        assert.deepEqual(JSON.parse(localStorage.getItem(localStorageKey)), [character]);
        assert.deepEqual(emittedDetail, {
            count: 1,
            favoriteIds: [character.id],
            favoriteCharacters: [character]
        });
    });

    it('deletes a favorite character', () => {
        const service = new storageService();
        service.saveCharacter(character);
        let emittedDetail = null;

        service.addEventListener(favorites_changed_event, (event) => {
            emittedDetail = event.detail;
        });

        service.deleteFavoriteCharacter(character.id);

        assert.deepEqual(service.getFavoriteCharacters(), []);
        assert.deepEqual(JSON.parse(localStorage.getItem(localStorageKey)), []);
        assert.deepEqual(emittedDetail, {
            count: 0,
            favoriteIds: [],
            favoriteCharacters: []
        });
    });

});
