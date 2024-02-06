export default function ({slots}) {
  return (
    <div style={{width: '100%', height: '100%', overflow: 'visible'}}>
      {slots.content.render()}
    </div>
  )
}