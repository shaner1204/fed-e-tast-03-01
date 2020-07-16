/**
 * dep功能:在getter时收集依赖，在setter时通知依赖
 * 需要为每一个响应式数据创建一个dep 对象，在使用响应式数据时，收集依赖，创建观察者对象，当数据变化时，通知所有的观察者，调用观察者的update方法来更新视图
 * 所以需要在 observer 中创建 dep 对象
 * 1、收集依赖，添加观察者（watcher)
 * 2、通知所有观察者
 * 
 * 结构
 * Dep 类图
 * 属性
 * + subs: 是一个数组，用来存储dep 中的所有的 watcher
 * 方法
 * + addSub(sub)：添加 watcher(观察者)
 * + notify()：发布通知，当数据发生变化就是调用 notify，在notify 中通知所有的观察者
 */
class Dep {
    constructor () {
        // 存储所有的观察者
        this.subs = []
    }
    // 添加观察者
    addSub (sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 发送通知
    notify () {
        // 调用 subs 数组中的所有观察者，然后调用观察者的 update 方法
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}