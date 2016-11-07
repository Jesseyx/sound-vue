import * as types from '../../constants/mutation-types';

export function receiveEntities({ commit }, entities) {
  commit(types.RECEIVE_ENTITIES, entities);
}
