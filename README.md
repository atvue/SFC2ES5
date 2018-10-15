## 目前仅支持转译vue中的script和template部分，忽略style标签 

一个转译例子🌰
`src/alert.vue`

```vue
<template>
    <div>
        this is a SFC component , {{name}}
    </div>
</template>


<script>

export default {
    name: 'alert'  ,
    data(){
        return {
            name: "hello,SFC!"
        }
    }
}
</script>
```

执行：`yarn build`

结果：`lib/alert.js`

```js
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'alert',
  data: function data() {
    return {
      name: "hello,SFC!"
    };
  }
};
exports.default = Object.assign(_default, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_vm._v("\n    this is a SFC component , " + _vm._s(_vm.name) + "\n")]);
  }
});;
```

### 开发
- `cd SFC2ES5`
- 安装依赖：`yarn`
- 转译`src/`目录下的所有vue文件: `yarn build`
> js部分会直接通过babel转译，会跳过__test__目录下的测试文件，或者后缀是*.test.js文件；所有lib下的文件的目录结构和src目录结构保持一致


### 细节

- 读取SFC中的script内容，template内容
- babel转译script内容到es5，es5解析出ast结构：`demo.ast`
- template内容通过`vue-template-compiler`和`vue-template-compiler`解析出`render`函数
- `demo.ast`中插入`render`函数，生成`result.ast`
- `result.ast`通过babel转换成es5代码，写入`lib/alert.js`文件中