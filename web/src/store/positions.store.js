import { PositionMock } from "../mocks/Position.mock"


/**
 *
 * Test if a point is on a square of center (a,b)
 *
 * @param x -> coordinate x of the citizen / policeman
 * @param y ->  coordinate y of the citizen / policeman
 * @param a -> coordinate x of the center of the zone
 * @param b -> coordinate y of the center of the zone
 * @returns boolean
 */


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
            // eslint-disable-next-line no-unused-vars
            state.positions[0].clients.forEach(id => {
                nbCitizens += 1;
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


    },
    actions: {
    }
}
