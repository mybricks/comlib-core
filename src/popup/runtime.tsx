import {useCallback, useMemo} from "react";
import css from "./css.lazy.less";

export default function ({_env, env, data, outputs, slots, createPortal}) {
  useMemo(() => {
    _env.loadCSSLazy(css)//加载css
  }, [])

  const close = useCallback(() => {
    _env.currentScenes.close()
  }, [])

  const cancel = useCallback(() => {
    outputs['cancel']()
    // _env.currentScenes.close()
  }, [])

  const commit = useCallback(() => {
    outputs['commit']()
  }, [])

  const apply = useCallback(() => {
    outputs['apply']()
  }, [])

  const buttons = data.buttons

  const jsx = (
    <div className={css.popup}>
      <div className={css.header}>
        <label>对话框的标题</label>
        <button onClick={close}>×</button>
      </div>
      <div className={css.body}>
        {slots['body'].render()}
      </div>
      <div className={css.toolbar}>
        <div style={{marginRight: 'auto'}}>
          {
            buttons.apply.visible ? (
              <button data-handler-btn={'apply'} style={{marginRight: 'auto'}} onClick={apply}>应用</button>
            ) : null
          }
        </div>
        {
          buttons.cancel.visible ? (
            <button data-handler-btn={'cancel'} onClick={cancel}>取消</button>
          ) : null
        }
        {
          buttons.commit.visible ? (
            <button data-handler-btn={'commit'} onClick={commit}>确定</button>
          ) : null
        }
      </div>
    </div>
  )

  if (env.runtime) {
    //return createPortal
    return (
      <div className={css.bg}>
        {jsx}
      </div>
    )
  } else {
    return jsx
  }
}