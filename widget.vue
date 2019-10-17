<script>

import Vue from 'vue';
import { kebabCase, reduce } from 'lodash';

export default {
  props: {
    /** widget identifier */
    identifier: {
      type: String,
      required: true,
    },
  },
  render(createElement) {
    const { $attrs, $trustpilot, identifier } = this;

    // access and get the widget configuration based on a name identifier
    const widget = $trustpilot(identifier);

    // format configuration to data- + kebab-case, format needed for trustpilot script
    // example: templateId => data-template-id
    const formattedTrustPilotConfig = reduce(widget, (result, value, key) => ({
      ...result,
      [`data-${kebabCase(key)}`]: value,
    }), {});

    // formatted attributes to assing
    const attrs = {
      ...Object.create($attrs),
      ...formattedTrustPilotConfig,
      class: 'trustpilot-widget',
    };

    // anchor link element with url to review
    // result: <a href="reviewUrl" target="_blank"/>
    const link = createElement(
      'a',
      {
        attrs: {
          href: widget.reviewUrl,
          target: '_blank',
        },
      },
    );

    // result: <div class="trustpilot-widget" data-[key]="[value]" ><a href="reviewUrl" target="_blank" /></div>
    return createElement('div', { attrs }, [link]);
  },
  mounted() {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
    document.head.appendChild(script)
  }
};


</script>
