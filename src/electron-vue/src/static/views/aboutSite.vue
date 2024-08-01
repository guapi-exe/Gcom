<script setup lang="ts">

</script>

<template>
    <el-row type="flex" justify="center" align="middle">
        <el-col
                :xs="{ span: 24}"
                :sm="{ span: 12}"
                :md="{ span: 6}"
                :lg="{ span: 6}"
        >
            <h1 slot="header" class="title" style="text-align: center;font-size: 30px">
                前端技术栈
            </h1>

        </el-col>
    </el-row>

    <el-row type="flex" justify="center" align="middle">
        <el-col
                :xs="{ span: 24}"
                :sm="{ span: 12}"
                :md="{ span: 6}"
                :lg="{ span: 3}"
        >
            <el-space direction="vertical">
                <el-image type="image/svg+xml" src="https://vitejs.cn/vite3-cn/logo.svg" style="width: 100px;height: 100px"></el-image>
                <h2>VITE</h2>
            </el-space>

        </el-col>

        <el-col
                :xs="{ span: 24}"
                :sm="{ span: 12}"
                :md="{ span: 6}"
                :lg="{ span: 3}"
        >
            <el-space direction="vertical">
                <el-image src="https://new.xem8k5.top:1080/static/assets/svg/vue.svg" type="image/svg+xml" style="width: 100px;height: 100px">
                </el-image>
                <h2>VUE</h2>
            </el-space>

        </el-col>
        <el-col
                :xs="{ span: 24}"
                :sm="{ span: 12}"
                :md="{ span: 6}"
                :lg="{ span: 3}"
        >
            <el-space direction="vertical">
                <el-image type="image/svg+xml" src="https://element-plus.org/images/element-plus-logo.svg">

                </el-image>
                <h2>Element Plus</h2>
            </el-space>

        </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
        <el-col
                :xs="{ span: 24}"
                :sm="{ span: 12}"
                :md="{ span: 6}"
                :lg="{ span: 6}"
        >
            <h1 slot="header" class="title" style="text-align: center;font-size: 30px">
                后端技术栈
            </h1>

        </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
        <el-col
                :xs="{ span: 3}"
                :sm="{ span: 3}"
                :md="{ span: 3}"
                :lg="{ span: 3}"
        >
            <el-space direction="vertical">
                <el-image type="image/svg+xml" src="https://www.electronjs.org/zh/assets/img/logo.svg" style="width: 160px;height: 100px"></el-image>
                <h2>Electron</h2>
            </el-space>

        </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
        <el-col
                :xs="{ span: 24}"
                :sm="{ span: 12}"
                :md="{ span: 6}"
                :lg="{ span: 6}"
        >
            <h1 slot="header" class="title" style="text-align: center;font-size: 30px">
                贡献者
            </h1>

        </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
        <el-col
                :xs="{ span: 24}"
                :sm="{ span: 12}"
                :md="{ span: 6}"
                :lg="{ span: 6}"
        >
            <h1 slot="header" class="title" style="text-align: center;font-size: 25px">
                <el-avatar src="https://q1.qlogo.cn/g?b=qq&nk=3051016381&s=100"></el-avatar>Guapi
            </h1>

        </el-col>
    </el-row>

</template>

<style scoped lang="css">

</style>