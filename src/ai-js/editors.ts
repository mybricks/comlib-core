import {CODE_TEMPLATE, COMMENTS, Data, IMMEDIATE_CODE_TEMPLATE} from './constants';
import {setInputSchema, genLibTypes, updateOutputSchema, getIoOrder} from './util';

function safeEncoder(str: string) {
  try {
    return encodeURIComponent(str)
  } catch (error) {
    return str
  }
}

export default {
  '@ai': {
    active: true,
    role: 'comDev',
    prompts: 'TODO',
    execute({data}, fns) {
      data.fns = fns
    },
    getSourceCode({data}) {
      if (data.fns) {
        if (typeof data.fns === 'string') {
          return decodeURIComponent(data.fns)
        } else if (data.fns.code) {
          return decodeURIComponent(data.fns.code)
        }
      }
    }
  },
  '@init': ({data, setAutoRun, isAutoRun, output}) => {
    const autoRun = isAutoRun ? isAutoRun() : false;
    if (autoRun || data.runImmediate) {
      setAutoRun(true);
      data.runImmediate = true;
      output.get('output0').setSchema({type: 'number'});
      data.extraLib = `declare interface IO {outputs: Array<Function>}`
    }
    data.fns = data.fns || (data.runImmediate ? IMMEDIATE_CODE_TEMPLATE : CODE_TEMPLATE);
  },
  async '@inputConnected'({data, output, input}, fromPin, toPin) {
    if (data.fns === CODE_TEMPLATE) {
      output.get('output0').setSchema({type: 'unknown'});
    }
    const schemaList = setInputSchema(toPin.id, fromPin.schema, data, input)
    data.extraLib = await genLibTypes(schemaList)
  },
  async '@inputUpdated'({data, input}, updatePin) {
    const schemaList = setInputSchema(updatePin.id, updatePin.schema, data, input)
    data.extraLib = await genLibTypes(schemaList)
  },
  async '@inputRemoved'({data, input}, removedPin) {
    const schemaList = setInputSchema(removedPin.id, null, data, input)
    data.extraLib = await genLibTypes(schemaList)
  },
  async '@inputDisConnected'({data, input}, fromPin, toPin) {
    const schemaList = setInputSchema(toPin.id, {type: 'null'}, data, input)
    data.extraLib = await genLibTypes(schemaList)
  },
  ':root': [
    {
      title: '添加输入项',
      type: 'Button',
      ifVisible({data}) {
        return !data.runImmediate;
      },
      value: {
        set({input}) {
          const idx = getIoOrder(input);
          const hostId = `input.inputValue${idx}`;
          const title = `参数${idx}`;
          input.add({
            id: hostId,
            title,
            schema: {type: 'follow'},
            deletable: true,
            editable: true
          });
        }
      }
    },
    {
      title: '添加输出项',
      type: 'Button',
      value: {
        set({output}) {
          const idx = getIoOrder(output);
          const hostId = `output${idx}`;
          const title = `输出项${idx}`;
          output.add({
            id: hostId,
            title,
            schema: {
              type: 'unknown'
            },
            editable: true,
            deletable: true
          });
        }
      }
    },
    {
      type: 'code',
      options: ({data, output}) => {
        const option = {
          babel: true,
          comments: COMMENTS,
          theme: 'light',
          minimap: {
            enabled: false
          },
          lineNumbers: 'on',
          eslint: {
            parserOptions: {
              ecmaVersion: '2020',
              sourceType: 'module'
            }
          },
          autoSave: false,
          extraLib: data.extraLib,
          language: 'typescript',
          onBlur: () => {
            updateOutputSchema(output, data.fns);
          }
        };
        return option;
      },
      title: '代码编辑',
      value: {
        get({data}) {
          return data.fns;
        },
        set({data}, fns: any) {
          if (fns === '') return;
          data.fns = fns;
        }
      }
    }
  ]
};