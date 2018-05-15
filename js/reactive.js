import Vue from 'vue/dist/vue'

export default class {
    constructor(source) {
        this._source = source
        this._tracker = null
        this._transformers = []
        this._subscribeHandler = function () {}
    }
    pipe(transformer) {
        this._transformers.push(transformer)
        return this
    }
    subscribe(next) {
        this._subscribeHandler = next
        this.setup()
        return this
    }
    setup() {
        const source = this._source
        const transformers = this._transformers
        const subscribeHandler = this._subscribeHandler
        const computed = {}

        transformers.forEach((transformer, index) => {
            computed[`transformer$${index}`] = function () {
                return transformer(index === 0 ? this.source : this[`transformer$${index - 1}`])
            }
        })

        computed['output'] = function() {
            return this[`transformer$${transformers.length - 1}`]
        }
        const PipelineComponent = Vue.extend({
            data() {
                return {
                    source: this._source
                }
            },
            computed,
            watch: {
                source() {
                    subscribeHandler(this.output)
                }
            }
        })
        this._tracker = new PipelineComponent()
        return this
    }
}