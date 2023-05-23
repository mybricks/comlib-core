export default function ({_env,data, inputs, outputs}) {
  outputs['$before']((pinId,val)=>{
    _env.currentScenes.output(pinId)
  })
}