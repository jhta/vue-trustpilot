import { isEmpty, forEach, get } from 'lodash'

import TrustpilotWidget from './widget.vue'

// implementation to prevent unnecessary logs in production
const logger = (msg) => {
  // `get` is necessary as fallback for non ssr access.
  const env = get(process, 'env.NODE_ENV')
  if (env === 'prod' || env == 'production') {
    return;
  }

  console.info(msg)
}

export default {
  /**
   * @param {Object} Vue Vue instance
   * @param {Object} options.widgets Map of widgets with Trustpilot configuration
   */
  install(Vue, options = {}) {

    // widgets are required for run it
    if (isEmpty(options) || isEmpty(options.widgets)) {
      logger("'vue-trustpilot': Trustpilot widgets haven't been found")
      return;
    }

    const { widgets } = options

    // `templateId` and `businessunitId` are required but those could be set as html attributes too.
    forEach(widgets, (value, key) => {
      if (!value.hasOwnProperty('templateId')) {
        logger(`'vue-trustpilot': ${key} widget doesn't have 'templateId' attribute`)
      }

      if (!value.hasOwnProperty('businessunitId')) {
        logger(`'vue-trustpilot': ${key} widget doesn't have 'bussinessunitId' attribute`)
      }
    })

    // method for access to the widgets information based on the widget identifier
    Vue.prototype.$trustpilot = (identifier = '') => widgets[identifier] || null

    // Available widget list
    Vue.prototype.$trustpilotWidgetList = () => Object.keys(widgets)

    // components to access to the widgets information.
    Vue.component('vue-trustpilot', TrustpilotWidget)
  }
}
