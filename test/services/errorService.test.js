import { assert } from '../helpers/assertions.js';
import { ErrorManagement } from '../../src/services/errorService.js';

describe('ErrorManagement', () => {
    it('returns the 404 error message', () => {
        assert.equal(ErrorManagement(404), 'Sin registros');
    });

    it('returns the 429 error message', () => {
        assert.equal(
            ErrorManagement(429),
            'Demasiadas solicitudes, intente mas tarde'
        );
    });

    it('returns the 500 error message', () => {
        assert.equal(ErrorManagement(500), 'Error en la server');
    });

    it('returns the default message', () => {
        assert.equal(
            ErrorManagement(418),
            'Error al procesar la solicitud'
        );
    });
});