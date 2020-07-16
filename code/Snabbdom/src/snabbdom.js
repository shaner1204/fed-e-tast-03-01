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
 let vnode = h('div#container', {
    style: {
        backgroundColor: 'pink',
        padding: '30px',
        width: '360px',
        margin: '30px auto'
    }
 }, [
    h('h1', {
      style: {
         fontSize: '26px',
         color: '#333',
         marginBottom: '30px'
      }
    }, '虚拟 DOM'),
    h('div.operateBtn', {
      style: {
         display: 'flex',
         justifyContent: 'space-between'
      }
    }, [
      h('div.add', {
         style: {
            width: '50px',
            height: '30px',
            lineHeight: '28px',
            borderRadius: '10px',
            border: '1px solid purple',
            marginBottom: '15px',
            color: 'purple',
            fontSize: '18px',
            textAlign: 'center'
         },
         on: {
            click: addHandler
         }
      }, '增加'),
      h('div.clear', {
         style: {
            width: '50px',
            height: '30px',
            lineHeight: '28px',
            borderRadius: '10px',
            border: '1px solid #ff5722',
            marginBottom: '15px',
            color: '#ff5722',
            fontSize: '18px',
            textAlign: 'center'
         },
         on: {
            click: clear
         }
      }, '清空')
    ]),
    h('ul.dataList', [
      h('li', {
         style: {
            border: '1px solid #fff',
            fontSize: '20px',
            color: '#fff',
            lineHeight: '36px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 10px'
         }
      }, [
         h('div.itemName', '水果title: 桃子'),
         h('div.tag', {
            style: {
               fontSize: '16px'
            }
         }, '桃之夭夭')
      ]),
      h('li', {
         style: {
            border: '1px solid #fff',
            fontSize: '20px',
            color: '#fff',
            lineHeight: '36px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 10px'
         }
      }, [
         h('div.itemName', '水果title: 苹果蕉'),
         h('div.tag', {
            style: {
               fontSize: '16px'
            }
         }, '苹安喜乐')
      ])
    ])
 ])
 let app = document.querySelector('#app')

 let oldVnode = patch(app, vnode)

 function addHandler () {
    console.log('这里是新增点击事件')
    vnode = h('div#container', {
      style: {
          backgroundColor: 'pink',
          padding: '30px',
          width: '360px',
          margin: '30px auto'
      }
   }, [
      h('h1', {
        style: {
           fontSize: '26px',
           color: '#333',
           marginBottom: '30px'
        }
      }, '虚拟 DOM'),
      h('div.operateBtn', {
         style: {
            display: 'flex',
            justifyContent: 'space-between'
         }
      }, [
        h('div.add', {
           style: {
              width: '50px',
              height: '30px',
              lineHeight: '28px',
              borderRadius: '10px',
              border: '1px solid purple',
              marginBottom: '15px',
              color: 'purple',
              fontSize: '18px',
              textAlign: 'center'
           },
           on: {
              click: addHandler
           }
        }, '增加'),
        h('div.clear', {
            style: {
               width: '50px',
               height: '30px',
               lineHeight: '28px',
               borderRadius: '10px',
               border: '1px solid #ff5722',
               marginBottom: '15px',
               color: '#ff5722',
               fontSize: '18px',
               textAlign: 'center'
            },
            on: {
               click: clear
            }
         }, '清空')
      ]),
      h('ul.dataList', [
        h('li', {
           style: {
              border: '1px solid #fff',
              fontSize: '20px',
              color: '#fff',
              lineHeight: '36px',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 10px'
           }
        }, [
           h('div.itemName', '零食: 蛋糕我的最爱'),
           h('div.tag', {
               style: {
                  fontSize: '16px'
               }
            }, '想吃就不犹豫')
        ]),
        h('li', {
           style: {
              border: '1px solid #fff',
              fontSize: '20px',
              color: '#fff',
              lineHeight: '36px',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 10px'
           }
        }, [
           h('div.itemName', '零食: 下雨天和干脆面更配哦~'),
           h('div.tag', {
               style: {
                  fontSize: '16px'
               }
            }, '拿下')
        ]),
        h('li', {
            style: {
               border: '1px solid #fff',
               fontSize: '20px',
               color: '#fff',
               lineHeight: '36px',
               marginBottom: '10px',
               display: 'flex',
               justifyContent: 'space-between',
               padding: '0 10px'
            },
         }, [
            h('div.itemName', '零食: 甜甜的冰淇淋'),
            h('div.tag', {
               style: {
                  fontSize: '16px'
               }
            }, '不可错过')
         ])
      ])
   ])
   patch(oldVnode, vnode)
 }

 function clear () {
   patch(vnode, h('!'))
 }

 

