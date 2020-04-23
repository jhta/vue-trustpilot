<script>
import Vue from "vue";
import kebabCase from "lodash/kebabCase";
import reduce from "lodash/reduce";

export default {
  props: {
    /** widget identifier */
    identifier: {
      type: String,
      required: true
    }
  },
  render(createElement) {
    const { $attrs, $trustpilot, identifier } = this;

    // access and get the widget configuration based on a name identifier
    const widget = $trustpilot(identifier);

    // format configuration to data- + kebab-case, format needed for trustpilot script
    // example: templateId => data-template-id
    const formattedTrustPilotConfig = reduce(
      widget,
      (result, value, key) => ({
        ...result,
        [`data-${kebabCase(key)}`]: value
      }),
      {}
    );

    // formatted attributes to assing
    const attrs = {
      ...Object.create($attrs),
      ...formattedTrustPilotConfig,
      class: "trustpilot-widget",
      id: `trustpilot-widget-${identifier}`
    };

    // anchor link element with url to review
    // result: <a href="reviewUrl" target="_blank"/>
    const link = createElement("a", {
      attrs: {
        href: widget.reviewUrl,
        target: "_blank"
      }
    });

    // result: <div class="trustpilot-widget" data-[key]="[value]" ><a href="reviewUrl" target="_blank" /></div>
    return createElement("div", { attrs }, [link]);
  },
  mounted() {
    try {
      this.$nextTick(() => {
        const trustbox = document.getElementById(
          `trustpilot-widget-${this.identifier}`
        );
        if (window.Trustpilot) {
          window.Trustpilot.loadFromElement(trustbox);
        }
      });
    } catch (error) {
      console.info(error);
    }
  }
};
</script>
