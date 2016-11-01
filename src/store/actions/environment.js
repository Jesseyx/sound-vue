import * as types from '../../constants/mutation-types';

export function initEnvironment(context) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent);

  if (isMobile) {
    document.body.style.overflow = 'hidden';
  }

  changeIsMobile(context, isMobile);
  changeWidthAndHeight(context, {
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const ctx = {
    commit: context.commit,
  };
  window.onresize = () => {
    changeWidthAndHeight(ctx, {
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };
}

function changeIsMobile({ commit }, isMobile) {
  commit(types.CHANGE_IS_MOBILE, isMobile);
}

function changeWidthAndHeight({ commit }, payload) {
  commit(types.CHANGE_WIDTH_AND_HEIGHT, payload);
}
