<template>
    <div id="app">
        <el-container style="height: 100vh;position: fixed;width: 100%">
            <el-aside
                    v-if="aside"
                    type="flex"
                    style="width: fit-content;"
                    @mouseover="isCollapse = false"
                    @mouseleave="isCollapse = true"
            >

                <el-menu
                        default-active="2"
                        :collapse="table"
                        style="height: 100%"
                        class="cord-body"
                        expand-close-icon
                        expand-open-icon
                        :close-on-click-outside="true"
                >
                    <el-row>
                        <el-col
                                v-if="table"
                        >
                            <el-icon size="25" @click="table = false" ><Expand /></el-icon>
                        </el-col>
                        <el-col
                                v-if="!table"
                        >
                            <el-icon size="25" @click="table = true" ><Fold /></el-icon>
                        </el-col>
                    </el-row>

                    <el-menu-item index="1" @click="router.push('/')">
                        <el-icon><location /></el-icon>
                        <template #title>
                            <el-text size="large" >端口</el-text>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="1" @click="router.push('/about')">
                        <el-icon><Reading /></el-icon>
                        <template #title>
                            <el-text size="large" >关于</el-text>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="1" @click="router.push('/logs')">
                        <el-icon><EditPen /></el-icon>
                        <template #title>
                            <el-text size="large" >日志</el-text>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="1" @click="router.push('/logs')">
                        <el-icon><Setting /></el-icon>
                        <template #title>
                            <el-text size="large" >设置</el-text>
                        </template>
                    </el-menu-item>
                </el-menu>

            </el-aside>
            <el-container>

                <el-main>
                    <router-view/>
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {onMounted, ref} from 'vue'
import {Location,Expand,Fold,Reading,EditPen,Setting} from '@element-plus/icons-vue'

const isCollapse = ref(true)
let table = ref(false)
const aside = ref(true)
const body = ref(null);
const small = ref(false)
const router = useRouter()
router.push('/')
onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
})

const handleResize=() => {
    const element:any = body.value;
    const elementWidth: number = element?.clientWidth;
    if (elementWidth <= 800) {
        table.value = true;
        aside.value = false;
        small.value = true;
    }
    if (elementWidth >= 800){
        table.value = false;
        aside.value = true;
        small.value = false
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
#container{
    padding:0;
    margin: 0;
    width: 100%;
    height: 400px;
}

.cord-body [aside] {
    background: rgba(255, 255, 255, 0.65);
    padding: 12px;
    height: 100%;
}

.cord-body {
    background: rgba(255, 255, 255, 0.65);
    padding: 12px;
}

.percentage-value {
    display: block;
    margin-top: 10px;
    font-size: 28px;
}
.percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
}
.demo-progress .el-progress--line {
    margin-bottom: 15px;
    max-width: 600px;
}
.demo-progress .el-progress--circle {
    margin-right: 15px;
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
.left-tip-level-2 {
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 2px;
    border-radius: 2px;
    color: #40ffe2;
    background-color: #40ffe2;
    height: 14px;
    width: 6px;
    vertical-align: middle;
}
</style>
