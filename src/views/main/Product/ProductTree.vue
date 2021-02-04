<template>
  <div>
    <el-tree
      :load="loadNode"
      :props="defaultProps"
      @node-click="handleNodeClick"
      lazy
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },

  methods: {
    handleNodeClick(data) {
       //console.log(data.name);
       this.$emit("onTree",data)
    },
    loadNode(node, resolve) {
      // console.log(node);
      // 第一层数据
      if (node.level === 0) {
        this.$api.selectItemCategoryByParentId().then((res) => {
          if (res.data.status === 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
      // 后续展开数据
      if (node.level >= 1) {
        this.$api
          .selectItemCategoryByParentId({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.data.status === 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          })
          .catch((error) => {
            resolve([]);
          });
      }
    },
  },
};
</script>

<style>
</style>