// 2、div中放置元素 h1、p
import { h, init } from 'snabbdom'

let patch = init([])

// 
let vnode = h('div#container', [
    h('h1', 'hello snabbdom'),
    h('p', '这是一个p标签')
])

let app = document.querySelector('#app')

let oldVnode = patch(app, vnode)

setTimeout(() => {
    vnode = h('div#container', [
        h('h1', 'hello world'),
        h('p', 'hello p')
    ])
    // 对比两次节点的差异，更新到dom上
    patch(oldVnode, vnode)

    // 清空页面元素——创建注释节点来清空页面元素
    // 通过 h 函数创建注释节点
    patch(oldVnode, h('!'))
}, 2000);