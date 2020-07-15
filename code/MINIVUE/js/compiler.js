/**
 * Compiler功能
 * 1、负责编译模板，解析指令/差值表达式
 * 2、负责页面的首次渲染
 * 3、当数据变化后重新渲染视图
 * 总结：就是操作 DOM
 * 
 * 结构
 * Compiler 类图
 * 属性
 * + el：vue 构造函数中 options.el,转换成 dom 对象，既模板
 * + vm: 实例，下面的方法需要用到 vm 中的数据，所以通过属性的方式把 el, vue 实例记录下来
 * 方法
 * + compile(el): 遍历 dom 对象的所有节点，并判断节点如果是文本节点解析差值表达式，如果是元素节点，解析指令
 * + compileElement(node)：解析指令
 * + compileText(node)：解析差值表达
 * + isDirective(attrName)：判断当前属性是否是指令，是在compileElement 中调用的
 * + isTextNode(node)：判断是否为文本节点
 * + isElementNode(node)：判断是否为元素节点
 */
class Compiler {
    // 构造函数中传 vue 的实例
    constructor (vm) {
        this.el = vm.$el // 记录模板
        this.vm = vm // 记录vue实例
        this.compile(this.el) // 编译模板，当我们创建 compiler这个类的对象时，会立即开始编译模板
    }
    // 编译模板，处理文本节点和元素节点
    compile (el) {
        // 遍历所有子节点
        let childNodes = el.childNodes
        // 处理 el 中的第一层子节点
        Array.from(childNodes).forEach(node => {
            // 处理文本节点——差值表达
            if (this.isTextNode(node)) {
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                // 处理元素节点——指令
                this.compileElement(node)
            }

            // 判断node节点，是否有子节点，如果子节点还有子节点，要递归调用compile
            if (node.childNodes && node.childNodes.length) {
                // 循环深层次的子节点
                this.compile(node)
            }
        })
    }
    // 编译元素节点、处理指令
    compileElement (node) {
        // console.log(node.attributes)
        // 遍历所有的属性节点
        Array.from(node.attributes).forEach(attr => {
            // 判断是否是指令
            // 获取属性节点的名称v-text,v-model
            let attrName = attr.name
            // 判断属性名称是否是指令，既是否是以v- 开头
            if (this.isDirective(attrName)) {
                // v-text --> text
                attrName = attrName.substr(2)
                // 获取属性节点中的value,也就是data对象的属性
                let key = attr.value
                if (attrName.startsWith('on')) {
                    const event = attrName.replace('on:', '') // 获取事件名
                    // 事件更新
                    return this.eventUpdate(node, key, event)
                }
                this.update(node, key, attrName)
            }
        })
    }


    // 调用指令所对应的方法，有三个参数：1、node:要更新的元素；2、key:data 中属性的名字，3、attrName:就是方法的前辍text\model
    update (node, key, attrName) {
        let updateFn = this[attrName + 'Updater']
        updateFn && updateFn.call(this, node, this.vm[key], key)
    }

    eventUpdate(node, key, event) {
        this.onUpdater(node, key, event)
    }

    // 处理 v-html
    htmlUpdater (node, value, key) {
        node.innerHTML = value
    }

    // 处理 v-on
    onUpdater (node, key, event) {
        console.log(event, 'event')
        console.log(key, 'key')
        node.addEventListener(event, (e) => this.vm[key](e))
    }

    // 处理 v-text 指令
    textUpdater (node, value, key) {
        node.textContent = value
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }

    // 处理 v-model 指令
    modelUpdater (node, value, key) {
        node.value = value
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        // 双向绑定
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
    }

    // 编译文本节点，处理差值表达式
    compileText (node) {
        // console.dir(node)
        // {{ msg }}
        // .任意匹配单个字符，不包括换行
        // +前面修饰内容出现1或多次
        // ?非贪婪模式，尽可能早的结束匹配
        // 正则为了匹配文本中的差值表达式
        let reg = /\{\{(.+?)\}\}/
        // 获取文本节点的内容
        let value = node.textContent
        // 判断文本节点是否匹配这个模式
        if (reg.test(value)) {
            // 匹配成功，获取正则表达式中分组里的内容，也就是花括号里的内容，也就是我们 data 对象里属性的名称，有了这个属性，就可以找到属性对应的值
            let key = RegExp.$1.trim()
            // 把文本节点中的差值表达式替换成属性所对应的值，重新赋给文本节点
            node.textContent = value.replace(reg, this.vm[key])

            // 创建 watcher 对象，当数据改变时更新视图
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    // 判断元素是否是指令
    isDirective (attrName) {
        return attrName.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode (node) {
        // notype:3 文本节点 1-元素节点
        return node.nodeType === 3
    }
    // 判断节点是否是元素节点
    isElementNode (node) {
        return node.nodeType === 1
    }
}