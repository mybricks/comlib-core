export default function ({env, data, inputs, _inputs, _inputsCallable}) {
  inputs['open'](params => {
    env.canvas.open(data._sceneId, params,data._sceneShowType === 'popup' ? null : data.openType)

    _inputsCallable['_open'](params)
  })
}