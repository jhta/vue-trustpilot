# vue-trustpilot

Plugin to create Trustpilot widgets in an easy way.

## Install

```bash
npm install vue-trustpilot --save
```

## How to use it:

Add the static trustpilot script

```html
<script
  src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
  async=""
></script>
```

```js
import TrustpilotPlugin from "vue-trustpilot";

const carouselWidget = {
  templateId: "XXXX",
  businessunitId: "XXXXX",
  reviewUrl: "trustpilot.review.com/mywebsite.com",
  locale: "en-us"
  // ...more Trstupilot options in camel case
};

const reviewsListWidget = {
  templateId: "XXXX",
  businessunitId: "XXXXX",
  reviewUrl: "trustpilot.review.com/mywebsite.com",
  locale: "en-us"
  // ...more Trstupilot options in camel case
};

const options = {
  widgets: {
    carousel: carouselWidget,
    list: reviewsListWidget
  }
};

Vue.use(TrustpilotPlugin, options);
```

The Plugin going to register the component `vue-trustpilot` globally.

In your Vue component:

```vue
<template>
  <vue-trustpilot identifier="carousel" />
</template>
```

Also, you can add more custom trustpilot arguments directly:

```vue
<template>
  <vue-trustpilot
    identifier="carousel"
    data-theme="light"
    data-schema-type="Organization"
    data-stars="1,2,3,4,5"
  />
</template>
```

The result:

![](https://cl.ly/3837b22ea642/download/Image%2525202019-08-27%252520at%2525209.43.35%252520AM.png)

Additionally you can access to your widgets data using the method `$trustpilot` in Vue global scope

```vue
<script>
 export default {
   methods: {
     printWidgetData() {
      console.log(this.$trustpilot('carousel'))
     }
   }
  }

```

## Nuxt

```js
// trustpilot.js
const config = {
  widgets: {
    carousel: carouselWidget,
    list: reviewsListWidget
  }
};

module.exports = config;
```

```js
// nuxt.config.js

const trustpilot = require("./trustpilot");

const config = {
  modules: [["vue-trustpilot/nuxt", trustpilot]]
};
```

NOTE: For Nuxt module is not needed to add the truspilot script
