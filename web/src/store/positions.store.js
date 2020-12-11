import { PositionMock } from "../mocks/Position.mock.js"
export const positionModule = {
    namespace: false,
    state(){
        return{
            positions: PositionMock,
        }
    },
    mutations:{

    },
    getters:{
        numberOfCitizens: (state) => {
            var nbCitizens = 0;
            state.positions[0].clients.forEach(id => {
                nbCitizens += 1;
                id;
            });
            return nbCitizens;
        },
        loadCitizens: (state) => {
                return state.positions[0].clients;
        },
        citizenZoneA: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].clients.length; i++) {
                if (state.positions[0].clients[i].position.x < 10 && state.positions[0].clients[i].position.y < 10  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },
        citizenZoneB: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].clients.length; i++) {
                if (state.positions[0].clients[i].position.x > 10 && state.positions[0].clients[i].position.y < 10  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },
        citizenZoneC: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].clients.length; i++) {
                if (state.positions[0].clients[i].position.x < 10 && state.positions[0].clients[i].position.y > 10  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },
        citizenZoneD: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].clients.length; i++) {
                if (state.positions[0].clients[i].position.x > 10 && state.positions[0].clients[i].position.y > 10  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        }
    },
    actions: {
        /*async setPersonnes(context){
            try{
                const response = await axios.get("../mocks/Position.mock.js");
                console.log('response', response);
                context.commit('setMessages', {position:response.data});
            }
            catch(error){
                console.log('error ', error);
            }
        }*/
    }
}
