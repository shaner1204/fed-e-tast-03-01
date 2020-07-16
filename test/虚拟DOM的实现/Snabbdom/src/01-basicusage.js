
import { h, init } from 'snabbdom'

// 1、hello word
// 首先通过 init 方法返回一个 patch 函数，再利用 h 函数创建虚拟 DOM
// init 有一个参数是数组，里面需要传入模块
// init 方法返回一个函数——patch，patch 是 snabbdom 的核心函数，它的作用是对比两个虚拟 dom(vnode),对比两个 vonode 差异，把差异更新到真实 dom
let patch = init([])
// h 函数如果是两个参数时：1、标签 + 选择器；2、如果是字符串的话，就是设置标签的内容
let vnode = h('div#container.cls', 'hello world')

let app = document.querySelector('#app')

// 参数是两个 vnode,对比 vonode
// 第一个参数：可以是dom元素，内部会把dom元素转换成 vnode
// 第二个参数：vnode
// 返回值： vnode
// 传入一个真实dom,会元素转换成 vonde,再跟第二个参数真实的 vnode进行对比，并且返回一个 vnode
let oldVnode = patch(app, vnode)

// 假设的时刻
vnode = h('div', 'hello snabbdom')

patch(oldVnode, vnode)

