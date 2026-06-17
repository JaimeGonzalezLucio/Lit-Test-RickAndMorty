export function normalizeCharacters(characters = []) {
    return characters.map((character) => ({
        ...character,
        image: character?.image || 'https://img.icons8.com/ios7/1200/user-not-found.jpg',
        name: character?.name || 'Sin nombre',
        status: character?.status || 'Sin estatus',
        species: character?.species || 'Desconocida',
        gender: character?.gender || 'Desconocido',
        origin: {
            ...character?.origin,
            name: character?.origin?.name || 'Desconocido'
        }
    }))
}
