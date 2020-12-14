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
            let agir = false
            if(payload.args.cond === "sup") agir = (payload.args.citoyens <= payload.nbZone)
            if(agir){
                for(var i = 0; i<payload.args.policiers;i++){
                    state.positions[0].policiers[i].position.x = 43.6204
                    state.positions[0].policiers[i].position.y = 7.0789
                    console.log(state.positions[0].policiers[i])
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
            if(args.zone1 === "Zone A") nbZone = context.getters.citizenZoneA
            if(args.zone1 === "Zone B") nbZone = context.getters.citizenZoneB
            try{
                context.commit('deplacerPoliciers',{args : args, nbZone: nbZone});
            }
            catch(error){
                console.log('error ', error);
            }
        }
    }
}
