/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import {uuid} from "../util";
import {Tips} from "./editTips";
import React from "react";

interface Result {
  focusArea: any
  slot: any
  data: any
  output: any
  input: any
}

export default {
  '@init'({style, data}) {
    style.width = data.width;
    style.height = data.height;
  },
  '@resize': {
    options: ['width', 'height'],
    value: {
      set({data}, {width, height}) {
        data.height = height
        // if (typeof height === 'number'&&height) {
        //   console.log(height)
        //   data.height = height
        // }
      }
    }
  },
  ':focus-mask': ({data, style, slots}) => {
    return <Tips data={data} style={style} slots={slots}/>
  },
  ':root': ({input, output}, cate1, cate2, cate3) => {
    const allOutPins = output.get()

    cate1.title = '常规';
    cate1.items = [
      {
        title: '添加列',
        type: 'button',
        // ifVisible({data}) {
        //   if (data.rows.length === 1) {
        //     return true
        //   }
        // },
        value: {
          set({data, style, slots}) {
            const metaColId = uuid()
            const lastCol = data.cols[data.cols.length - 1]
            if (typeof style.width === 'number') {
              let widthCount = 0
              data.cols.forEach(col => {
                if (col.width) {
                  widthCount += col.width
                }
              })

              lastCol.width = style.width - widthCount

              style.width += 100
            } else {
              lastCol.width = lastCol.width / 2
            }


            data.cols.push({
              id: metaColId
            })

            data.rows.forEach(row => {
              const cols = row.cols
              const colId = uuid()

              cols.push({
                id: colId,
                defId: metaColId
              })

              slots.add({
                id: colId,
                title: '单元格'
              })
            })
          }
        }
      },
      {
        title: '添加行',
        type: 'button',
        value: {
          set({data, style, slots}) {
            const cols = []
            const lastRow = data.rows[data.rows.length - 1]

            if (typeof style.height === 'number') {
              let heightCount = 0
              data.rows.forEach(row => {
                if (row.height) {
                  heightCount += row.height
                }
              })

              lastRow.height = style.height - heightCount

              style.height += 100
            } else {
              lastRow.height = lastRow.height / 2
            }


            lastRow.cols.forEach(col => {
              const colId = uuid()
              cols.push({
                id: colId,
                defId: col.defId
              })

              slots.add({
                id: colId,
                title: '单元格'
              })
            })

            data.rows.push({
              id: uuid(),
              cols
            })
          }
        }
      }
    ]
  },
  // '[data-row-id]': [
  //   {
  //     title: '拆分',
  //     type: 'button',
  //     value: {
  //       set({data, slots, focusArea}) {
  //         const colId = focusArea.dataset[`col-id`]
  //         debugger
  //
  //         const newId = uuid()
  //         data.rows[0].cols.push({
  //           id: newId
  //         })
  //         slots.add({id: newId, title: '单元格'})
  //       }
  //     }
  //   }
  // ],
  // '[data-tip-col-id]': [
  //   {
  //     title: '布局',
  //     type: 'button',
  //     value: {
  //       set({data, slots, focusArea}) {
  //         const colId = focusArea.dataset[`col-id`]
  //         debugger
  //
  //       }
  //     }
  //   },
  // ],
  '[data-edit-col]': {
    title: '列',
    items: [
      {
        title: 'XXX',
        type: 'button',
        value: {
          set({data, slots, focusArea}) {
            const colId = focusArea.dataset[`col-id`]
            debugger

          }
        }
      }
    ]
  },
  '[data-col-id]': {
    title: '单元格',
    items: [
      {
        title: "自动布局",
        type: "layout",
        options: [],
        value: {
          get({ data }) {
            return {
              layout: data.layout || "absolute",
              layoutAlignItems: data.layoutAlignItems || "flex-start",
              layoutJustifyContent: data.layoutJustifyContent || "flex-start",
            };
          },
          set({ data, slot }, value) {
            const layout = value.layout || "absolute";
            const layoutAlignItems = value.layoutAlignItems || "flex-start";
            const layoutJustifyContent =
              value.layoutJustifyContent || "flex-start";

            data.layout = value.layout;
            data.layoutAlignItems = value.layoutAlignItems;
            data.layoutJustifyContent = value.layoutJustifyContent;

            slot.get("content").setLayout(layout);
            slot.get("content").setAlignItems(layoutAlignItems);
            slot.get("content").setJustifyContent(layoutJustifyContent);
          },
        },
      },
      {
        items: [
          {
            title: '所在行',
            type: 'button',
            value: {
              set({data, slots, focusArea}) {
                const colId = focusArea.dataset[`col-id`]
                debugger

              }
            }
          }, {
            title: '所在列',
            type: 'button',
            value: {
              set({data, slots, focusArea}) {
                const colId = focusArea.dataset[`col-id`]
                debugger

              }
            }
          }
        ]
      }
    ]
  }
}



