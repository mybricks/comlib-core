/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */
import {uuid} from "../util";

interface Result {
  focusArea: any
  slot: any
  data: any
  output: any
  input: any
}

export default {
  ':root': ({input, output}, cate1, cate2, cate3) => {
    const allOutPins = output.get()

    cate1.title = '常规';
    cate1.items = []

    if (allOutPins) {
      allOutPins.forEach(pin => {
        cate1.items.push({
          title: pin.title,
          type: '_Event',
          options: () => {
            return {
              outputId: pin.id
            };
          }
        })
      })
    }

  }
}



