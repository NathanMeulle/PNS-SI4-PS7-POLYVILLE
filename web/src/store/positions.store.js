import { PositionMock } from "@/mocks/Position.mock"

function isInSquare(x,y,a,b){

    let bottomLeftX = (a-0.010);
    let bottomLeftY = (b-0.010);
    let topRightX = (a+0.010);
    let topRightY = (b+0.010);

    let inX = false;
    let inY = false;
    if (x > bottomLeftX && x <  topRightX )
        inX = true;

    if (y > bottomLeftY  && y < topRightY)
        inY = true;

    return (inX && inY);
}

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
        /**
         * Retourne le nombre de citoyen présent dans une zone
         * @param Zone
         * @returns nbCitizens
         */

        getCitizen: (state, getters) => (myZone) => {
        let nbCitizen = 0;
          getters.getZones.forEach(zone => {
              if (zone.id === myZone) {
                  for (let i=0;i<state.positions[0].clients.length;i++) {
                      if (isInSquare(state.positions[0].clients[i].position.x,state.positions[0].clients[i].position.y,zone.position.x,zone.position.y)){
                          nbCitizen++;
                      }
                  }
              }
          })
            console.log('NBR CITIZEN: ', nbCitizen, ' ', myZone);
        return nbCitizen;
        },
        getPoliciers: (state, getters) => (myZone) => {
            let nbCitizen = 0;
            getters.getZones.forEach(zone => {
                if (zone.id === myZone) {
                    console.log('ZONE', zone.id);
                    for (let i=0;i<state.positions[0].policiers.length;i++) {
                        if (isInSquare(state.positions[0].policiers[i].position.x,state.positions[0].policiers[i].position.y,zone.position.x,zone.position.y)){
                            nbCitizen++;
                        }
                    }
                }
            })
            return nbCitizen;
        },

        citizenZoneA: (state) => {
            var nbCitizens = 0;
            for (var i=0 ; i < state.positions[0].clients.length; i++) {
                if (state.positions[0].clients[i].position.x > 43.6154 && state.positions[0].clients[i].position.y > 7.0669  ){
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
                if (state.positions[0].clients[i].position.x < 43.6154 && state.positions[0].clients[i].position.y < 7.0669  ){
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
        },
    }
}
