
import { VilleMock } from "../mocks/Ville.mock.js"

export const villeModule = {
    namespace: false,
    state() {
        return {
            Ville: VilleMock,
            freq: [],
        }
    },
    mutations: {

        setClosingHour: (state, payload) => {
            state.Ville[0].ville.commerces.forEach(commerce => {

                for (const [key, value] of Object.entries(commerce.horaires[0])) {
                    //console.log(`${key}: ${value}`);
                    key;
                    if (value[0].heureOuverture > payload) { // si le magasin ouvre le matin après l'heure de fermeture imposée
                        value[0].heureOuverture = 0;
                        value[0].heureFermeture = 0;
                    }
                    else if (value[0].heureFermeture > payload) {// si le magasin ferme le matin après l'heure de fermeture imposée
                        value[0].heureFermeture = payload;
                    }
                    if (value[1].heureOuverture > payload) { // si le magasin ouvre l'après-midi après l'heure de fermeture imposée
                        value[1].heureOuverture = 0;
                        value[1].heureFermeture = 0;
                    }
                    else if (value[1].heureFermeture > payload){// si le magasin ferme le l'après-midi après l'heure de fermeture imposée
                        value[1].heureFermeture = payload;
                    }
                }
            })
        },
        addfreq: (state,payload) => {
            let isInit = false;
            state.freq.forEach(map => {
                if (map[0]===payload.id){
                    map[1] += 1;
                    isInit=true;
                }
            })
            if (!isInit){
                state.freq.push([payload.id,1])
            }
        }
    },
    getters: {
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
                    horaires = commerce.horaires[0].semaine;
                    return horaires;
                }
                else {
                    return "{heureOuverture: 7, heureFermeture: 8}";
                }
            });

              state.Ville[0].ville.parkings.forEach(parking => {
                if(parking.id === id){
                    horaires = parking.horaires[0].semaine;
                    return horaires;
                }
            });


            return horaires;
        },
        getfreq: (state) => (id) => {
            state.freq.forEach(map => {
                var freq = 0;
                if (map[0]===id) {
                    freq = map[1];
                    return freq;
                }
                return freq;
            })
        },
        getfreqTab: (state) => {
            return state.freq;
        }
    },
    actions: {
        async setClosingHour(context, hour) {
            try {
                context.commit('setClosingHour', hour);
            }
            catch (error) {
                console.log('error ', error);
            }
        }
    }
}
