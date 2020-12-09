
import { VilleMock } from "../mocks/Ville.mock.js"
export const villeModule = {
    namespace: false,
    state(){
        return{
            ville: VilleMock
        }
    },
    mutations:{

    },
    getters:{  
        loadVille: (state) => {
        return state.ville[0].ville.commerces;
        }
    },
    actions: {

    }
}