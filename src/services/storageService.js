const localStorageKey = 'ArrayCharacters'

export const favorites_changed_event = 'favorites-changed'
export class storageService extends EventTarget{

    constructor(){
        super();
        this.favoriteCharacters = JSON.parse(localStorage.getItem(localStorageKey)) ?? []

    }

    emitFavoritesChanged() {
        this.dispatchEvent(new CustomEvent(favorites_changed_event, {
            detail: {
                count: this.favoriteCharacters.length,
                favoriteIds: this.getFavoriteCharactersIds(),
                favoriteCharacters: this.favoriteCharacters
            }
        }))
    }

    getFavoriteCharacters(){        
        return this.favoriteCharacters
    }

    getFavoriteCharactersCount(){        
        return this.favoriteCharacters.length
    }

    isCharacterExist(characterId){                
        return this.favoriteCharacters.some(item => item.id === characterId)        
    }

    saveCharacter(character) {        
        if (!this.isCharacterExist(character.id)) {
            const arrayCharacters = [
                ...this.favoriteCharacters,
                character
            ]
            this.favoriteCharacters = arrayCharacters
            localStorage.setItem(localStorageKey, JSON.stringify(this.favoriteCharacters))                                
            this.emitFavoritesChanged() 
        }
    }

    getFavoriteCharactersIds() {                        
        let arrayIds = this.favoriteCharacters.map(item=>{
            return item.id
        })
        return arrayIds        
    }
    
    deleteFavoriteCharacter(characterId) {
        if (this.isCharacterExist(characterId)) {                          
            const characters = this.favoriteCharacters.filter(item => item.id !== characterId)
            this.favoriteCharacters = characters
            localStorage.setItem(localStorageKey, JSON.stringify(this.favoriteCharacters))            
            this.emitFavoritesChanged()
        }
    }

    toggleFavoriteCharacter(character) {
        if (this.isCharacterExist(character.id)) {
            this.deleteFavoriteCharacter(character.id)
        } else {
            this.saveCharacter(character)
        }
    }


}

export const storage = new storageService()