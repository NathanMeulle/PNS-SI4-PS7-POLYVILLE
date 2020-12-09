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