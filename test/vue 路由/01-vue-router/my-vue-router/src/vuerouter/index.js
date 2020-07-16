let _Vue = null

export default class VueRouter {
    // vue.use 中调用 install 方法时，会传入两个参数，一个是 vue 的构造函数，第二个是可选的选项对象
    static install (Vue) {
        // 1、判断当前插件是否已经被安装
        if (VueRouter.install.installed) {
            return
        }
        // 表示当前插件忆被安装
        VueRouter.install.installed = true
        // 2、把 Vue 的构造函数记录到全局变量中来，因为当前的 install 方法是一个静态方法，在静态方法中接收一个参数—— Vue 的构造函数而在 vuerouter 的实例方法中还要使用 Vue 这个构造函数，比如创建 router-link router-view 这两个组件时，需调用 vue.component来创建，所以需要把 Vue 的构造函数记录下来，记录到全局变量中
        _Vue = Vue
        // 3、所创建 Vue 实例时，传入的 router 对象需注入到所有的 Vue 实例上，之前使用的 this.$router 就是在这个时候注入到 vue 实例上的，并且所有的组件也都是 vue 的实例
        // this指向谁：install方法是如何调用的，install 是一个静态方法，调用时通过 VueRouter.install 来调用的，谁调用，里面的 this 就指向谁，this 指向 VueRouter 类，而不是 Vue 实例
        // _Vue.prototype.$router = this.$options.router
        // 混入
        // 在插件中，可以给所有的 vue 实例混入一个选项，在选项中可以创建一个 beforeCreate，在 beforeCreate 函数中就可以访问到 Vue 实例，然后给原型上注入一个 $router 属性
        _Vue.mixin({
            // 给所有的 vue 实例设置一个选项，所有的组件也会执行 beforeCreate 钩子函数
            beforeCreate () {
                // 挂载 $router 只需执行一次，如果是组件就不执行，如果是vue 实例需要执行
                if (this.$options.router) {
                    // 在 beforeCreate 函数中，就可以给 vue 构造函数中的原型上增加一个 $router 属性
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                } 
            }
        })
    }

    constructor (options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: '/'
        })
    }

    init () {
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }

    createRouteMap () {
        // 遍历所有的路由规则，把路由规则转换成键值对的形式，存储到 routeMap 中
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }

    initComponents (Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render (h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHandler
                    },
                }, [this.$slots.default])
            },
            methods: {
                clickHandler (e) {
                    history.pushState({}, '', '#' + this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()
                }
            }
            // template: '<a :href="to"><slot></slot></a>'
        })

        const self = this
        Vue.component('router-view', {
            render (h) {
                // h 函数帮助返回虚拟 DOM
                // self.data.current  当前路由地址
                const component = self.routeMap[self.data.current] // 当前的路由组件 
                return h(component)
            }
        })
    }

    initEvent () {
        window.addEventListener('hashchange', () => {
            this.data.current = window.location.hash.slice(1)
        })
    }
}