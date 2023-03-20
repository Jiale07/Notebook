// import Vue from 'vue'
// import app from './App.vue'


const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg/public', false, /\.svg$/)
requireAll(req)
