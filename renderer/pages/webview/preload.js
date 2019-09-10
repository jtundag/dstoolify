import { ipcRenderer } from "electron";

var Notification = function(title, ops){
    console.log(title, ops)

    // ipcRenderer.sendToHost()
}

window.Notification = Notification