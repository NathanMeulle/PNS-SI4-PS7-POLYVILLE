import { PositionMock } from "@/mocks/Position.mock"
export function isInSquare(x, y, a, b){
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
    }
}
