
import { VilleMock } from "../mocks/Ville.mock.js"
export const villeModule = {
    namespace: false,
    state(){
        return{
            Ville: VilleMock
        }
    },
    mutations:{

    },
    getters:{
        hoursTable: (state) => {
            console.log(state.Ville[0].ville)
            var table = state.ville.commerces.horaire.horraire
            
            return table;
        },
    },
    actions: {

    }
}