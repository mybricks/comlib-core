export default function ({ env, data, inputs }) {
  inputs["call"]((inputValue, relOutputs) => {
    if (!env?.getBusData) {
      relOutputs["catch"]("未实现env.getBusData");
      return;
    }
    env.getBusData('user', inputValue)?.then?.((result) => {
      relOutputs["then"](result);
    }).catch((error) => {
      relOutputs["catch"](error);
    })
  });
};
