export default {
    state: {
        id: "36872469283de",
        fuel: 10,
        label: "Lorem ipsum dolor sit met, consectetur adipiscing elit."
    },
    getters: {
        asLowerCase: state => {
            return state.label.toLowerCase()
        },
        asScrambled: (state, getters) => {
            return getters.asLowerCase.split(' ').join('')
        },
        doYouHave: (state, getters) => string => {
            return getters.asScrambled.includes(string)
        },
        remainingFuel: state => {
            return state.fuel
        }
    },
    mutations: { // COMMIT
        useFuel(state, payload) {
            state.fuel -= payload.value
        }
    },
    actions: { // DISPATCH
        // Async functions -- also where GraphQL comes in
        getData({ dispatch, commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const data = Math.random()
                    resolve(commit('useFuel', { value: data }))
                }, 2000)
            })
        },
        getPromiseData({ state }) {
            return new Promise((resolve, reject) => {
                console.log('processing..', state.id)
                setTimeout(() => {
                    resolve(Math.random())
                }, 1000)
            })
        },
        chaining({ dispatch, commit }) {
            dispatch('getPromiseData')
            .then(value => {
                console.log('using fuel - before or after promise')
                commit('useFuel', { value })
            })
        }
    },
}