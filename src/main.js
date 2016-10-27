import 'isomorphic-fetch';  // fetch
import Vue from 'vue';

import router from './router';
import store from './store';
import App from './containers/App.vue';

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

console.log(app);
