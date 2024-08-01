
<template>
    <el-row>
        <el-col>
            <el-card class="cord-body">
                <div class="box-card-title-wrapper">
                    <div class="box-card-title">
                        <span class="left-tip"></span>
                        <el-text size="large">日志管理</el-text>
                    </div>
                </div>
                <el-row>
                    <el-col
                            :xs="{ span: 12}"
                            :sm="{ span: 12}"
                            :md="{ span: 12}"
                            :lg="{ span: 12}"
                    >
                        <el-autocomplete
                                v-model="input"
                                clearable
                                style="width: 98%;"
                                popper-class="my-autocomplete"
                                placeholder="检索栏"
                        >

                        </el-autocomplete>

                    </el-col>

                    <el-col
                            :xs="{ span: 3}"
                            :sm="{ span: 3}"
                            :md="{ span: 3}"
                            :lg="{ span: 3}"
                    >
                        <el-button type="primary" @click="">
                            <el-icon><Search /></el-icon>
                            <el-text size="large">搜索</el-text>
                        </el-button>
                    </el-col>

                    <el-col
                            :xs="{ span: 9,push:2}"
                            :sm="{ span: 9,push:2}"
                            :md="{ span: 9,push:2}"
                            :lg="{ span: 9,push:2}"
                    >
                        <el-button-group>
                            <el-button type="success" >
                                <el-icon><Plus /></el-icon>
                                <el-text size="large">新增记录</el-text>
                            </el-button>
                            <el-button type="danger" :disabled="true">
                                <el-icon><DeleteFilled /></el-icon>
                                <el-text size="large">删除记录</el-text>
                            </el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="8">
                    <el-col :span="24">
                        <el-scrollbar ref="scrollbar" height="305px" >
                            <div v-for="(msg, index) in logsList" :key="index" style="margin-bottom: 15px" :class="'receive-box'">
                                <el-row  v-if="msg.length > 1">
                                    <el-col :span="24">
                                        <el-card class="box-card-body" :class="'receive-card' ">
                                            <el-row>
                                                <el-col :span="24">
                                                    <el-text :class="'receive-message'" >
                                                        {{ msg }}
                                                    </el-text>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-scrollbar>

                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>

</template>

<script setup>
import {ElMessage} from "element-plus";
import {Location,Expand,Fold,Search,Promotion,Refresh,Delete,CloseBold,DeleteFilled,Check,Close,EditPen,Reading,Plus} from '@element-plus/icons-vue'
const { contextBridge } = require('electron');
import {onMounted, ref} from 'vue';
const { ipcRenderer } = require('electron');
const logs = ref('');
const logsDeta = ref([])
const logsList = ref([])
const getLogs = async (deta) => {
    let data = await ipcRenderer.invoke('get-logs',deta)
    logs.value = data
    console.log(logs.value)
    logsList.value = data.toString().split('\n');
    ElMessage.success('日志获取成功');
}

const getLogDeta = async () => {
    logsDeta.value = await ipcRenderer.invoke('list-log-dates')
    console.log(logsDeta.value)
}
onMounted( async () => {
    await getLogDeta();
    await getLogs(logsDeta.value[logsDeta.value.length - 1]);


})

</script>

<style scoped>
textarea {
    width: 100%;
    height: 100px;
}
.box-card-title {
    font-weight: 600;
    font-size: 14px;
}

.box-card-title-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
}

.left-tip {
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 2px;
    border-radius: 2px;
    color: #409eff;
    background-color: #409eff;
    height: 14px;
    width: 6px;
    vertical-align: middle;
}
.left-text {
    text-align: left;
}

.right-text {
    text-align: right;
}

.send-card {
    border: 1px solid blue;
    max-width: 400px;
    overflow: auto;
    background-color: #e6f7ff;
    margin-bottom: 10px;
    border-radius: 5px;
    text-align: right;
}

.receive-card {
    border: 1px solid green;
    max-width: 400px;
    overflow: auto;
    background-color: #f6ffed;
    margin-bottom: 10px;
    border-radius: 5px;
    text-align: left;
}

.send-box {
    display: flex;
    justify-content: flex-end; /* 将消息容器内的内容靠右对齐 */
    margin-bottom: 15px; /* 设置每条消息之间的间距 */
    width: 100%; /* 确保每条消息占据整行 */
}

.receive-box {
    display: flex;
    justify-content: flex-start; /* 将消息容器内的内容靠右对齐 */
    margin-bottom: 15px; /* 设置每条消息之间的间距 */
    width: 100%; /* 确保每条消息占据整行 */
}

.send-message {
    text-align: right;
    padding: 10px;
}

.receive-message {
    text-align: left;
    padding: 10px;
}

.timestamp-left {
    float: left;
    text-align: left;
    font-size: 12px;
    color: #999;
}

.timestamp-right {
    float: right;
    text-align: right;
    font-size: 12px;
    color: #999;
}
</style>