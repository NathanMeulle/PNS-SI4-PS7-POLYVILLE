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
            let existe = false
            state.regles.forEach((regle)=>{
                if(regle.titre === payload.titre) {
                    existe = true
                    regle.valeur = payload.valeur
                }
            })
            if(!existe) state.regles.push(payload)
        },
    },
    getters:{
        getMacros: state => {
            return state.macro;
        },
        getRegles: state => {
            return state.regles;
        },
        getRegleHeureFermeture: state =>{
            let heure = -1
            state.regles.forEach((regle) =>{
                if(regle.titre === 'Fermeture magasins') heure = regle.valeur
            })
            return heure
        }
    },
    actions:{

    },

}
