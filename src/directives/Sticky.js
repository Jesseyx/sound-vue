// Refer to this example: https://github.com/ElemeFE/vue-infinite-scroll

const ctx = '@@stickyScroll';

const throttle = function (fn, delay) {
  let now, lastExec, timer, context, args; // eslint-disable-line

  const execute = function () {
    fn.apply(context, args);
    lastExec = now;
  };

  return function () {
    context = this;
    /* eslint-disable prefer-rest-params */
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (lastExec) {
      const diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
};

const getScrollTop = function (element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
  }

  return element.scrollTop;
};

/* eslint-disable no-unused-vars */
const getComputedStyle = document.defaultView.getComputedStyle;

/* eslint-disable no-unused-vars */
const getScrollEventTarget = function (element) {
  // let currentNode = element;
  // // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  // while (currentNode
  //   && currentNode.tagName !== 'HTML'
  //   && currentNode.tagName !== 'BODY'
  //   && currentNode.nodeType === 1) {
  //   const overflowY = getComputedStyle(currentNode).overflowY;
  //   if (overflowY === 'scroll' || overflowY === 'auto') {
  //     return currentNode;
  //   }
  //   currentNode = currentNode.parentNode;
  // }

  return window;
};

const getVisibleHeight = function (element) {
  if (element === window) {
    return document.documentElement.clientHeight;
  }

  return element.clientHeight;
};

const getElementTop = function (element) {
  if (element === window) {
    return getScrollTop(window);
  }
  return element.getBoundingClientRect().top + getScrollTop(window);
};

const doCheck = function () {
  const scrollEventTarget = this.scrollEventTarget;
  const distance = this.distance;

  const viewportScrollTop = getScrollTop(scrollEventTarget);

  let result = false;

  if (viewportScrollTop >= distance) {
    result = true;
  }

  if (this.expression) {
    this.expression(result);
  }
};

const doBind = function () {
  if (this.binded) return; // eslint-disable-line
  this.binded = true;

  const directive = this;
  const element = directive.el;

  directive.scrollEventTarget = getScrollEventTarget(element);
  directive.scrollListener = throttle(doCheck.bind(directive), 200);
  directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

  const distanceExpr = element.getAttribute('sticky-critical');
  let distance = 0;
  if (distanceExpr) {
    distance = Number(directive.vm[distanceExpr] || distanceExpr);
    if (isNaN(distance)) {
      distance = 0;
    }
  }
  directive.distance = distance;
};

export default {
  bind(el, binding, vnode) {
    el[ctx] = {
      el,
      vm: vnode.context,
      expression: binding.value,
    };

    const args = arguments;
    el[ctx].vm.$on('hook:mounted', () => {
      doBind.call(el[ctx], args);
    });
  },

  unbind(el) {
    el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener);
  },
};
