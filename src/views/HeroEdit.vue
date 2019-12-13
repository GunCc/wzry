<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="頭像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="稱號">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="類型">
            <el-select v-model="model.cates" multiple>
              <el-option v-for="item of cates" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="難度">
            <el-rate
              :max="9"
              style="margin-top:0.65rem"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9" style="margin-top:0.65rem" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻擊">
            <el-rate :max="9" style="margin-top:0.65rem" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9" style="margin-top:0.65rem" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="順風出裝">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆風出裝">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="對抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="團戰思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :lg="6" :md="12" v-for="(item,index) in model.skills" :key="index">
              <el-form-item label="名稱">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="圖標">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res=> $set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.desc"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(index,1)">刪除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem">
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
      cates: [],
      items: [],
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0
        }
      }
    };
  },
  methods: {
    afterUpload(res) {
      console.log(res);
      this.$set(this.model, "avatar", res.url);
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heros/${this.id}`, this.model);
      } else if (this.model.name != undefined) {
        console.log(this.model.name);
        res = await this.$http.post("rest/heros", this.model);
      } else {
        this.$message({
          type: "error",
          message: "姓名不能为空"
        });
        return false;
      }
      console.log(this.model);
      this.$router.push("/heros/list");
      this.$message({
        type: "success",
        message: "成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCate() {
      const res = await this.$http.get(`rest/cate`);
      this.cates = res.data;
    },
    async fetchItem() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    }
  },
  created() {
    this.fetchItem();
    this.fetchCate();
    this.id && this.fetch();
  }
};
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}

.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>