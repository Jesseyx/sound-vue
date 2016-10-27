import * as types from '../../constants/mutation-types';

const kayMaps = ['songs', 'users', 'playlists'];

export default {
  [types.RECEIVE_ENTITIES] (state, entities) {
    kayMaps.forEach((key) => {
      if (entities[key]) {
        state[key] = { ...state[key], ...entities[key] };
      }
    });
  },
};
