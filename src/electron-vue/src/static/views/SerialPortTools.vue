<template xmlns:el-col="http://www.w3.org/1999/html">
    <el-row :gutter="8">
        <el-col :xs="{ span: 24}"
                :sm="{ span: 24}"
                :md="{ span: 15}"
                :lg="{ span: 15}"
        >
            <el-card class="cord-body" style="height: 500px">
                <div class="box-card-title-wrapper">
                    <div class="box-card-title">
                        <span class="left-tip"></span>
                        <el-text size="large">控制台</el-text>
                    </div>
                </div>
                <el-row :gutter="8">
                    <el-col :span="24">
                        <el-scrollbar ref="scrollbar" height="305px" >
                            <div v-for="(msg, index) in mergedMessages" :key="index" style="margin-bottom: 15px" :class="msg.send ? 'receive-box' : 'send-box'">
                                <el-row>
                                    <el-col :span="24">
                                        <el-card class="box-card-body" :class="msg.send ? 'receive-card' : 'send-card'">
                                            <el-row>
                                                <el-col :span="24">
                                                    <el-text :class="msg.send ? 'receive-message' : 'send-message'">
                                                        端口:{{selectedPort}}
                                                    </el-text>
                                                </el-col>

                                                <el-divider></el-divider>
                                                <el-col :span="24">
                                                    <el-text :class="msg.send ? 'receive-message' : 'send-message'" v-html="msg.message.replace(/\n/g, '<br>')">
                                                    </el-text>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="24" v-if="enableTime">
                                        <el-row :class="msg.send ? 'timestamp-left' : 'timestamp-right'">
                                            <el-text :class="msg.send ? 'timestamp-left' : 'timestamp-right'">
                                                {{ msg.time }}
                                            </el-text>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </div>

                        </el-scrollbar>

                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-col
                            :span="20"
                    >
                        <el-autocomplete
                                v-model="message"
                                clearable
                                style="width: 98%;"
                                popper-class="my-autocomplete"
                                placeholder="发送数据"
                        >

                        </el-autocomplete>

                    </el-col>

                    <el-col
                            :span="4"
                    >
                        <el-button type="primary" @click="sendMessage">
                            <el-icon><Promotion /></el-icon>
                            <el-text size="large">发送消息</el-text>
                        </el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="height: 15px"></el-col>
                    <el-switch
                            v-model="antoScrollbar"
                            active-text="自动滚动"
                            class="mt-2"
                            style="margin-left: 24px"
                            :active-action-icon="Check"
                            :inactive-action-icon="Close"
                    />
                    <el-switch
                            v-model="enableTime"
                            active-text="显示时间戳"
                            class="mt-2"
                            style="margin-left: 24px"
                            :active-action-icon="Check"
                            :inactive-action-icon="Close"
                    />
                    <el-switch
                            v-model="enableWrap"
                            active-text="自动换行"
                            class="mt-2"
                            style="margin-left: 24px"
                            :active-action-icon="Check"
                            :inactive-action-icon="Close"
                    />
                </el-row>

            </el-card>
        </el-col>
        <el-col
                :xs="{ span: 24}"
                :sm="{ span: 24}"
                :md="{ span: 9}"
                :lg="{ span: 9}"
        >
            <el-card class="cord-body" style="height: 500px">
                <div class="box-card-title-wrapper">
                    <div class="box-card-title">
                        <span class="left-tip"></span>
                        <el-text size="large">设置</el-text>
                    </div>
                </div>
                <el-row>
                    <el-col :span="18">
                        <el-select
                                v-model="selectedPort"
                                placeholder="选择串口"
                                :size="'default'"
                                style="width: 90%"
                        >
                            <el-option
                                    v-for="port in ports"
                                    :key="port.path"
                                    :label="port.path"
                                    :value="port.path"
                            />
                        </el-select>

                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="listPorts()">
                            <el-icon><Refresh /></el-icon>
                            <el-text size="large">刷新串口</el-text>
                        </el-button>
                    </el-col>
                    <el-divider></el-divider>
                    <el-col :span="24">
                        <el-row>
                            <el-col :span="6">
                                <el-text size="large">波特率:</el-text>
                            </el-col>
                            <el-col :span="18">
                                <el-select
                                        v-model="baudRate"
                                        placeholder="选择波特率"
                                        :size="'default'"
                                        style="width: 90%"
                                >
                                    <el-option
                                            v-for="port in baudRates"
                                            :key="port"
                                            :label="port"
                                            :value="port"
                                    />
                                </el-select>
                            </el-col>

                            <el-col :span="24" style="height: 8px"></el-col>

                            <el-col :span="6">
                                <el-text size="large">数据位:</el-text>
                            </el-col>
                            <el-col :span="18">
                                <el-select
                                        v-model="datas"
                                        placeholder="选择数据位"
                                        :size="'default'"
                                        style="width: 90%"
                                >
                                    <el-option
                                            v-for="port in dataRates"
                                            :key="port"
                                            :label="port"
                                            :value="port"
                                    />
                                </el-select>
                            </el-col>

                            <el-col :span="24" style="height: 8px"></el-col>

                            <el-col :span="6">
                                <el-text size="large">校验位:</el-text>
                            </el-col>
                            <el-col :span="18">
                                <el-select
                                        v-model="CheckBit"
                                        placeholder="选择校验位"
                                        :size="'default'"
                                        style="width: 90%"
                                >
                                    <el-option
                                            v-for="port in CheckBits"
                                            :key="port"
                                            :label="port"
                                            :value="port"
                                    />
                                </el-select>
                            </el-col>

                            <el-col :span="24" style="height: 8px"></el-col>

                            <el-col :span="6">
                                <el-text size="large">停止位:</el-text>
                            </el-col>
                            <el-col :span="18">
                                <el-select
                                        v-model="stopBit"
                                        placeholder="选择校验位"
                                        :size="'default'"
                                        style="width: 90%"
                                >
                                    <el-option
                                            v-for="port in stopBits"
                                            :key="port.toString()"
                                            :label="port.toString()"
                                            :value="port"
                                    />
                                </el-select>
                            </el-col>

                            <el-col :span="24" style="height: 8px"></el-col>

                            <el-col :span="6">
                                <el-text size="large">流控位:</el-text>
                            </el-col>
                            <el-col :span="18">
                                <el-select
                                        v-model="flowControl"
                                        placeholder="选择流控位"
                                        :size="'default'"
                                        style="width: 90%"
                                >
                                    <el-option
                                            v-for="port in flowControls"
                                            :key="port.toString()"
                                            :label="port.toString()"
                                            :value="port"
                                    />
                                </el-select>
                            </el-col>

                            <el-col :span="24" style="height: 16px"></el-col>
                            <el-col :span="12">
                                <el-button type="warning" @click="closePorts()">
                                    <el-icon><CloseBold /></el-icon>
                                    <el-text size="large">关闭串口</el-text>
                                </el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button type="warning" @click="clearData()">
                                    <el-icon><DeleteFilled /></el-icon>
                                    <el-text size="large">清除接收</el-text>
                                </el-button>
                            </el-col>
                            <el-col :span="24" style="height: 15px;"></el-col>
                            <el-col :span="12">
                                <el-button type="primary" @click="closePorts()">
                                    <el-icon><EditPen /></el-icon>
                                    <el-text size="large">编写脚本</el-text>
                                </el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button type="primary" @click="router.push('/about')">
                                    <el-icon><Reading /></el-icon>
                                    <el-text size="large">有关帮助</el-text>
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-col>

                </el-row>
            </el-card>

        </el-col>
    </el-row>

