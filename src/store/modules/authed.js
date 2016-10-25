import mutations from '../mutations/authed';
import * as actions from '../actions/authed';
import * as getters from '../getters/authed';

const state = {
  accessToken: null,
  user: null,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
