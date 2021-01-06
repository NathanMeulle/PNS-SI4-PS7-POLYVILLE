import store from "./store";

export const eventModule = {
    namespace:false,
    state() {
        return {
            position :[],
            events: [],
            currentID : 0,
        }
    },
    mutations: {
        addPosition: (state, payload) => {
            state.position[0] = payload.lat,
                state.position[1] = payload.lng,
                console.log("added : ", state.position);
        },
        /**
         * On ajoute un événement à la liste comportant l'ensemble des événements
         * Si l'utilisateur définit le commerce dans lequel à lieu l'événement, alos les coordonnées de l'evnmt sont celles du commerce
         * @param state
         * @param payload (paramètre de l'événement
         */
        addEvent: (state, payload) => {
            let lenghtList = state.events.length;
            let x = 0;
            let y = 0;
            if (payload.coordonate != undefined) {
                x = payload.coordonate[0];
                y = payload.coordonate[1];
            }
            if (payload.location != undefined) {
                store.getters.loadCommerces.forEach(commerce => {
                    if (commerce.nom === payload.location) {
                        x = commerce.position.x ;
                        y = commerce.position.y + 0.0005;
                    }
                })
            }
            state.events.push( {
                "id" : lenghtList,
                "name" : payload.name,
                "location" : payload.location,
                "description" : payload.description,
                "regle" : payload.regle,
                "logo" : payload.logo,
                "position" : {
                    "x" : x,
                    "y" : y,
                },
            })
        },
        sendEventId: (state, payload) => {
            state.currentID = payload.id;
        },
    },
    getters : {
        getPosition: (state) => {
            console.log("getter store : ", state.position);
            return state.position;
        },
        /**
         *
         * On retourne une liste d'evnmts que l'on doit effectivement afficher
         * en fonction de la règle énoncée
         *
         * @param state
         * @param getters
         * @returns Liste des événements que l'on doit afficher en fonction des règles détérminées
         */
        getListEvent : (state,getters) => {
            let n = state.events.length;
            let eventsToDisplay = [];
            state.events.forEach(event => {
                if (event.regle === "") {
                    eventsToDisplay.push(event);
                }
                if (event.regle.name === "condition affichage") {
                    if (event.regle.nbCitize <= getters.getCitizen(event.regle.zone)) {
                        eventsToDisplay.push(event);
                    }
                }
                if (event.regle.name === "condition affichage pour type de magasins") {
                    console.log('EVENTS REGLE : Je suis rentré dans la règle', event);
                    for (let i = 0; i<getters.loadCommerces.length;i++) {
                        let commerce = getters.loadCommerces[i];
                        let zoneCommerce = getters.getZoneCommerce(commerce);
                        if (    (commerce.categorie === event.regle.magasin)    ) {
                            if  ( event.regle.citoyen <= getters.getCitizen(zoneCommerce.id) ) {

                            let m = eventsToDisplay.length;
                            eventsToDisplay.push( {
                                "id" : n+m,
                                "name" : event.name,
                                "location" : "",
                                "description" : event.description,
                                "regle" : "",
                                "logo" : event.logo,
                                "position" : {
                                    "x" : commerce.position.x,
                                    "y" : commerce.position.y,
                                },
                            })
                        }
                        }
                    }

                }
                if (event.regle.name === "affichage pour type de magasins"){
                    for (let i = 0; i<getters.loadCommerces.length;i++) {

                        if (getters.loadCommerces[i].categorie === event.regle.magasin) {
                            let m = eventsToDisplay.length;
                            eventsToDisplay.push( {
                                "id" : n+m,
                                "name" : event.name,
                                "location" : "",
                                "description" : event.description,
                                "regle" : "",
                                "logo" : event.logo,
                                "position" : {
                                    "x" : getters.loadCommerces[i].position.x,
                                    "y" : getters.loadCommerces[i].position.y,
                                },
                            })
                        }
                    }
                }
            });
            return eventsToDisplay;
        },
        getEventId : (state) => {
            return state.currentID;
        },
        /**
         * Lorsqu'on clique sur un événement présent sur la carte, l'ID de celui-ci est stocké
         * dans le store. Cette méthode permet de retourner l'événement associé à cette ID
         * On l'utlise dans le Displayer
         * @param state
         * @returns On retourne l'événement dont l'ID correspond à l'evnmt qui a été cliqué
         */
        getEvent :   (state,getters) => {
            let myEvent = [];
            getters.getListEvent.forEach(event => {
                if (event.id === state.currentID) {
                    myEvent = event;
                }
            });
            return myEvent;
        },
    }
}