</template>

<script setup>
import {ref, onMounted, watch, watchEffect, onBeforeUnmount} from 'vue';
import { computed } from 'vue'
const { ipcRenderer } = require('electron');
import {Location,Expand,Fold,Search,Promotion,Refresh,Delete,CloseBold,DeleteFilled,Check,Close,EditPen,Reading} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import { useRouter } from "vue-router";

const enablePort = ref(false);
const enableTime = ref(true)
const antoScrollbar = ref(true)
const enableWrap = ref(true)
const ports = ref([]);
const selectedPort = ref('');
const baudRate = ref(115200);
const message = ref('');
const receivedData = ref([]);
const router = useRouter()
const baudRates = ref([
    300,
    1200,
    2400,
    4800,
    9600,
    19200,
    38400,
    57600,
    74880,
    115200,
    230400,
    250000,
    500000,
    1000000,
    2000000,
])
const dataRates = ref([
        5,
        6,
        7,
        8
])
const CheckBit = ref("None");
const CheckBits = ref([
    "None",
    "Even",
    "Odd",
    "Space",
    "Mark",
])
const datas = ref(8)
const stopBit = ref(1)
const stopBits = ref([
        1,
        1.5,
        2,
])
const scrollbar = ref(null);
const flowControl = ref(false)
const flowControls = ref([
    'xon',
    'xoff',
    'xany',
    'rtscts',
    false
])

