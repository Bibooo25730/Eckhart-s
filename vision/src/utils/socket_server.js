export default class SocletServer {
    // 单例
    static instance = null;
    static get Instance() {
        if (!this.instance) {
            this.instance = new SocletServer()
        }
        return this.instance
    }
    ws = null;

    // 存储回调函数
    callBackMapping = {};
    // 标识是否连接成功
    connected = false;
    // 记录重试的次数
    sendRetryCont = 0;
    // 重新连接尝试的次数
    connectRetryCont = 0;
    // 定义连接服务器的方法
    connect() {
        if (!window.WebSocket) {
            return console.log('浏览器不支持webSocket')
        }
        this.ws = new WebSocket('ws://localhost:9998');
        this.ws.onopen = () => {
            console.log('连接服务端成功')
            this.connected = true
            this.connectRetryCont = 0;
        }
        this.ws.onclose = () => {
            console.log('连接服务端失败')
            this.connected = false
            this.connectRetryCont++
            setTimeout(() => {
                this.connect()
            },500 * this.connectRetryCont)
        }
        this.ws.onmessage = msg => {
            console.log('从服务端获取到了数据',msg)
            const recvData = JSON.parse(msg.data);
            const socketType = recvData.socketType;
            if (this.callBackMapping[socketType]) {
                const action = recvData.action;
                if (action === 'getData') {
                    const realData = JSON.parse(recvData.data);
                    // 收到数据之后 前端会getData这个函数发生过来
                    // 此时this.callBackMapping[socketType]就是那个getData那个函数
                    // call 调用 并改变this执行 realData 就是getData的参数 数据
                    console.log(this.callBackMapping[socketType])
                    this.callBackMapping[socketType].call(this, realData)

                } else if (action === 'fullScreen') {
                    console.log(1)
                    this.callBackMapping[socketType].call(this, recvData)
                } else if (action === 'themeChange') {
                    this.callBackMapping[socketType].call(this, recvData)
                }
            }
        }

    }
    // 回调函数的注册
    registerCallBack(socketType, callBack) {
        this.callBackMapping[socketType] = callBack;
    }
    // 取消meng一个回调函数
    unRegisterCallBack(socketType) {
        this.callBackMapping[socketType] = null;
    }
    // 发送数据
    send(data) {
        if (this.connected) {
            this.sendRetryCont = 0;
            this.ws.send(JSON.stringify(data))
        } else {
           
            this.sendRetryCont++
            setTimeout(() => {
                this.ws.send(JSON.stringify(data))
               
            },this.sendRetryCont*500)
        }

    }
}