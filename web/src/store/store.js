import {createStore} from 'vuex'
import { villeModule } from './ville.store.js';
import { positionModule } from './positions.store.js';


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
        }
    },
    mutations : {
        setInformation: (state, payload) => state.infoCircle = payload.circleinfo,
        sendId: (state,payload) => state.idStore = payload.id,
    },
    getters:{
        getInfos: state => {
            return state.infoCircle;
        },
        getId: state => {
            return state.idStore;
        }
    }

})

