import css from './css.lazy.less'
import {useMemo} from "react";

export default function ({env, data, slots}) {
  useMemo(() => {
    env.loadCSSLazy(css)
  }, [])

  return (
    <div className={css.layout}>
      {
        data.rows.map(row => {
          return (
            <div key={row.id} className={css.row} style={{height: row.height}}>
              {
                row.cols.map(col => {
                  const defCol = data.cols.find(c => c.id === col.defId)
                  return (
                    <div key={col.id} className={css.col} style={{width: defCol.width}}>
                      {slots[col.id].render({style: col.style})}
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}