import Vue from 'vue/dist/vue'
import State from './state'
import App from './app'

// window.$vx = {
//     engine: new Vue(State),
//     tank: new Vue(State)
// }
window.app = new Vue(App)