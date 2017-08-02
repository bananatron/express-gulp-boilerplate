// A component, YAY

const Vue = require('vue/dist/vue.js');

module.exports = new Vue({
  el: '.lol',
  data: {
    text: 'Woohah'
  },
  methods: {
    doSomething: function(event) {
      console.log(event);
      return 'lol';
    }
  }
});

