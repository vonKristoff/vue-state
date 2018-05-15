export default {
    data() {
        return {
            fuel: 100,
            speed: 0,
            temperature: 12,
            pipeline: 0
        }
    },
    created() {
        let vm = this
        let pipe = piper.call(this)
        let temp = setInterval(() => {            
            this.fuel = this.fuel - 1
            this.$emit('update', pipe('fuel'))
        }, 3000)
        setTimeout(() => {
            this.$emit('update', pipe('speed'))
        }, 5000)
        
    },
    computed: {
        fuelIsLow() {
            return (this.fuel < 90)
        }
    }
}
function piper() {
    return (name) => {
        return { type: name, value: this[name] }
    }
}