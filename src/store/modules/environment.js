import mutations from '../mutations/environment';
import * as actions from '../actions/environment';
import * as getters from '../getters/environment';

const state = {
  isMobile: false,
  height: null,
  width: null,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
