//图标
// 文本
import { createVNode,render } from 'vue'
import messageNode from './messagenode.vue'
// 动态创建一个DOM容器
const div=document.createElement('div')
div.setAttribute('class','my-message-container')
document.body.appendChild(div)
const MessageShow= ({text,type,outTime=1000}:any)=>{
   
    let timer=null as any;
    //createVNode 用于创建一个虚拟节点
    // 参数1 支持组件
    // 参数2 表示传递给组件的选项
    const vnode= createVNode(messageNode,{text, type})

    //把虚拟的节点渲染到页面的DOM中即可
    // render函数的参数
    //参数一：表示表示需要渲染的内容（虚拟节点）
    // 参数二：表示渲染的目标位置 （DOM元素）
    render(vnode,div)

    // 希望1s后消失
    clearTimeout(timer)
      timer=setTimeout(()=>{
          // 清空div里面的内容
          render(null,div)
        },outTime)
}
// $message({ text: '登录失败', type: 'error'})

//export default Message;

interface MessageImplements {
  info(text: string): void;
  warn(text: string): void;
  success(text: string): void;
  error(text: string): void;
}

class MessageClass implements MessageImplements {
  // 普通提示
  info(text: string): void {
    MessageShow({text:text, type:'info'});
  }

  // 警告提示
  warn(text: string): void {
    MessageShow({text:text, type:'warn'});
  }

  // 成功提示
  success(text: string): void {
    MessageShow({text:text, type:'success'});
  }

  // 错误提示
  error(text: string): void {
    MessageShow({text:text, type:'error'});
  }
}

const Message = new MessageClass();

export default Message;
