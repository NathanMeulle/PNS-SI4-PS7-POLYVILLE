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
            state.events.push([lenghtList,payload.name, payload.description, payload.coordonate, payload.regle,payload.logo])
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
                if (event[0] === state.currentID) {
                    myEvent = event;
                }
            });
            return myEvent;
        },
    }
}
