export default function ({env, data, outputs, inputs, logger, onError, _notifyBindings}) {
  inputs['get']((val, relOutpus) => {
    const nowVal = data.val !== void 0 ? data.val : data.initValue
    const cv = clone(nowVal)

    relOutpus['return'](cv)
  })

  inputs['set']((val, relOutpus) => {
    data.val = val
    const cVal = clone(val)
    outputs['changed'](cVal, true)//notify all forked coms
    _notifyBindings(cVal)

    relOutpus['return'](cVal)
  })

  inputs['setTrue']((val, relOutpus) => {
    data.val = true
    //const cVal = clone(val)
    outputs['changed'](true, true)//notify all forked coms
    //_notifyBindings(cVal)

    relOutpus['return'](true)
  })

  inputs['setFalse']((val, relOutpus) => {
    data.val = false
    outputs['changed'](false, true)//notify all forked coms

    relOutpus['return'](false)
  })

  inputs['setAryAdd']((val, relOutpus, { onError }) => {
    if (!data.val || !Array.isArray(data.val)) {
      const msg = `${data.initValue} must be an array`
      onError(msg)
      return
    }

    data.val.push(val)

    const cVal = clone(val)
    outputs['changed'](cVal, true)//notify all forked coms

    relOutpus['return'](cVal)
  })

  inputs['reset'](() => {
    const val = data.initValue
    data.val = val
    const cVal = clone(val)

    outputs['changed'](cVal, true)//notify all forked coms
    _notifyBindings(cVal)
  })

  // outputs['changed'](data.val)
}

function clone(obj: any, cache: any = []) {
  try {
    const type = Object.prototype.toString.call(obj)
    if (obj === null || typeof obj !== 'object' || type.startsWith('[object HTML') || type === '[object FormData]') {
      return obj
    }

    const hit = cache.filter((i: any) => i.original === obj)[0]

    if (hit) {
      return hit.copy
    }

    const copy: any = Array.isArray(obj) ? [] : {}

    cache.push({
      original: obj,
      copy
    })

    Object.keys(obj).forEach(key => {
      copy[key] = clone(obj[key], cache)
    })

    return copy
  } catch (ex) {
    return obj
  }
}

// function clone(val) {
//   if (val) {
//     try {
//       const type = Object.prototype.toString.call(val);

//       if (['[object Object]', '[object Array]'].includes(type)) {
//         return JSON.parse(JSON.stringify(val))
//       }

//       return val
//     } catch (ex) {
//       return val
//     }
//   }
//   return val
// }