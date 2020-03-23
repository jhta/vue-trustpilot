const path = require("path");
export default function(config) {
  const trustpilotScript = {
    src:
      "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js",
    async: true
  };
  this.options.head.script.push(trustpilotScript);

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    options: config
  });
}
