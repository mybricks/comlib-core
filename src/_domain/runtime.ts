export default function ({ env, data, inputs }) {
  inputs["call"]((value, relOutputs) => {
    console.log("_domain data => ", data);
    const result = env.callDomainModel(data.modelId, data.serviceName, value);

    if (typeof result === "string") {
      relOutputs["catch"](result)
    } else {
      result.then((data) => {
        relOutputs["then"](data);
      }).catch((error) => {
        relOutputs["catch"](error);
      })
    }
  });
};
