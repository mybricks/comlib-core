export default function ({data, outputs, inputs}) {
  inputs['get']((val, relOutpus) => {
    const cv = clone(data.val)
    relOutpus['return'](cv)
  })

  inputs['set'](val => {
    data.val = val
    outputs['changed'](clone(val))
  })

  // outputs['changed'](data.val)
}

function clone(val) {
  if (val && typeof val === 'object') {
    try {
      return JSON.parse(JSON.stringify(val))
    } catch (ex) {
      return val
    }
  }
  return val
}