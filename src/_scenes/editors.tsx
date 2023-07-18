/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
const allTypes = [
  {
    label: '新页面',
    value: 'blank'
  },
  {
    label: '重定向',
    value: 'redirect'
  }
]

export default {
  '@init': ({data, setDesc, setAutoRun, isAutoRun}) => {
    setDesc(`（新页面）`)
  },
  ':root': [
    {
      title: '打开方式',
      type: 'select',
      ifVisible({data}) {
        return data._sceneShowType !== 'popup'
      },
      options({data, input, output}) {
        return allTypes
      },
      value: {
        get({data, input, output}) {
          return data.openType || 'blank'
        },
        set({data, setDesc}, val) {
          data.openType = val

          const typeTitle = allTypes.find(type => type.value === val).label
          setDesc(`（${typeTitle}）`)
        }
      }
    }
  ]
}