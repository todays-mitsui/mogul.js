import Vue from 'vue';
import MogulTest from './Components/MogulTest.vue';

window.app = new Vue({
  el: '.container',

  components: {
    MogulTest,
  },

  data: {
    name: 'world',
  }
});
