<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-form-item label="所屬分类">
        <el-select v-model="model.cates" multiple>
          <el-option v-for="item in cates" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="標題">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="詳情">
        <vue-editor v-model="model.content"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      cates: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else if (this.model.title != undefined) {
        console.log(this.model.title);
        res = await this.$http.post("rest/articles", this.model);
      } else {
        this.$message({
          type: "error",
          message: "姓名不能为空"
        });
        return false;
      }
      console.log(this.model);
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCates() {
      const res = await this.$http.get(`rest/cate`);
      this.cates = res.data;
    }
  },
  components: {
    VueEditor
  },
  created() {
    this.fetchCates();
    this.id && this.fetch();
  }
};
</script>