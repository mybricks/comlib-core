/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */

export default {
  '@init'({data, setDesc}) {
    if (!data.scene) {
      setDesc(`未配置场景`)
    }
  },
  ':root': [
    {
      title: '场景',
      type: '_sceneSelect',
      options({data, input, output}) {
        return {
          current: data.scene
        }
      },
      value: {
        get({data, input, output}) {
          return data.scene
        },
        set({data, setDesc}, val) {
          data.scene = val

          setDesc(`${val.title}`)
        }
      }
    }
  ]
}



