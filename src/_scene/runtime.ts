export default function ({env,data, inputs, outputs}) {
  inputs['params'](params => {
    env.goScene(data.scene.id,params)//切换场景
  })
}