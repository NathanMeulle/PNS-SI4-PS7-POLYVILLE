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
                        x = commerce.position.x;
                        y = commerce.position.y;
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
            /*
            state.events.push([lenghtList,payload.name, payload.description, payload.coordonate, payload.regle,payload.logo])
            */
            console.log(state.events);
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
        getListEvent : (state) => {
            return state.events;
        },
        getEventId : (state) => {
            return state.currentID;
        },
        getEvent :   (state) => {
            let myEvent = [];
            state.events.forEach(event => {
                if (event.id === state.currentID) {
                    myEvent = event;
                }
            });
            return myEvent;
        },
    }
}
