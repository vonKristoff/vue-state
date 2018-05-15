import {store} from './vx'
import template from './templates/app.html'
import vuex from 'vuex/dist/vuex'

import project from './store/project'
// import Pipeline from './reactive'
// console.log(vuex.mapGetters)
export default {
    el: "#root",    
    data: {
       fuel: 0,
       pipeline: 0
    },
    store,
    template,
    created() {
        let vm = this
        // $vx.engine.$on("update", stateAction.bind(this))
        // new Pipeline([10])
        // .pipe(array => array.map(val => Math.sin(val)))
        // .pipe(array => array.pop())
        // .subscribe(result => {
        //     console.log(result)
        //     vm.pipeline = result
        // })
        console.log(this.$store.getters.doYouHave('lorem'))
        setTimeout(() => {
            this.useFuel({ value: 1 })
            this.chaining()
        }, 1500)
        this.getData().then(() => {
            console.log('async using actions')
        })
    },
    computed: {
        fuelLevel() {
            return 0
            // return ($vx.engine.fuelIsLow) ? "Reufeul baby" : "feeling fatty"
        },
        ...vuex.mapGetters(Object.keys(project.getters))
    },
    methods: {
        // use for toggles etc
        ...vuex.mapMutations(Object.keys(project.mutations)),
        // use for async operations
        ...vuex.mapActions(Object.keys(project.actions))
    }
}
function stateAction(action) {
    if(this.hasOwnProperty(action.type)) this[action.type] = action.value
    else console.log("prop doesnt exist")
}