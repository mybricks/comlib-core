import React, { useCallback, useMemo } from 'react';

import css from './runtime.less';

export default function ({ data, slots }) {

  const layoutStyle = useCallback(() => {
    let gridTemplateColumns = '';
    let gridTemplateRows = '';
  
    data.rows.forEach((row) => {
      const { height } = row;
      if (height) {
        gridTemplateRows = gridTemplateRows + (gridTemplateRows ? ` ${height}px` : `${height}px`);
      }
    });
  
    data.cols.forEach((col) => {
      const { width } = col;
      if (width) {
        gridTemplateColumns = gridTemplateColumns + (gridTemplateColumns ? ` ${width}px` : `${width}px`);
      }
    });

    return {
      display: 'grid',
      gridTemplateRows,
      gridTemplateColumns
    };
  }, []);

  const jsx = useMemo(() => {
    const map = {};
    return data.rows.map((row, rowIndex) => {
      
      if (!map[rowIndex]) {
        map[rowIndex] = [];
      }
      const { cols } = row;
      const jsx = cols.map((col, colIndex) => {
        const { id, colSpan, rowSpan } = col;
        const step = map[rowIndex][colIndex] || 0;
        const obj = {
          rowIndex: rowIndex + 1,
          colIndex: colIndex + 1 + step,
          rowSpan: rowIndex + 1 + (rowSpan || 0),
          colSpan: colIndex + 1 + (colSpan || 0) + step
        };

        map[rowIndex].push(colSpan || 1);

        if (rowSpan) {
          for (let i = rowIndex + 1; i < rowSpan; i++) {
            if (!map[i]) {
              map[i] = [];
            }
            map[i][colIndex] = colSpan || 1;
          }
        }
        
        return (
          <div key={id} style={{gridArea: `${obj.rowIndex} / ${obj.colIndex} / ${obj.rowSpan} / ${obj.colSpan}`, border: '1px solid red'}}>
            {slots[id].render({style: col.style})}
          </div>
        );
      });

      return jsx;
    });
  }, []);

  return (
    <div className={css.layout} style={layoutStyle()}>
      {jsx}
    </div>
  );
}