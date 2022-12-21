import {dragable, getPosition} from "@mybricks/rxui";

/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
export function uuid(pre: string = 'u_', len = 6) {
  const seed = 'abcdefhijkmnprstwxyz0123456789', maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}

export function dragable(e, dragingFn, options?) {
  const doc = options?.document || document

  const dom = e.currentTarget, w = dom.offsetWidth, h = dom.offsetHeight,
    relDom = arguments.length == 3 && options && options['relDom'],
    po = getPosition(dom, relDom),
    parentPo = relDom ? getPosition(relDom) : {x: 0, y: 0};

  const scrollBarTop = document.body.scrollTop || document.documentElement.scrollTop;
  const scrollBarLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

  let odx = e.pageX - po.x, ody = e.pageY - po.y;
  let x, y, ex, ey;
  let state;

  if (dragingFn) {
    const handleMouseMove = e => {
      const adx = e.pageX - odx, ady = e.pageY - ody;
      const dx = adx - x, dy = ady - y;
      x = e.pageX - odx;
      y = e.pageY - ody;
      ex = e.pageX - parentPo.x - scrollBarLeft;
      ey = e.pageY - parentPo.y - scrollBarTop;
//console.log(dy)
      if (state === 'finish') {
        dragingFn({
          po: {x, y}, epo: {ex, ey}, dpo: {dx: 0, dy: 0}, adpo: {adx, ady},
          targetStyle: {x: po.x, y: po.y, w, h}
        }, state, dom)
      } else {
        if (dx != 0 || dy != 0) {
          state = state ? 'ing' : 'start';

          //stopWatch(()=>{
          dragingFn({
            po: {x, y}, epo: {ex, ey}, dpo: {dx, dy}, adpo: {adx, ady},
            targetStyle: {x: po.x, y: po.y, w, h}
          }, state, dom)
          //})
        }
      }
    }

    let moving = false
    doc.onmousemove = e => {
      if (!moving) {
        moving = true
      }
      try {
        handleMouseMove(e)
      } catch (ex) {
        console.error(ex)
      }
    }

    doc.onmouseup = e => {
      state = 'finish'
      handleMouseMove(e)

      doc.onmousemove = null;
      doc.onmouseup = null;
    }
  } else {
    return po;
  }
}