const mergedMessages = computed(() => {
    const groups = [];
    let currentMsg = null;
    let currentTime = '';

    console.log(receivedData.value)
    receivedData.value.forEach((msg) => {
        msg.message = msg.message.replace("\n",'<br>')
        if (msg.time === currentTime) {
            if(!currentMsg){
                currentMsg = msg
            }else {
                currentMsg.message += msg.message
            }
            console.log(receivedData.value.indexOf(msg))
            console.log(receivedData.value.length)
            if(receivedData.value.indexOf(msg) === receivedData.value.length -1) groups.push(currentMsg)
            console.log(currentMsg.message)
        }else {
            if(currentMsg) groups.push(currentMsg)
            else {
                currentMsg = msg
                groups.push(currentMsg)
            }
            console.log(currentMsg.message)
            currentMsg = null
        }
        currentTime = msg.time
        console.log(groups)
    });


    return groups;
});

const listPorts = async () => {
    ports.value = await ipcRenderer.invoke('list-ports');
    ElMessage.success('刷新完毕');
};

const clearData = async () => {
    ports.value = await ipcRenderer.invoke('clear-data');
    receivedData.value = [];
    ElMessage.success('清除完毕');
};

const closePorts = async () => {
    ports.value = await ipcRenderer.invoke('close-ports');
    enablePort.value = false;
    ElMessage.error(`端口关闭${selectedPort.value}`);
    selectedPort.value = '';
};

const setPorts = async () => {
    await ipcRenderer.invoke('set-port', baudRate.value, datas.value, CheckBit.value, stopBit.value, flowControl.value);
};

const openPort = async () => {
    await ipcRenderer.invoke('open-port', selectedPort.value, baudRate.value);
};

const sendMessage = () => {
    ipcRenderer.invoke('send-data', message.value);
    message.value = '';
};

const handleSerialData = (event, data) => {
    receivedData.value = data;
    if (scrollbar.value && antoScrollbar.value) {
        scrollbar.value.wrapRef.scrollTo({
            top: scrollbar.value.wrapRef.scrollHeight - 50,
            behavior: 'smooth',
        });
    }
};

const handleSetData = () => {
    ElMessage.success('数据更新完毕');
};

const handleSerialOpen = () => {
    ElMessage.success(`端口已开启:${selectedPort.value}`);
    enablePort.value = true;
};

const handleSerialClose = () => {
    ElMessage.error(`端口关闭${selectedPort.value}`);
    enablePort.value = false;
    selectedPort.value = '';
};

const handleSerialError = (event, data) => {
    ElMessage.error(`意外错误${selectedPort.value}err${data}`);
    selectedPort.value = '';
};

onMounted(() => {
    listPorts();
    if (selectedPort.value.length !== 0) {
        closePorts();
        enablePort.value = false;
    }
    ipcRenderer.on('serial-data', handleSerialData);
    ipcRenderer.on('set-data', handleSetData);
    ipcRenderer.on('serial-open', handleSerialOpen);
    ipcRenderer.on('serial-close', handleSerialClose);
    ipcRenderer.on('serial-error', handleSerialError);
});

onBeforeUnmount(() => {
    ipcRenderer.removeListener('serial-data', handleSerialData);
    ipcRenderer.removeListener('set-data', handleSetData);
    ipcRenderer.removeListener('serial-open', handleSerialOpen);
    ipcRenderer.removeListener('serial-close', handleSerialClose);
    ipcRenderer.removeListener('serial-error', handleSerialError);
});

watch(selectedPort, async (newPort) => {
    if (newPort) {
        await openPort();
    }
});

watch(baudRate, async (newBaudRate) => {
    if (newBaudRate) {
        await setPorts();
    }
});
watch(datas, async (newDatas) => {
    if (newDatas) {
        await setPorts();
    }
});
watch(CheckBit, async (newCheckBit) => {
    if (newCheckBit) {
        await setPorts();
    }
});
watch(stopBit, async (newStopBit) => {
    if (newStopBit) {
        await setPorts();
    }
});
watch(flowControl, async (newFlowControl) => {
    if (newFlowControl) {
        await setPorts();
    }
});
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
