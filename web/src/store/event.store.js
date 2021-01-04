export const eventModule = {
    namespace:false,
    state() {
        return {
            position :[],
            events: [],
        }
    },
    mutations: {
        addPosition: (state,payload) => {
            state.position[0] = payload.lat,
            state.position[1] = payload.lng,
            console.log("added : ", state.position);
        },
        addEvent : (state,payload) => {
            state.events.push([payload.name, payload.description, payload.coordonate,payload.regle])
            console.log(state.events);
        },
    },
    getters : {
        getPosition: (state) => {
            console.log("getter store : ", state.position);
            return state.position;
        },
        getEvents : (state) => {
            return state.events;
        }
    }
}
