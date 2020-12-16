import {createStore} from 'vuex'
import { villeModule } from './ville.store.js';
import { positionModule } from './positions.store.js';

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

export default createStore({
    namespace: false,
    modules: {
        villeModule: villeModule,
        positionsModule: positionModule,
    },
    state() {
        return {
            infoCircle : "",
            idStore : 0,
            checkedOptions: []
        }
    },
    mutations : {
        setInformation: (state, payload) => state.infoCircle = payload.circleinfo,
        sendId: (state,payload) => state.idStore = payload.id,
        setCheckbox(state, payload) {
            if (!state.checkedOptions.includes(payload.CheckedBox)) {
                state.checkedOptions.push(payload.CheckedBox);
            } else {
                state.checkedOptions.splice(state.checkedOptions.indexOf(payload.CheckedBox), 1);
            }
        },


        deplacerPoliciers(state, payload) {
            console.log(payload.nbZone)
            console.log("policiers :",payload.nbPoliciers)
            let agir = false
            if(payload.args.cond === "sup") agir = (payload.args.citoyens <= payload.nbZone)
            else if(payload.args.cond === "inf") agir = (payload.args.citoyens >= payload.nbZone)
            if(agir){
                let i = 0
                i += payload.nbPoliciers
                let j = 0
                let a = -1
                let b = -1
                if(payload.args.zone2 === "Zone A"){
                    a = this.state.villeModule.Ville[0].ville.zones[0].position.x
                    b = this.state.villeModule.Ville[0].ville.zones[0].position.y
                }
                if(payload.args.zone2 === "Zone B"){
                    a = this.state.villeModule.Ville[0].ville.zones[1].position.x
                    b = this.state.villeModule.Ville[0].ville.zones[1].position.y
                }
                let policiers = this.state.positionsModule.positions[0].policiers
                while(i<payload.args.policiers){
                    if (!isInSquare(policiers[j].position.x,policiers[j].position.y,a,b)){
                        policiers[j].position.x = a
                        policiers[j].position.y = b
                        i++
                    }
                    j++
                }
            }
        }
    },
    getters:{
        getInfos: state => {
            return state.infoCircle;
        },
        getId: state => {
            return state.idStore;
        },
        getCheckBox: state => {
            return state.checkedOptions;
        }
    },
    actions:{
        async deplacerPoliciers(context,args){
            console.log(args)
            let nbZone = 0
            let nbPoliciers = 0
            nbZone = context.getters.getCitizen(args.zone1)
            nbPoliciers = context.getters.getPoliciers(args.zone2)
            try{
                context.commit('deplacerPoliciers',{args : args, nbZone: nbZone, nbPoliciers: nbPoliciers});
            }
            catch(error){
                console.log('error ', error);
            }
        },
    }

})

