import { PositionMock } from "@/mocks/Position.mock"
export const positionModule = {
    namespace: false,
    state(){
        return{
            positions: PositionMock,
        }
    },
    mutations:{

        deplacerPoliciers(state, payload) {
            console.log(payload.nbZone)
            console.log("policiers :",payload.nbPoliciers)
            console.log(payload.args.policiers)
            let agir = false
            if(payload.args.cond === "sup") agir = (payload.args.citoyens <= payload.nbZone)
            if(agir){
                let i = 0
                i += payload.nbPoliciers;
                let j = 0
                while(i<payload.args.policiers){
                    console.log(i)
                    if (!(state.positions[0].policiers[j].position.x > 43.6154 && state.positions[0].policiers[j].position.y > 7.0669)){
                        console.log("oui")
                        state.positions[0].policiers[j].position.x = 43.6204
                        state.positions[0].policiers[j].position.y = 7.0789
                        i++
                    }
                    j++
                }
            }
        }

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
                if (state.positions[0].clients[i].position.x < 43.6154 && state.positions[0].clients[i].position.y < 7.0669  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },
        citizenZoneB: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].clients.length; i++) {
                if (state.positions[0].clients[i].position.x > 43.6154 && state.positions[0].clients[i].position.y < 7.0669  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },
        citizenZoneC: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].clients.length; i++) {
                if (state.positions[0].clients[i].position.x < 43.6154 && state.positions[0].clients[i].position.y > 7.0669  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },
        citizenZoneD: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].clients.length; i++) {
                if (state.positions[0].clients[i].position.x > 43.6154 && state.positions[0].clients[i].position.y > 7.0669  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },

        policierZoneA: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].policiers.length; i++) {
                if (state.positions[0].policiers[i].position.x > 43.6154 && state.positions[0].policiers[i].position.y > 7.0669  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },
        policierZoneB: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].policiers.length; i++) {
                if (state.positions[0].policiers[i].position.x > 43.6154 && state.positions[0].policiers[i].position.y < 7.0669  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },
        policierZoneC: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].policiers.length; i++) {
                if (state.positions[0].policiers[i].position.x < 43.6154 && state.positions[0].policiers[i].position.y > 7.0669  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },
        policierZoneD: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].policiers.length; i++) {
                if (state.positions[0].policiers[i].position.x < 43.6154 && state.positions[0].policiers[i].position.y < 7.0669  ){
                    nbCitizens++;
                }
            }
            return nbCitizens;
        },


    },
    actions: {
        async deplacerPoliciers(context,args){
            console.log(args)
            let nbZone = 0
            let nbPoliciers = 0
            if(args.zone1 === "Zone A") {
                nbZone = context.getters.citizenZoneA
                nbPoliciers = context.getters.policierZoneA
            }
            if(args.zone1 === "Zone B") nbZone = context.getters.citizenZoneB
            try{
                context.commit('deplacerPoliciers',{args : args, nbZone: nbZone, nbPoliciers: nbPoliciers});
            }
            catch(error){
                console.log('error ', error);
            }
        }
    }
}
