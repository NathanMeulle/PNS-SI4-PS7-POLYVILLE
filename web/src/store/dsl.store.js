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
                console.log("1 : ",item)
                console.log("2 : ",payload)
                if(item[item.length-1] === payload[payload.length-1]){
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
                    if(payload.valeur!==-1) regle.valeur = payload.valeur
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
        },
        getReglePoliciers: state =>{
            let tab = []
            state.regles.forEach((regle) =>{
                if(regle.titre === 'Presence policier') tab = regle.valeur
            })
            return tab
        },
    },
    actions:{

    },

}
