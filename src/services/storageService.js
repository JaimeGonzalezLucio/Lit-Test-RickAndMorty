const localStorageKey = 'ArrayCharacters'

export class storageService {

    constructor(){

        this.favoriteCharacters = JSON.parse(localStorage.getItem(localStorageKey)) ?? []

    }

    getFavoriteCharacters(){        
        return this.favoriteCharacters
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
        }
    }
}
