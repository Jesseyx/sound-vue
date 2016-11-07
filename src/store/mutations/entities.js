import merge from 'lodash/merge';

import * as types from '../../constants/mutation-types';

const kayMaps = ['songs', 'users', 'playlists'];

export default {
  [types.RECEIVE_ENTITIES] (state, entities) {
    kayMaps.forEach((key) => {
      if (entities[key]) {
        state[key] = merge({}, state[key], entities[key]);
      }
    });
  },
};
