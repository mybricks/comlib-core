import React, {Fragment, useCallback} from "react";
import {uuid} from "../util";

const themeColorPrimary = '#FA6400'

const styleColTips = {
  width: '100%',
  position: 'absolute',
  left: 0,
  top: -7
}

const styleRowTips = {
  height: '100%',
  position: 'absolute',
  left: 0,
  left: -7
}

const styleTip = {
  position: 'absolute',
  width: 7,
  height: 7,
  borderRadius: 7,
  backgroundColor: '#CCC',
  pointerEvents: 'auto'
}

const styleCol = {
  position: 'absolute',
  height: 7,
  backgroundColor: '#CCC',
  pointerEvents: 'auto'
}

const styleRow = {
  position: 'absolute',
  width: 7,
  backgroundColor: '#CCC',
  pointerEvents: 'auto'
}

const evtsTip = {
  onMouseOver: e => {
    e.target.style.transform = `scale(2)`
    //e.target.style.transition = `all 100ms linear`
    e.target.style.backgroundColor = themeColorPrimary
  },
  onMouseLeave: e => {
    e.target.style.transform = `scale(1)`
    e.target.style.transition = `all 100ms linear`
    e.target.style.backgroundColor = '#CCC'
  }
}

function evtsBar(ignore?) {
  return {
    onMouseOver: e => {
      e.target.style.backgroundColor = themeColorPrimary
    },
    onMouseLeave: ignore ? null : e => {
      //e.target.style.transition = `all 100ms linear`
      e.target.style.backgroundColor = '#CCC'
    }
  }
}


export function Tips({data, style, slots}) {
  const addCol = useCallback((col?) => {
    if (col) {//before
      const idx = data.cols.indexOf(col)
      const newDef = {
        id: uuid(),
        width: 100
      }

      if (typeof style.width === 'number') {
        style.width += 100
      } else {

      }

      data.cols.splice(idx, -1, newDef)

      data.rows.forEach(row => {
        const cols = row.cols
        const colId = uuid()

        cols.splice(idx, -1, {
          id: colId,
          defId: newDef.id
        })

        slots.add({
          id: colId,
          title: '单元格'
        })
      })
    }
  }, [])

  const editCol = useCallback((e, defCol, curLeft) => {
    data._editCol = {
      id: defCol.id,
      style: {
        width: defCol.width,
        left: curLeft
      }
    }

    e.stopPropagation()//////TODO goon
  }, [])

  const colTips = []

  let curLeft = 0

  data.cols.forEach((col, idx) => {
    let nowLeft = curLeft
    const focusNow = data._editCol?.id === col.id
    colTips.push(
      <Fragment key={col.id}>
        <div
          style={Object.assign({top: -10, left: curLeft - 3}, styleTip)}
          onClick={e => addCol(col)}
          {...evtsTip}/>
        <div
          style={Object.assign({left: curLeft, width: col.width},
            styleCol,
            focusNow ? {
              backgroundColor: themeColorPrimary
            } : null)}
          onClick={e => editCol(e, col, nowLeft)}
          {...evtsBar(focusNow)}/>
      </Fragment>
    )

    curLeft += col.width || 0
  })

  colTips.push(
    <Fragment key={'last'}>
      <div style={Object.assign({top: -10, right: -3}, styleTip)}
           onClick={e => addCol()}
           {...evtsTip}/>
      <div
        style={Object.assign({left: curLeft, right: 0}, styleCol)}
        onClick={e => editCol()}
        {...evtsBar}/>
    </Fragment>
  )

  const rowTips = []

  let curTop = 0
  data.rows.forEach((row, idx) => {
    rowTips.push(
      <Fragment key={row.id}>
        <div style={Object.assign({left: -10, top: curTop - 3}, styleTip)}
             {...evtsTip}>
        </div>
        <div
          style={Object.assign({top: curTop, height: row.height}, styleRow)}
          onClick={e => addCol(col)}
          {...evtsBar}/>
      </Fragment>
    )
    curTop += row.height || 0
  })

  rowTips.push(
    <Fragment key={'last'}>
      <div style={Object.assign({left: -10, bottom: -3}, styleTip)}
           {...evtsTip}
           onClick={e => addCol()}/>
      <div
        style={Object.assign({top: curTop, bottom: 0}, styleRow)}
        onClick={e => addCol()}
        {...evtsBar}/>
    </Fragment>
  )

  return [(
    <div key={'topCols'} style={styleColTips}>
      {
        colTips
      }
    </div>
  ), (
    <div key={'topRows'} style={styleRowTips}>
      {
        rowTips
      }
    </div>
  )]
}