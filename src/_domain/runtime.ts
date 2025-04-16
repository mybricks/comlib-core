export default function ({ env, data, inputs }) {
  inputs["call"]((value, relOutputs) => {
    if (!data.model) {
      relOutputs["catch"]("没有选择领域模型");
      return;
    }

    if (!env.callDomainModel) {
      relOutputs["catch"]("未实现env.callDomainModel");
      return;
    }

    // 临时测试
    env.callDomainModel({
      // 模型信息
      model: data.model,
      // 参数
      params: value,
      configs: {
        callType: "call",
      }
    }, (error, loading, output) => {
      if (loading) {
        return
      }
      if (error) {
        relOutputs["catch"](error);
      } else {
        relOutputs["then"](output);
      }
    });
  });
};
