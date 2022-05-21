import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [], // va a mostrar todo
    charactersFilter: [] //va a mostrar lo que queremos, para no tener que hacer otra peticion a la API
  },
  getters: {
  },
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload
    },
    setCharactersFilter(state, payload){
      state.charactersFilter = payload
    },
  },
  actions: {
    async getCharacters({commit}) {
      try {
        const response = await fetch ('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        commit('setCharacters', data.results)
        commit('setCharactersFilter', data.results)

      } catch (error) {
        console.error(error);
      }
    },
    filterByStatus ({commit, state}, status){ // el state y aquí va a recibir el estatus que le vamos a mandar nosotros desde nuestro componente.
      const results = state.characters.filter ((character) => { //Aquí va a recibir un charácter, es decir, que vamos a recorrer todos los personajes de este array,
      return character.status.includes(status) //Esto quiere decir que va a retornar todos los personajes que tengan el estatus que nosotros le indiquemos
      }) 
      commit('setCharactersFilter', results)
    },
    filterByName ({commit, state}, name) {
      const formatName = name.toLowerCase()
      const results = state.characters.filter((character) => {  //Este results tenemos que almacenarlo en las mutations de setCharacterFilter. Para eso vamos a utilizar el commit.
        const characterName = character.name.toLowerCase()

        if(characterName.includes(formatName)) {
          return character

        }
      })
      commit('setCharactersFilter', results) //Para eso vamos a utilizar el commit. Vamos a crear un componente nuevo
    }
  },
  modules: {
  }
})
