// router/index.js
// 注册插件
/**
 * 1、先导入 vuerouter 模块，vuerouter 是 Vue 的插件，所以用 Vue.use 来注册这个插件
 * Vue.use 方法可传函数或对象，如传函数，Vue.use 内部会直接调用这个函数;如传对象，Vue.use
 * 会调用这个对象的 install 方法，
 */
Vue.use(VueRouter)
// 创建路由对象
/**
 * vuerouter 应是一个构造函数或是一个类，此处我们用类的方式实现，并且这个类应有一个静态的 install 方法
 * 因为这里把 vuerouter 直接传给了 vue.use，类也是一个对象，应实现一个 vuerouter 类，类中有一个静态的
 * install 方法，vuerouter 构造函数需接收一个参数，参数是一个对象的形式，里面传入了路由的的规则，这些规则
 * 核心要记录路由的地址和对应的组件，
 */
const router = new VueRouter({
    routes: [
        {name: 'home', path: '/', component: homeComponent}
    ]
})
/**
 * 最后创建 vue 实例，vue 实例中传入了刚创建的 router 对象
 */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

/**
 * 类图
 * VueRouter 类名
 * 类的属性：
 * options 记录构造函数中传入的对象，在 new VueRouter 时传入了一个对象，routes——路由规则 
 * data 是一个对象，里面有一个属性 current 用来记录路由当前地址的，设置 data 的目的时，我们
 * 需要一个响应式的对象，因为路由地址变化时，对应的组件需进行相应在更新，可通过调用 Vue.observeble
 * 方法
 * routeMap 是一个对象，用来记录路由地址和组件的对应关系，会把路由规则解析到 routeMap 中
 * 
 * 类中的方法
 * + 号表示对外公开的方法
 * _ 下划线表示静态方法
 * + Constructor(Options): VueRouter ——构造函数中初始化属性
 * _ install(Vue): void ——用来实现 vue 的插件的机制
 * + init(): void ——init 方法用来调用下面三个方法
 * + initEvent(): void ——用来注册 popstate 方法，用来监听浏览器历史的变换
 * + createRouteMap(): void ——用来初始化 routeMap 属性的，它把构造函数中传的路由规则转换成键值对的形式，存储到 routeMap 中
 * routeMap 就是一个对象，键就是路由地址，值就是对应的组件，在 router-view 组件中会使用到 routeMap
 * + initComponents(Vue): void ——用来创建 router-link router-view 两个组件的
 */