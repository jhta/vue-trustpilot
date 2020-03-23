import Vue from 'vue'

import TrustpilotPlugin from 'vue-trustpilot'


/** eslint-disable */
const config = <%= JSON.stringify(options, null, 2) %>
Vue.use(TrustpilotPlugin, config)
