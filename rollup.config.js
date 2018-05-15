import Commonjs from 'rollup-plugin-commonjs'
import Resolve from 'rollup-plugin-node-resolve'
import Buble from 'rollup-plugin-buble'
import Uglify from 'rollup-plugin-uglify'
import eslint from 'rollup-plugin-eslint'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'
import html from 'rollup-plugin-html'
import json from 'rollup-plugin-json'
import { minify } from 'uglify-js'

const format = 'iife'
const input = 'js/main.js'                                  // input
const file = 'public/bundle.js'                             // target output
const name = process.env.npm_package_name.replace("-", "")  // making it namesafe for JS
const sourcemap = (process.env.NODE_ENV === 'development')

export default {
    input,
    output: { format, name, file, sourcemap },
    plugins: [        
        html({ include: 'js/templates/*.html' }),
        json({ include: 'js/*.json' }),        
        Resolve({
            jsnext: true,
            main: true
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.NODE_ENV': JSON.stringify('production')
        }),     
        alias({
            vue: 'vue/dist/vue.js', // doesnt work bah
            vuex: 'vue/dist/vuex.js'
        }),
        Buble({
            transforms: {                
                classes: true,
                arrow: true,
                modules: false,
                dangerousForOf: true                
            },
            objectAssign: 'Object.assign',
            exclude: "./node_modules",
            file: 'public/bundle.js',
            source: 'js/main.js'
        }),        
        Commonjs({
            include: 'node_modules/**',
        }),
        eslint(),
        (process.env.NODE_ENV === 'production' && Uglify({}, minify))
    ]
}
