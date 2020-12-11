
import { VilleMock } from "../mocks/Ville.mock.js"
export const villeModule = {
    namespace: false,
    state(){
        return{
            Ville: VilleMock
        }
    },
    mutations:{
        
        setClosingHour:(state,payload) =>
        state.Ville[0].ville.commerces.forEach(commerce => {
            commerce.horaire.horaires.Lundi[1].heureFermeture = payload;
            commerce.horaire.horaires.Mardi[1].heureFermeture = payload;
            commerce.horaire.horaires.Mecredi[1].heureFermeture = payload;
            commerce.horaire.horaires.Jeudi[1].heureFermeture = payload; //marche pas 
            commerce.horaire.horaires.Vendredi[1].heureFermeture = payload; //marche pas 
            commerce.horaire.horaires.Samedi[1].heureFermeture = payload; //marche pas 
          }) 
    },
    getters:{  
        loadCommerces: (state) => {
        return state.Ville[0].ville.commerces;
        },
        loadParkings: (state) => {
            return state.Ville[0].ville.parkings;
        },
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
        async setClosingHour(context,hour){
            try{
                context.commit('setClosingHour', hour);
            }
            catch(error){
                console.log('error ', error);
            }
        }
    }
}