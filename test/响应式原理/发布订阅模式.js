/**
 * vue 的自定义事件就是基于发布订阅者模式的
 */
// 创建 vue 实例
let vm = new Vue ()

// $on 注册事件，同一个事件可以注册多个事件处理函数，dataChange 为事件名称，() => {} 为事件处理函数
vm.$on('dataChange', () => {
    console.log('dataChange')
})
vm.$on('dataChange', () => {
    console.log('dataChange2')
})

// 事件注册完毕之后，可通过 $emit 触发事件
vm.$emit('dataChange')

/**
 * 兄弟组件通信过程
 */
// eventBus.js
// 事件中心
let eventHub = new Vue()

// componentA.vue
// 发布者
addTodo: function () {
    // 发布消息（事件）
    eventHub.$emit('add-todo', { text: this.newTodoText })
    this.newTodoText = ''
}

// componentB.vue
// 订阅者
created: function () {
    // 订阅消息（事件）
    eventHub.$on('add-todo', this.addTodo)
}