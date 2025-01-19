export const CODE_TEMPLATE = encodeURIComponent(`({ outputs, inputs }) => {
  const [ in0 ] = inputs;//输入的数据
  const [ out0 ] = outputs;//输出项
  
  out0(in0);//从输出项输出结果
}`);

export const IMMEDIATE_CODE_TEMPLATE = encodeURIComponent(`({ outputs }) => {
  const [ out0 ] = outputs;
  out0(0);
}`);

export const COMMENTS = `/**
* @parma inputs: any[] 输入项
* @parma outputs: any[] 输出项
*
* 例子
* ({ inputs, outputs }) => {
*   const [ in0 ] = inputs;
*   const [ out0, out1, out2 ] = outputs;
*   const res = '该值输出给下一个组件使用' + in0
*   
*   // 向输出项（out0）输出结果
*   out0(res); 

*   // 多输出的情况
*   // 向输出项（out1）输出输入项0的值
*   // out1(in0); 
* }
*/`;

export interface Data {
  transformCode: string;
  fnParams: string[];
  fnBody: string;
  fns: any;
  runImmediate: boolean;
  inputSchema?: Object
  extraLib?: string
}