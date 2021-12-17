const WebSocket = require('ws');
const path = require('path');
const fileUtils = require("../utils/file_utils")
const wss = new WebSocket.Server({
    port:9998
})
module.exports.listen= () =>{
    wss.on("connection", client => {
        console.log('客户端连接成功了')
        client.on('message', async (msg) => {
            let patod = JSON.parse(msg);
            const action = patod.action;
            if (action === 'getData') {
               
                let FilePath = '../data/' + patod.chartName + '.json';
                FilePath =  path.join(__dirname,FilePath)
                const ret = await fileUtils.getFileJsonData(FilePath)
                patod.data = ret;
                client.send(JSON.stringify(patod))
            } else {
                // 所有客户端的连接
                wss.clients.forEach(client => {
                    client.send(JSON.stringify(patod))
                   
                })
            }
            
          
        })
    })
}
