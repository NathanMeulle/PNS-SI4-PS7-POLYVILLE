export const eventModule = {
    namespace:false,
    state() {
        return {
            events: [],
        }
    },
    mutations: {
        addEvent: (state,payload) => {
            state.events.push([state.events.length,payload.lat,payload.lng]);
            console.log(state.events);
        }
    },
    getters : {
        getEvents: (state) => {
            return state.events;
        },
    }
}
