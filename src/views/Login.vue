<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Ego商城后台管理系统</span>
      </div>
      <el-tabs v-model="currentIndex" @tab-click="handleTabsClick" stretch>
        <el-tab-pane label="登陆" name="login">
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="80px"
            class="demo-loginForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >登陆</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form
            :model="registerForm"
            status-icon
            :rules="rules"
            ref="registerForm"
            label-width="80px"
            class="demo-registerForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="registerForm.username"> </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="configurePassword">
              <el-input
                type="password"
                v-model="registerForm.configurePassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input type="text" v-model="registerForm.email" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('registerForm')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import api from "../api";
import { mapMutations } from "vuex";
export default {
  data() {
    //验证规则
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value.length < 4) {
        callback(new Error("用户名长度不够"));
      } else {
        callback();
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateConfigurePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      currentIndex: "login",
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        configurePassword: "",
        email: "",
      },

      activeTab: "login",
      rules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePassWord, trigger: "blur" }],
        configurePassword: [
          { validator: validateConfigurePassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations("login", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.activeTab === "login") {
            // 登陆
            api.login(this.loginForm).then((res) => {
              if (res.data.status === 200) {
                this.setUser(res.data);
                localStorage.setItem("ego", JSON.stringify(res.data));
                this.$router.push("/");
              } else {
                const h = this.$createElement;
                this.$notify({
                  title: "登陆失败",
                  message: h("i", "用户名密码错误"),
                });
              }
            });
          }
          if (this.activeTab === "register") {
            api.register(this.registerForm).then((res) => {
              if (res.data.status === 200) {
                const h = this.$createElement;
                this.$notify({
                  title: "注册成功",
                  message: h("i", "请前往登陆页面登陆"),
                });
              } else {
                const h = this.$createElement;
                this.$notify({
                  title: "注册失败",
                  message: h("i", "请重新注册"),
                });
              }
            });
          }
        } else {
          return;
        }
      });
    },
    handleTabsClick(tab) {
      this.activeTab = tab.name;
    },
  },
};
</script>

<style scoped lang="less">
.login {
  width: 1200px;
  margin: 0 auto;
  .box-card {
    width: 600px;
    margin: 100px auto;
  }
}
</style>