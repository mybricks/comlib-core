/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import css from './css.lazy.less'
import React, {CSSProperties, useCallback, useEffect, useMemo, useRef} from "react";
import {dragable, uuid} from "../util";
import {Tips} from "./editTips";

export default function ({env, data, style, slots}) {
  const layoutEl = useRef()

  useMemo(() => {
    const dom = document.querySelector(`#_mybricks-geo-webview_`)
    let targetDom

    if (dom) {
      targetDom = dom.shadowRoot
    } else {
      targetDom = document.head
    }

    const allCss = css.use({target: targetDom}).locals
    Object.assign(css, allCss)
  }, [])


  useEffect(() => {
    if (data._editCol) {
      const ele = layoutEl.current.querySelector(`[data-edit-col]`)
      ele.click()

      env.edit.regBlur(() => {
        data._editCol = void 0
      })
    }
  }, [data._editCol])


  // useMemo(() => {
  //   if (env.edit.focused) {
  //     env.edit.appendEditors(() => {
  //       return <Tips data={data} style={style} slots={slots}/>
  //     })
  //   }
  // }, [env.edit.focused])

  return (
    <div className={css.layout} ref={layoutEl}>
      <table style={{minHeight: data.height}}>
        <tbody style={{minHeight: data.height}}>
        <tr className={css.thead}>
          {
            data.cols.map((col, idx) => {
              return (
                <td key={col.id}
                    style={{width: col.width}}
                    className={css.td}>
                </td>
              )
            })
          }
        </tr>
        {
          data.rows.map(row => {
            return <Row key={row.id} env={env} data={data} slots={slots} row={row}/>
          })
        }
        </tbody>
      </table>

      {
        data._editCol ? (
          <div className={css.showCol}
               style={data._editCol.style}></div>
        ) : null
      }
      <div data-edit-col={data._editCol?.id}/>

      {/*{tips}*/}
    </div>
  )
}


function Row({env, data, slots, row}) {
  const focusTable = useCallback(e => {

  }, [])

  function getTrProps(row) {
    const props = {}
    if (!(data.rows.length === 1 && data.rows[0].cols.length === 1)) {
      props['data-row-id'] = row.id
    }

    // if (idx !== row.cols.length - 1) {
    //   tdProps['style'] = {width: col.width}
    // }

    return props
  }

  function getTdProps(row, col, idx) {
    const tdProps = {}
    if (!(data.rows.length === 1 && data.rows[0].cols.length === 1)) {
      tdProps['data-col-id'] = col.id
    }

    // if (idx !== row.cols.length - 1) {
    //   tdProps['style'] = {width: col.width}
    // }

    return tdProps
  }

  const dragW = useCallback((e, col) => {
    const defCol = data.cols.find(def => def.id === col.defId)
    let width = defCol.width
    let editFinish

    dragable(e, ({po, eo, dpo}, state) => {
      if (state === 'start') {
        editFinish = env.edit.focusPaasive()//打开组件，阻止focus样式绘制
      } else if (state === 'ing') {
        width += dpo.dx

        defCol.width = width
      } else if (state === 'finish') {
        if (editFinish) {
          editFinish()
        }
      }
    })
    e.stopPropagation()
  }, [])


  return (
    <tr key={row.id} {...getTrProps(row)}>
      {
        row.cols.map((col, idx) => {
          return (
            <td key={col.id}
                {...getTdProps(row, col, idx)}
                className={css.td}
                onClick={focusTable}>
              {slots[col.id].render()}
              {
                idx < row.cols.length - 1 ? (
                  <div className={css.resizeW} onMouseDown={e => dragW(e, col)}>
                  </div>
                ) : null
              }
            </td>
          )
        })
      }
    </tr>
  )
}