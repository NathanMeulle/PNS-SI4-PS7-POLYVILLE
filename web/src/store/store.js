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
        }
    },
    mutations : {
        setInformation: (state, payload) => state.infoCircle = payload.circleinfo
    },
    getters:{
        getInfos: state => {
            return state.infoCircle;
        }
    }

})

