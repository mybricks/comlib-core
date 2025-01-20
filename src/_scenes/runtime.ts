export default function ({env, data, inputs, _inputs, _inputsCallable}) {
  inputs[data._pinId || 'open'](params => {
    if (!data._pinId || data._pinId === 'open') {
      env.canvas.open(data._sceneId, params,data._sceneShowType === 'popup' ? null : data.openType)
      _inputsCallable["_open"](params)
    } else {
      _inputsCallable[data._pinId](params)
    }
  })
}