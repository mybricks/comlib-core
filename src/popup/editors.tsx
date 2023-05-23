export default {
  '@init'({style}) {
    style.width = '100%'
    style.height = '100%'
  },
  ':root': {
    '@style': {},
    items: [
      {
        title: '分类',
        type: 'select',
        options: [
          {label: '对话框', value: 'dialog'},
          {label: '抽屉', value: 'drawer'},
        ],
        value: {
          get({data}) {
            return data.popType
          },
          set({data}, val) {
            data.popType = val
          }
        }
      },
      {
        title: '确定按钮',
        type: 'switch',
        ifVisible({data}) {
          return !data.buttons['commit'].visible
        },
        value: {
          set({data}) {
            data.buttons['commit'].visible = true
          }
        }
      },
      {
        title: '取消按钮',
        type: 'switch',
        ifVisible({data}) {
          return !data.buttons['cancel'].visible
        },
        value: {
          set({data}) {
            data.buttons['cancel'].visible = true
          }
        }
      }
    ]
  },
  '[data-handler-btn]': {
    title: '按钮',
    '@style': {},
    items: [
      {
        title: '显示',
        type: 'switch',
        value: {
          get({data, focusArea}) {
            const btnId = focusArea.dataset.handlerBtn
            return data.buttons[btnId].visible
          },
          set({data, focusArea}, val) {
            const btnId = focusArea.dataset.handlerBtn
            data.buttons[btnId].visible = val
          },
        }
      },
      {},
      {
        title: '点击',
        type: '_event',
        options({data, focusArea}) {
          const btnId = focusArea.dataset.handlerBtn
          return {
            outputId: btnId
          }
        }
      }
    ]
  }
}