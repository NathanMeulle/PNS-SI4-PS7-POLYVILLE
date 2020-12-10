
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
        hoursTable: (state) => (id) => {
            
            var horaires = null;
            state.Ville[0].ville.commerces.forEach(commerce => {
                if(commerce.id === id){
                    horaires = commerce.horaire.horaires;
                    return horaires;
                } 
              });

              state.Ville[0].ville.parkings.forEach(parking => {
                if(parking.id === id){
                    horaires = parking.horaire.horaires;
                    return horaires;
                } 
              });
            
            
            return horaires;
        },
    },
    actions: {

    }
}