export const dslModule = {
    namespace: false,
    state(){
        return{
            /** Macro : liste des macros créées **/
            macro: Array(),
            /** Regles : liste des règles créées **/
            regles: Array(),
        }
    },

    mutations:{
        /** Ajoute une macro à la liste des macro et vérifie si elle existe déjà **/
        addMacro(state,payload){
            let macroDejaPresente = false;
            state.macro.forEach((item)=>{
                if(item[item.length-1] === payload[payload.length-1]){
                    macroDejaPresente = true
                }
            });
            if (!macroDejaPresente) state.macro.push(payload)
        },

        /** Ajoute une règle à la liste des règles et vérifie si elle est déjà présente **/
        addRegle(state,payload){
            let existe = false;
            state.regles.forEach((regle)=>{
                if(regle.titre === payload.titre) {
                    existe = true;
                    if(payload.valeur!==-1) regle.valeur = payload.valeur
                }
            });
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

        /** Renvoie l'heure de fermeture des magasins si une règle de ce type existe **/
        getRegleHeureFermeture: state =>{
            let heure = -1;
            state.regles.forEach((regle) =>{
                if(regle.titre.contains('Fermeture magasins')) heure = regle.valeur
            });
            return heure
        },

        /** Renvoie les données concernant une règle de déplacement de policiers **/
        getReglePoliciers: state =>{
            let tab = [];
            state.regles.forEach((regle) =>{
                if(regle.titre === 'Presence policier') tab = regle.valeur
            });
            return tab
        },
    },
    actions:{

    },

};
