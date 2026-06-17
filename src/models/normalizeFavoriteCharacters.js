export function normalizeFavoriteCharacters(characters = [], arrayIds = []){
    const favoriteIds = new Set(arrayIds)

    return characters.map(character => ({
        ...character,
        favorite: favoriteIds.has(character.id)
    }))
}
