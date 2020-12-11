
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
            console.log(commerce.horaires)
            console.log(commerce.horaires.length);
            /*for (var i = 0; i <commerce.horaire.horaires.lenght; i++){
                
                console.log(commerce.horaire.horaires[i]);
                
            }*/
            payload;
            /*commerce.horaire.horaires.forEach(jour => {
                console.log(jour)
                if (jour[1].heureFermeture > payload){ // si le magasin ferme après l'heure de fermeture imposée
                   jour[1].heureFermeture = payload;
                }
            })*/
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
                    horaires = commerce.horaires;
                    return horaires;
                }
                else {
                    return "{heureOuverture: 7, heureFermeture: 8}";
                }

              });

              state.Ville[0].ville.parkings.forEach(parking => {
                if(parking.id === id){
                    horaires = parking.horaires;
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
