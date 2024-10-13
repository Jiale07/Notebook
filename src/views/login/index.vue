<script lang="ts" setup>
import {reactive} from "vue";
import router from "@/router";
import { ElMessage } from "element-plus";
import {login} from "@/axios/modules/user";

const ruleFrom = reactive({
  account: 'admin',
  password: '123456',
})


function onLogin() {
  let {account, password} = ruleFrom
  return login({account, password}).then(res => {
    let {code, message} = res
    if (code === 200) {
      router.push('/')
    } else {
      ElMessage.warning(message)
    }
  }).catch(err => {
    ElMessage.error(err || '登录失败，请稍后重试')
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div>
        <el-form class="form-box">
          <el-form-item
            prop="phone"
          >
            <el-input
              clearable
              placeholder="Please enter the user name"
              v-model.trim="ruleFrom.account"
            >
            </el-input>
          </el-form-item>
          <el-form-item
              prop="password"
          >
            <el-input
                clearable
                placeholder="Please enter the password"
                v-model.trim="ruleFrom.password"
            >
            </el-input>
          </el-form-item>
          <el-button type="primary" @click="onLogin">login</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.login-box {
  margin-top: 30px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-box {
  width: 300px;
  height: 280px;
  background-color: #fff;
  border: 1px solid #039BD2;
  border-radius: 15px;
  padding: 10px;
  text-align: center;
}
</style>



