import { VilleMock } from "@/mocks/Ville.mock"
import { dslModule } from "@/store/dsl.store";
import {isInSquare} from "./positions.store";

function clone(obj){
    let copy = null;
    try{
        copy = JSON.parse(JSON.stringify(obj));
    } catch(ex){
        alert("Erreur de copie");
    }
    return copy;
}

export const villeModule = {
    namespace: false,
    state() {
        return {
            /** Ville : récupération de la base de données JSON **/
            Ville: VilleMock,
            VilleCopie: clone(VilleMock),
            freq: [], // mémorise le nombre de clics sur les points d'intérêts
            dslModule: dslModule,
            once : true
        }
    },
    mutations: {
        /** Met à jour la base de données en appliquant une règle de changement d'horaires **/
        setClosingHour: (state, payload) => {
            if (state.once) {
                state.Ville[0].ville.commerces = clone(state.VilleCopie[0].ville.commerces);
                state.once = false
            }
            if(payload !== -1) {
                let a = -1;
                let b = -1;

                if (payload.args.zone === "Zone A") {
                    a = state.Ville[0].ville.zones[0].position.x;
                    b = state.Ville[0].ville.zones[0].position.y
                } else if (payload.args.zone === "Zone B") {
                    a = state.Ville[0].ville.zones[1].position.x;
                    b = state.Ville[0].ville.zones[1].position.y
                } else if (payload.args.zone === "Zone C") {
                    a = state.Ville[0].ville.zones[2].position.x;
                    b = state.Ville[0].ville.zones[2].position.y
                } else if (payload.args.zone === "Zone D") {
                    a = state.Ville[0].ville.zones[3].position.x;
                    b = state.Ville[0].ville.zones[3].position.y
                }
                state.Ville[0].ville.commerces.forEach(commerce => {
                    if (isInSquare(commerce.position.x, commerce.position.y, a, b)) {
                        for (let i = 0; i < commerce.horaires.length; i++) {
                            // eslint-disable-next-line no-unused-vars
                            for (const [key, value] of Object.entries(commerce.horaires[i].semaine)) {
                                //console.log(`${key}: ${value}`);
                                if (value[0].heureOuverture > payload.args.hour) { // si le magasin ouvre le matin après l'heure de fermeture imposée
                                    value[0].heureOuverture = 0;
                                    value[0].heureFermeture = 0;
                                } else if (value[0].heureFermeture > payload.args.hour) {// si le magasin ferme le matin après l'heure de fermeture imposée
                                    value[0].heureFermeture = payload.args.hour;
                                }
                                if (value[1].heureOuverture > payload.args.hour) { // si le magasin ouvre l'après-midi après l'heure de fermeture imposée
                                    value[1].heureOuverture = 0;
                                    value[1].heureFermeture = 0;
                                } else if (value[1].heureFermeture > payload.args.hour) {// si le magasin ferme le l'après-midi après l'heure de fermeture imposée
                                    value[1].heureFermeture = payload.args.hour;
                                }
                            }
                        }
                    }
                })
            }
        },
         /** Incrémente le nombre de clic sur un point d'intérêt **/
        addfreq: (state,payload) => {
            let isInit = false;
            state.freq.forEach(map => {
                if (map[0]===payload.id){
                    map[1] += 1;
                    isInit=true;
                }
            });
            if (!isInit){
                state.freq.push([payload.id,1])
            }
        },

    },
    getters: {
        loadCommerces: (state) => {
            return state.Ville[0].ville.commerces;
        },
        loadParkings: (state) => {
            return state.Ville[0].ville.parkings;
        },
         /** Renvoie le nombre de semaines par point d'intérêt entrées dans la base de données **/
        getWeeksNumber: (state) =>{
            return state.Ville[0].ville.commerces[0].horaires.length;
        },
         /** Renvoie les horaires correspondant à l'id en paramètre **/
        hoursTable: (state) => (id) => {
            var horaires = null;
            state.Ville[0].ville.commerces.forEach(commerce => {
                if(commerce.id === id){
                    horaires = commerce.horaires;
                    return horaires;
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
         /** Renvoie le nombre de clic sur un point d'intérêt selon l'id donnée en paramètre **/
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
        },
        getZones : (state) => {
            return state.Ville[0].ville.zones;
        },
         /** Renvoie la position d'une zone selon l'id donné en paramètre **/
        getPositionZone : (state) => (id) =>{
            let pos = [];
            state.Ville[0].ville.zones.forEach( zone => {
                if (zone.id === id) {
                    pos.push(zone.position.x);
                    pos.push(zone.position.y);
                    console.log('POSITION ZONE', zone.id, ' ', pos);
                    return pos;
                }
            })
        },

         /** Renvoie le nom d'un commerce selon l'id donné en paramètre **/
        getNomCommerce : (state) => (id) => {
            let nom = [];
            state.Ville[0].ville.commerces.forEach( commerce => {
                if (commerce.id === id) {
                    nom.push(commerce.commercant.nom);
                    nom.push(commerce.commercant.prenom);
                    nom.push(commerce.nom);
                    console.log('NOM COMMERCANT',nom )
                }
            });
            return nom;
        },
         /** Renvoie le type d'un commerce selon l'id donné en paramètre **/
        getTypeCommerce :   (state) => (id) => {
             let type = "";
             state.Ville[0].ville.commerces.forEach(commerce => {
                if (commerce.id === id) {
                    type = commerce.categorie;
                    console.log('TYPE COMMERCANT', type)
                 }
            });
            return type;
        },
         /** Renvoie l'adresse d'un commerce selon l'id donné en paramètre **/
        getAdressCommerce : (state) => (id) => {
            let adress = "";
            state.Ville[0].ville.commerces.forEach(commerce => {
                if (commerce.id === id) {
                    adress = commerce.adresse;
                }
            });
            return adress;
        }
    },
    actions: {
         /** Lance la mutation appliquant le couvre-feu
          * + Lance la mutation qui ajoute une règle
         * @param hour : l'heure à imposer aux points d'intérêts
          * @param zone : zone d'application
         */
        async setClosingHour(context, args) {
            try {
                context.commit('setClosingHour', {args : args});
                context.commit('addRegle', {titre : 'Fermeture magasins '+args.zone, valeur : args.hour, checked : true})
            }
            catch (error) {
                console.log('error ', error);
            }
        }
    }
};
