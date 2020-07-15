/**
 * Watcher功能
 * 1、当数据变化触发依赖， dep 通知所有的 Watcher 实例更新视图
 * 2、自身实例化的时候往对象中添加自己
 * 
 * 结构
 * Watcher 类图
 * 属性
 * + vm
 * + key：data 中的属性名称
 * + cb：watcher 对象有很多，不同的 watcher 更新视图的操作不同，所以需要 cb,当 new 一个 watcher时，传输入一个回调函数，回调函数中应该指明如何更新视图
 * + oldValue：数据变化之前的值，在 update 触发时，内部会拿到最新的值，比较新旧什是否发生变化，有变化时，再调用  cb ,更新视图
 * 方法
 * + update()：更新视图
 */
class Watcher {
    constructor (vm, key, cb) {
        this.vm = vm
        // data 中的属性名称 
        this.key = key
        // 回调负责更新视图
        this.cb = cb

        // 把watcher 对象记录到dep类的静态属性target
        Dep.target = this
        // 触发 get 方法，在get方法中会调用 addSub
        this.oldValue = vm[key]
        Dep.target = null
    }
    // 当数据发生变化 的时候 更新视图
    update () {
        let newValue = this.vm[this.key]
        if (this.oldValue === newValue) {
            return
        }
        this.cb(newValue)
    }
}