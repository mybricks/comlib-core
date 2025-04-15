export default {
  '@init': ({ setDesc }) => {
    setDesc(`（领域模型为空）`);
  },
  "@domainModel": {
    get({ data }) {
      return data.model;
    },
    set({ data, setDesc }, model) {
      data.model = model;
      setDesc(`已选择：${model.title}`);
    },
  },
  ':root': [],
};
