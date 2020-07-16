/**
 * 常用模块
 * 1、attributes
 * 设置 dom 元素的属性，使用 setAttribute()
 * 处理布尔类型的属性
 * 
 * 2、props
 * 和 attributes 模块相似，设置 dom 元素的属性 element[attr] = value
 * 不处理布尔类型的属性
 * 
 * 3、class
 * 切换类样式
 * 注意：给元素设置类样式是通过 sel 选择器
 * 
 * 4、dataset
 * 设置 data-* 的自定义属性
 * 
 * 5、eventlisteners
 * 注册事件
 * 
 * 6、style
 * 设置行内样式，支持动画
 * delayed/remove/destroy
 * 
 * 
 * 模块使用
 * 模块使用步骤：
 * 导入需要的模块
 * init() 中注册模块
 * 使用 h() 函数创建 VNode 的时候 ，可以把第二个参数设置为对象，其他参数往后移
 */

 import { h, init } from 'snabbdom'
 // 1、导入模块
 import style from 'snabbdom/modules/style'
 import eventlisteners from 'snabbdom/modules/eventlisteners'
 // 2、注册模块
 let patch = init([
    style,
    eventlisteners
 ])
 // 3、使用 h() 函数的第二个参数传入模块需要的数据 （对象）
 let vnode = h('div', {
    style: {
        backgrounColor: 'pink'
    },
    on: {
        click:eventHandler
    }
 }, [
    h('h1', 'hello world'),
    h('p', '这是p标签')
 ])

 function eventHandler () {
    console.log('点击我了')
 }

 let app = document.querySelector('#app')

 patch(app, vnode)

