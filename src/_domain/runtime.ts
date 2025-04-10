import axios from "axios";

class NocobaseApi {

  private _models = [
    {
      "id": "users",
      "title": "users",
      "fields": [
          {
              "name": "id",
              "title": "用户ID",
              "type": "integer"
          },
          {
              "name": "nickname",
              "title": "昵称",
              "type": "string"
          },
          {
              "name": "username",
              "title": "用户名",
              "type": "string"
          },
          {
              "name": "email",
              "title": "email",
              "type": "string"
          },
          {
              "name": "phone",
              "title": "手机号码",
              "type": "string"
          },
          {
              "name": "password",
              "title": "密码",
              "type": "string"
          },
          {
              "name": "createdAt",
              "title": "创建时间",
              "type": "string"
          },
          {
              "name": "updatedAt",
              "title": "更新时间",
              "type": "string"
          }
      ],
      "services": [
          {
              "name": "/users:list",
              "title": "/users:list",
              "default": true,
              "method": "get",
              "params": [],
              "returnType": {
                  "type": "object",
                  "properties": {
                      "data": "number"
                  }
              }
          },
          {
              "name": "/users:get",
              "title": "/users:get",
              "default": false,
              "method": "get",
              "params": [
                  {
                      "name": "filterByTk",
                      "title": "user id",
                      "type": "integer"
                  }
              ],
              "returnType": {
                  "type": "object",
                  "properties": {
                      "id": {
                          "type": "integer",
                          "description": "用户ID"
                      },
                      "nickname": {
                          "type": "string",
                          "description": "昵称"
                      },
                      "username": {
                          "type": "string",
                          "description": "用户名"
                      },
                      "email": {
                          "type": "string",
                          "description": "email"
                      },
                      "phone": {
                          "type": "string",
                          "description": "手机号码"
                      },
                      "password": {
                          "type": "string",
                          "description": "密码"
                      },
                      "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "创建时间"
                      },
                      "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "更新时间"
                      }
                  }
              }
          },
          {
              "name": "/users:create",
              "title": "/users:create",
              "default": false,
              "method": "post",
              "params": [
                  {
                      "name": "id",
                      "title": "用户ID",
                      "type": "integer"
                  },
                  {
                      "name": "nickname",
                      "title": "昵称",
                      "type": "string"
                  },
                  {
                      "name": "username",
                      "title": "用户名",
                      "type": "string"
                  },
                  {
                      "name": "email",
                      "title": "email",
                      "type": "string"
                  },
                  {
                      "name": "phone",
                      "title": "手机号码",
                      "type": "string"
                  },
                  {
                      "name": "password",
                      "title": "密码",
                      "type": "string"
                  },
                  {
                      "name": "createdAt",
                      "title": "创建时间",
                      "type": "string"
                  },
                  {
                      "name": "updatedAt",
                      "title": "更新时间",
                      "type": "string"
                  }
              ],
              "returnType": {
                  "type": "object",
                  "properties": {
                      "id": {
                          "type": "integer",
                          "description": "用户ID"
                      },
                      "nickname": {
                          "type": "string",
                          "description": "昵称"
                      },
                      "username": {
                          "type": "string",
                          "description": "用户名"
                      },
                      "email": {
                          "type": "string",
                          "description": "email"
                      },
                      "phone": {
                          "type": "string",
                          "description": "手机号码"
                      },
                      "password": {
                          "type": "string",
                          "description": "密码"
                      },
                      "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "创建时间"
                      },
                      "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "更新时间"
                      }
                  }
              }
          },
          {
              "name": "/users:update",
              "title": "/users:update",
              "default": false,
              "method": "post",
              "params": [
                  {
                      "name": "filterByTk",
                      "title": "user id",
                      "type": "integer"
                  },
                  {
                      "name": "id",
                      "title": "用户ID",
                      "type": "integer"
                  },
                  {
                      "name": "nickname",
                      "title": "昵称",
                      "type": "string"
                  },
                  {
                      "name": "username",
                      "title": "用户名",
                      "type": "string"
                  },
                  {
                      "name": "email",
                      "title": "email",
                      "type": "string"
                  },
                  {
                      "name": "phone",
                      "title": "手机号码",
                      "type": "string"
                  },
                  {
                      "name": "password",
                      "title": "密码",
                      "type": "string"
                  },
                  {
                      "name": "createdAt",
                      "title": "创建时间",
                      "type": "string"
                  },
                  {
                      "name": "updatedAt",
                      "title": "更新时间",
                      "type": "string"
                  }
              ],
              "returnType": {
                  "type": "object",
                  "properties": {
                      "id": {
                          "type": "integer",
                          "description": "用户ID"
                      },
                      "nickname": {
                          "type": "string",
                          "description": "昵称"
                      },
                      "username": {
                          "type": "string",
                          "description": "用户名"
                      },
                      "email": {
                          "type": "string",
                          "description": "email"
                      },
                      "phone": {
                          "type": "string",
                          "description": "手机号码"
                      },
                      "password": {
                          "type": "string",
                          "description": "密码"
                      },
                      "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "创建时间"
                      },
                      "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "更新时间"
                      }
                  }
              }
          },
          {
              "name": "/users:destroy",
              "title": "/users:destroy",
              "default": false,
              "method": "post",
              "params": [
                  {
                      "name": "filterByTk",
                      "title": "role name",
                      "type": "string"
                  }
              ],
              "returnType": {
                  "type": "object",
                  "properties": {
                      "data": "number"
                  }
              }
          }
      ]
    }
  ]

  constructor(private _origin: string, private _token: string) {}

  call(modelId, servicename, params) {
    const service = this._models.find((model) => {
      return model.id === modelId
    })?.services.find((service) => {
      return service.name === servicename
    });

    if (service) {
      return new Promise((resolve, reject) => {
        axios({
          url: this._origin + service.name,
          method: service.method,
          // [TODO] 参数拼接
          // params: {
          //   appends: ["roles"]
          // },
          params: {},
          data: {},
          headers: {
            authorization: `Bearer ${this._token}`,
          }
        }).then(({ data }) => {
          resolve(data);
        }).catch((error) => {
          console.log(error, "error")
          reject(error);
        });
      });
    }

    return "没有选择领域模型服务"
  }
}

const nocobaseApi = new NocobaseApi(
  "https://a_28by899e2h8.v7.demo-cn.nocobase.com/api",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVOYW1lIjoicm9vdCIsImlhdCI6MTc0NDIwMzYxNiwiZXhwIjoxNzQ2Nzk1NjE2fQ.02G6pL88V_v_wNH5WDi-dybOD8USWeG1GBwqQabR9bQ"
)

export default function ({ env, data, inputs }) {
  inputs["call"]((value, relOutputs) => {
    console.log("data => ", data);
    console.log("[TODO:domain] => 调用领域模型", value);
    // env.callDomainModel();
    const result = nocobaseApi.call(data.modelId, data.serviceName, value);

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
