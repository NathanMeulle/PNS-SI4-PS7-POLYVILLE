export const dslModule = {
    namespace: false,
    state(){
        return{
            macro: Array(),
            regles: Array(),
        }
    },

    mutations:{
        addMacro(state,payload){
            let macroDejaPresente = false
            state.macro.forEach((item)=>{
                if(item[item.length] === payload[payload.length]){
                    macroDejaPresente = true
                    console.log("Macro déjà créée")
                }
            })
            if (!macroDejaPresente) state.macro.push(payload)
        },

        addRegle(state,payload){
            state.regles.push(payload)
        }
    },
    getters:{
        getMacros: state => {
            return state.macro;
        },
        getRegles: state => {
            return state.regles;
        }
    },
    actions:{

    },

}
