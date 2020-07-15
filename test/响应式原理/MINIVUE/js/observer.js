/**
 * observer功能
 * 1、负责把data 选项中的属性转换成响应式数据,getter/setter
 * 2、data 中的某个属性也是对象，把该属性转换成响应式数据 
 * 3、数据变化发送通知
 * 
 * 结构
 * observer 类图
 * + walk：遍历 data 中所有属性，参数是 data 对象
 * + defineReactive(data, key, value)：defineReactive定义响应式数据，也就是通过调用 object.defineProperty把属性转换成getter、setter
 * walk在循环过程中会调用 defineReactive
 */

 class Observer {
    // 构造函数中调用 walk 方法
    constructor (data) {
        this.walk(data)
    }
    walk (data) {
        // 1、判断data是否是对象
        if (!data || typeof data !== 'object') {
            return
        }
        // 2、遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    // defineReactive 需要三个参数：1、对象obj(就是data对象)，2、key(属性)，3、val(属性对应的值)
    defineReactive (obj, key, val) {
        let that = this
        // 负责收集依赖，并发送通知
        let dep = new Dep()
        // 如果 val 是对象，会把val中的所有属性都转换成 getter/setter
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                // 收集依赖 Dep.target存储的watcher对象，把watcher对象存储到 subs数组中
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set (newValue) {
                if(newValue === val) {
                    return
                }
                val = newValue
                that.walk(newValue)
                // 发送通知
                dep.notify()
            }
        })
    }
 }