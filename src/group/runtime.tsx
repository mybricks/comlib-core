import {useCallback} from "react";

export default function ({slots, outputs}) {
  const click = useCallback(() => {
    outputs.click()
  }, [])
  
  const dblClick = useCallback(() => {
    outputs.dblClick()
  }, [])
  
  return (
    <div style={{
      width: '100%', height: '100%'
      //, overflow: 'visible'
    }}
         onClick={click}
         onDoubleClick={dblClick}>
      {slots.content.render()}
    </div>
  )
}