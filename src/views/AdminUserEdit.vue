<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        console.log(this.model.name);
        res = await this.$http.post("rest/admin_users", this.model);
      }
      console.log(this.model);
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>