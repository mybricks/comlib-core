import React, {Fragment, useCallback} from "react";
import {uuid} from "../../util";
import {resetLayout} from "./edtUtils";

const themeColorPrimary = '#FA6400'

const styleColTips = {
  width: '100%',
  position: 'absolute',
  left: 0,
  top: -5
}

const styleRowTips = {
  height: '100%',
  position: 'absolute',
  left: 0,
  left: -5
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
    e.target.style.transform = `scale(1.5)`
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

//----------------------------------------------------------------

export function Tips({data, style, slots, element}) {
  return [(
    <div key={'topCols'} style={styleColTips}>
      <ColTips data={data} slots={slots} element={element} style={style}/>
    </div>
  ), (
    <div key={'topRows'} style={styleRowTips}>
      <RowTips data={data} slots={slots} element={element} style={style}/>
    </div>
  )]
}

function RowTips({data, slots, style, element}) {
  const addRow = useCallback((e, row?) => {
    const newRow = _addRow(row, {data, slots, style, element})
    requestAnimationFrame(v => {
      editRow(e, newRow)
    })
  }, [])

  const editRow = useCallback((e, defRow) => {
    let curTop = 0
    data.rows.find(row => {
      if (row.id !== defRow.id) {
        curTop += row.height
      } else {
        return true
      }
    })

    const trEle = element.querySelector(`#row-${defRow.id}`)
    data._editRow = {
      id: defRow.id,
      style: {
        height: trEle.clientHeight,
        top: curTop
      }
    }

    e.stopPropagation()
  }, [])

  const rowTips = []
  const isStyleHeightIsNumber = typeof style.height === 'number'

  let curTop = 0
  data.rows.forEach((row, idx) => {
    const focusNow = data._editRow?.id === row.id

    rowTips.push(
      <div key={`${row.id}-tip`}
           style={Object.assign({left: -10, top: curTop - 3}, styleTip)}
           onClick={e => addRow(e, row)}
           {...evtsTip}/>
    )

    if (idx === data.rows.length - 1) {//last col
      rowTips.push(
        <div key={`${row.id}-bar`}
             style={Object.assign({
                 top: curTop,
                 height: isStyleHeightIsNumber ? style.height - curTop : void 0,
                 bottom: isStyleHeightIsNumber ? void 0 : 0
               },
               styleRow,
               focusNow ? {
                 backgroundColor: themeColorPrimary
               } : null)}
             onClick={e => editRow(e, row)}
             {...evtsBar(focusNow)}/>
      )
    } else {
      rowTips.push(
        <div key={`${row.id}-bar`}
             style={Object.assign({top: curTop, height: row.height},
               styleRow,
               focusNow ? {
                 backgroundColor: themeColorPrimary
               } : null)}
             onClick={e => editRow(e, row)}
             {...evtsBar(focusNow)}/>
      )
    }

    curTop += row.height || 0
  })

  rowTips.push(
    <div key={'last'} style={Object.assign({
      left: -10,
      top: isStyleHeightIsNumber ? style.height - 3 : void 0,
      bottom: isStyleHeightIsNumber ? void 0 : -3
    }, styleTip)}
         onClick={e => addRow(e)}
         {...evtsTip}/>
  )

  return rowTips
}

function ColTips({data, slots, style, element}) {
  const editCol = useCallback((e, defCol) => {
    let curLeft = 0
    data.cols.find(col => {
      if (col.id !== defCol.id) {
        curLeft += col.width || 0
      } else {
        return true
      }
    })

    const tdEle = element.querySelector(`#col-${defCol.id}`)
    data._editCol = {
      id: defCol.id,
      style: {
        width: tdEle.clientWidth,
        left: curLeft
      }
    }

    e.stopPropagation()
  }, [])

  const addCol = useCallback((e, col?) => {
    const newCol = _addCol(col, {data, slots, style, element})
    requestAnimationFrame(v => {
      editCol(e, newCol)
    })

  }, [])

  const isStyleWidthIsNumber = typeof style.width === 'number'

  const colTips = []

  let curLeft = 0

  data.cols.forEach((col, idx) => {
    const focusNow = data._editCol?.id === col.id

    colTips.push(
      <div key={`${col.id}-tip`}
           style={Object.assign({top: -10, left: curLeft - 3}, styleTip)}
           onClick={e => addCol(e, col)}
           {...evtsTip}/>
    )

    if (idx === data.cols.length - 1) {//last col
      colTips.push(
        <div key={`${col.id}-bar`}
             style={Object.assign({
                 left: curLeft,
                 width: isStyleWidthIsNumber ? style.width - curLeft : void 0,
                 right: isStyleWidthIsNumber ? void 0 : 0
               },
               styleCol,
               focusNow ? {
                 backgroundColor: themeColorPrimary
               } : null)}
             onClick={e => editCol(e, col)}
             {...evtsBar(focusNow)}/>
      )
    } else {
      colTips.push(
        <div key={`${col.id}-bar`}
             style={Object.assign({left: curLeft, width: col.width},
               styleCol,
               focusNow ? {
                 backgroundColor: themeColorPrimary
               } : null)}
             onClick={e => editCol(e, col)}
             {...evtsBar(focusNow)}/>
      )
    }

    curLeft += col.width || 0
  })

  colTips.push(
    <div key={'last'} style={Object.assign({
      top: -10,
      left: isStyleWidthIsNumber ? style.width - 3 : void 0,
      right: isStyleWidthIsNumber ? void 0 : -3
    }, styleTip)}
         onClick={e => addCol(e)}
         {...evtsTip}/>
  )

  return colTips
}

//--------------------------------------------------------------------

function _addCol(col, {data, slots, style, element}) {
  const isLayoutWidthNumber = typeof style.width === 'number'

  let newCol
  if (col) {//before
    const idx = data.cols.indexOf(col)
    newCol = {
      id: uuid(),
      width: 100
    }

    data.cols.splice(idx, -1, newCol)

    data.rows.forEach(row => {
      const cols = row.cols
      const colId = uuid()

      cols.splice(idx, -1, {
        id: colId,
        defId: newCol.id
      })

      slots.add({
        id: colId,
        title: '单元格'
      })
    })
  } else {//last one
    const lastColDef = data.cols[data.cols.length - 1]
    const lastWidth = element.querySelector(`#col-${lastColDef.id}`).offsetWidth
    lastColDef.width = lastWidth

    newCol = {
      id: uuid()
    }

    data.cols.push(newCol)

    data.rows.forEach(row => {
      const cols = row.cols
      const colId = uuid()

      cols.push({
        id: colId,
        defId: newCol.id
      })

      slots.add({
        id: colId,
        title: '单元格'
      })
    })
  }

  if (isLayoutWidthNumber) {
    style.width += 100
  } else {

  }

  resetLayout({data})

  return newCol
}

function _addRow(row, {data, slots, style, element}) {
  const isLayoutWidthNumber = typeof style.width === 'number'

  const newRow = {
    id: uuid(),
    height: 100,
    cols: data.cols.map(defCol => {
      const newCol = {
        id: uuid(),
        defId: defCol.id
      }

      slots.add({
        id: newCol.id,
        title: '单元格'
      })

      return newCol
    })
  }

  if (row) {//before
    const idx = data.rows.indexOf(row)

    data.rows.splice(idx, -1, newRow)
  } else {//last one
    const lastRow = data.rows[data.rows.length - 1]
    const lastHeight = element.querySelector(`#row-${lastRow.id}`).offsetHeight
    lastRow.height = lastHeight

    data.rows.push(newRow)
  }

  if (isLayoutWidthNumber) {
    style.height += 100
  } else {

  }

  resetLayout({data})

  return newRow
}