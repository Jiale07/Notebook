<script lang="ts" setup>
import {reactive} from "vue";
import router from "@/router";
import { ElMessage } from "element-plus";
import { SessionStorage } from '@/util/storageTool'


const ruleFrom = reactive({
  username: 'jiale',
  password: '123456',
})


function onLogin() {
  let {username, password} = ruleFrom
  let success = username === 'jiale' && password === '123456'
  return new Promise((resolve, reject)=> {
    if (success) {
      resolve(123)
    } else {
      reject()
    }
  }).then(() => {
    const sessionStorage = new SessionStorage()
    sessionStorage.setItem('user-info', JSON.stringify({name : ruleFrom.username}))
    router.push('/')
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
            prop="username"
          >
            <el-input
              clearable
              placeholder="Please enter the user name"
              v-model.trim="ruleFrom.username"
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



