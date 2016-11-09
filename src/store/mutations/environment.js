import * as types from '../../constants/mutation-types';

export default {
  [types.CHANGE_IS_MOBILE](state, isMobile) {
    state.isMobile = isMobile;
  },

  [types.CHANGE_WIDTH_AND_HEIGHT](state, { width, height }) {
    state.width = width;
    state.height = height;
  },
};
