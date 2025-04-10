class Domain {
  // private _models = [
  //   {
  //     id: 'd0',
  //     title: '学生',
  //     fields: [
  //       {
  //         name: 'name',
  //         title: '姓名',
  //         type: 'string'
  //       },
  //       {
  //         name: 'age',
  //         title: '年龄',
  //         type: 'number'
  //       }
  //     ],
  //     services: [
  //       {
  //         name: 'getStudent',
  //         title: '查询',
  //         default: true,
  //         params: [
  //           {
  //             name: 'name',
  //             title: '姓名',
  //             type: 'string'
  //           }
  //         ],
  //         returnType: {
  //           type: 'array',
  //           items: {
  //             type: 'object',
  //             properties: {
  //               id: {
  //                 type: 'string'
  //               },
  //               name: {
  //                 type: 'string'
  //               },
  //               age: {
  //                 type: 'number'
  //               }
  //             }
  //           }
  //         }
  //       },
  //       {
  //         name: 'deleteStudent',
  //         title: '删除',
  //         params: [
  //           {
  //             name: 'name',
  //             title: '姓名',
  //             type: 'string'
  //           }
  //         ],
  //         returnType: {
  //           type: 'number'
  //         }
  //       }
  //     ]
  //   }
  // ]

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

  private _modelMap = new Map();

  constructor() {
    const { _modelMap } = this;
    this._models.forEach((model) => {
      _modelMap.set(model.id, model);
    })
  }

  /** 获取模型 */
  getModel(modelId) {
    return this._modelMap.get(modelId);
  }

  /** 获取领域模型选项 */
  getModelOptions() {
    return this._models.map((model) => {
      return {
        label: model.title,
        value: model.id,
      }
    })
  }

  /** 通过领域模型ID获取领域模型服务 */
  getServiceOptionsByModelId(modelId) {
    return this._modelMap.get(modelId)?.services.map((service) => {
      return {
        label: service.title,
        value: service.name,
      }
    }) || [];
  }

  /** 通过领域模型ID获取默认的领域模型服务 */
  getDefaultServiceNameByModelId(modelId) {
    return this._modelMap.get(modelId)?.services.find((service) => {
      return service.default;
    })?.name;
  }
}

const domain = new Domain();

export default {
  '@init': ({ data, setDesc }) => {
    console.log("[TODO:domain] => @init初始化根据dara信息设置Desc", data);
    // [TODO] 根据data信息设置Desc
    setDesc(`（领域模型为空）`);
  },
  ':root': [
    {
      title: "领域模型选择",
      type: "_domainModelSelect",
      //options: domain.getModelOptions(),
      value: {
        get({ data }) {
          // return data.modelId;
          return data.model;
        },
        set({ data, setDesc }, model) {
          console.log("value => ", model);
          // debugger
          data.model = model;
          


          // const {name,title,params,returnType} = service////TODO

          // data.modelId = modelId;
          // const defaultServiceName = domain.getDefaultServiceNameByModelId(modelId);
          // data.serviceName = defaultServiceName;
          // const model = domain.getModel(modelId)
          setDesc(`已选择：${model.title}`);
        },
      },
    },
    {
      title: "领域模型服务选择",
      ifVisible({ data }) {
        return !!domain.getServiceOptionsByModelId(data.modelId).length;
      },
      type: "select",
      options: ({ data }) => {
        return domain.getServiceOptionsByModelId(data.modelId);
      },
      value: {
        get({ data }) {
          return data.serviceName;
        },
        set({ data }, serviceName) {
          data.serviceName = serviceName;
        },
      },
    },
  ],
};
