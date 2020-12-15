export const macroModule = {
    namespace: false,
    state(){
        return{
            newMacro: undefined,
        }
    },

    mutations:{
        setNewMacro(state, payload){
            state.newMacro = payload
        },
    },
    getters:{
        getNewMacro: state => {
            return state.newMacro;
        },
    },
    actions:{

    },

}
