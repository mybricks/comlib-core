export default function ({ env, data, inputs }) {
  inputs["call"]((value, relOutputs) => {
    console.log("_domain data => ", data);

    if (!data.model) {
      relOutputs["catch"]("没有选择领域模型");
      return;
    }

    // 临时测试
    env.callDomainModel({
      // 模型信息
      model: {
        // 模型ID
        modelId: data.model.id,
        // 服务名称
        serviceName: data.model.service.name,
      },
      // 参数
      params: value,
      configs: {
        callType: "call", // "register"
      }
    }, (error, output) => {
      if (error) {
        relOutputs["catch"](error);
      } else {
        relOutputs["then"](output);
      }
    });
  });
};
