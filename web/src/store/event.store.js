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
        addEvent: (state, payload) => {
            let lenghtList = state.events.length;
            let x = payload.coordonate[0];
            let y = payload.coordonate[1];
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
