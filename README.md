# Validator

`hey-validator`是配合`heyui`使用的表单数据验证插件，其中集成了常用且多样化的校验方式，包含单个数据校验和多个数据校验，均可进行自定义校验规则，扩展性极强，帮助你解决绝大部分表单验证情况，快速完成应用开发。

## 安装

```sh
npm install --save hey-validator
```

## 文档

### 初始化参数
```js
{
  rules: {},          // 单个数据验证
  combineRules: {},   // 多个数据合并验证
  required:[],        // 是否必填
  int:[],             // 整数
  number:[],          // 数字
  email:[],           // 邮箱
  url:[],             // 网址
  tel:[],             // 电话号码
  mobile:[],          // 手机号
  globalmobile:[]     // 国际号码
}
```
## 示例

### 基础示例
```html
  <Form :model="model" :rules="validRules" ref="form">
    <FormItem label="金额" props="amount">
      <input type="text" v-model="model.amount">
    </FormItem>
    <FormItem label="网址" props="url">
      <input type="text" v-model="model.url">
    </FormItem>
    <FormItem label="邮箱" props="email">
      <input type="text" v-model="model.email">
    </FormItem>
    <FormItem label="手机" props="mobile">
      <input type="text" v-model="model.mobile">
    </FormItem>
  </Form>
```
```js
  data() {
    return {
      model: {
        amount: null,
        url: null,
        email: null,
        mobile: null
      },
      validRules: {
        required: ['amount', 'url', 'email', 'mobile'],
        // 可以这样用
        rules: {
          amount: {
            type: 'number'
          }
        },
        // 也可以这样
        url: ['url'],
        email: ['email'],
        mobile: ['mobile']
      }
    }
  }
```

### 内置基础类型验证
```js
int           // 整数
number        // 数字
email         // 邮箱
url           // 网址
tel           // 电话号码
mobile        // 手机号
globalmobile  // 国际号码
```
#### 示例1
```html
  <Form :model="model" :rules="validRules" ref="form">
    <FormItem label="金额" props="amount">
      <input type="text" v-model="model.amount">
    </FormItem>
  </Form>
```
```js
  data() {
    return {
      model: {
        amount: null
      },
      validRules: {
        rules:{
          amount: {
            type: 'number',
            required: true
          }
        }
      }
    }
  }
  // 当输入字符串的结果
  {amount: 'a'}   // {a:{message: '不是正确的数字格式', type: 'base', valid: false}}
```
#### 示例2
```html
  <Form :model="model" :rules="validRules" ref="form">
    <FormItem label="金额" props="mobile">
      <input type="text" v-model="model.mobile">
    </FormItem>
  </Form>
```
```js
  data() {
    return {
      model: {
        mobile: null
      },
      validRules{
        rules:{
          mobile: {
            type: 'mobile',
            required: true
          }
        }
      }
    }
  }
  //空验证
  {mobile: ''}    // {a:{message: '不能为空', type: 'base', valid: false}}
  //手机号码格式验证
  {mobile: 123}   // {a:{message: '不是正确的手机号码格式', type: 'base', valid: false}}
```

### 基础校验
```js
  required    // 是否必填
  maxLen      // 最大长度
  minLen      // 最小长度
  max         // 最大值
  min         // 最小值 
``` 
#### 示例：最大长度
```html
  <Form :model="model" :rules="validRules" ref="form">
    <FormItem label="长度测试" props="a">
      <input type="text" v-model="model.a">
    </FormItem>
  </Form>
```
```js
  data() {
    return {
      model: {
        a: null
      },
      validRules: {
        rules:{
          a: {
            maxLen: 5
          }
        }
      }
    }
  }
  // 长度验证结果
  {a: 'aaaaaa'}   // {a:{message: '文字长度不能超过5个字', type: 'base', valid: false}}
```
#### 示例：最大值
```html
  <Form :model="model" :rules="validRules" ref="form">
    <FormItem label="最大值" props="a">
      <input type="text" v-model="model.a">
    </FormItem>
  </Form>
```
```js
  data() {
    return {
      model: {
        a: null
      },
      validRules: {
        rules:{
          a: {
            type: 'number',
            max: 9
          }
        }
      }
    }
  }
  //最大值验证
  {a: 99}   // {a:{message: '不能大于9', type: 'base', valid: false}}
```

### 自定义验证方式

#### 示例1：正则表达式校验
```html
  <Form :model="model" :rules="validRules" ref="form">
    <FormItem label="数字" props="a">
      <input type="text" v-model="model.a">
    </FormItem>
  </Form>
```
```js
  data() {
    return {
      model: {
        a: null
      },
      validRules: {
        rules:{
          a: {
            valid: {
              pattern: /^[0-9]+$/,
              message: '请输入正确的数字格式'
            },
            max: 99
          }
        }
      }
    }
  }
  // 数字格式验证
  {a: 'a'})   // {a:{message: '请输入正确的数字格式', type: 'base', valid: false}}
  //最大值验证
  {a: 100}    // {a:{message: '不能大于99', type: 'base', valid: false}}
```

#### 示例2：使用valid方法进行验证
```html
  <Form :model="model" :rules="validRules" ref="form">
    <FormItem label="valid" props="a">
      <input type="text" v-model="model.a">
    </FormItem>
  </Form>
```
```js
  data() {
    return {
      model: {
        a: null
      },
      validRules: {
        rules:{
          a: {
            type: 'number',
            valid(prop, parent, data) {
              if(prop< 0 || prop > 100) {
                  return '必须介于0至100之间'
              }
              return true;
            }
          }
        }
      }
    }
  }
  // 原生valid验证
  {a: -1}  // {a:{message: '必须介于0至100之间', type: 'base', valid: false}}
```
### 异步validAsync验证
```html
  <Form :model="model" :rules="validRules" ref="form">
    <FormItem label="validAsync" props="a">
      <input type="text" v-model="model.a">
    </FormItem>
  </Form>
```
```js
  data() {
    return {
      model: {
        a: null
      },
      validRules: {
        rules:{
          a: {
            type: 'number',
            validAsync(prop, next, parent , data){
              $.ajax('/test').then((resp)){
                if(resp.isExsit){
                  next("已存在");
                }
                if(resp.value < 0 || resp.value > 100) {
                  next('必须介于0至100之间')
                }
                next()
              }
            }
          }
        }
      }
    }
  }
  // 异步valid
  // {a:{message: '必须介于0至100之间', type: 'base', valid: false}}
```

### 多个数据合并验证
补充说明：多个数据是指`combineRules`对象中的`refs`属性中的数据，`valid`方法中的参数依次代表`refs`中的参数，顺序保持一致。

#### 示例1
```html
  <Form :model="model" :rules="validRules" ref="form">
    <FormItem label="数据b" props="b">
      <input type="text" v-model="model.b">
    </FormItem>
    <FormItem label="数据c" props="c">
      <input type="text" v-model="model.c">
    </FormItem>
  </Form>
```
```js
  data() {
    return {
      model: {
        b: null,
        c: null
      },
      validRules: {
        combineRules:[{
          // parentRef: 'e[]', // 如果验证的是子级的数据，则需要定义父级
          refs: ['b', 'c'],
          valid(valueb,valuec){
            if(valueb > valuec){
              return "b不能大于c";
            }
            return true;
          }
        }]
      }
    }
  }
  // 合并验证，这里需要注意的是默认会报错在最后一个数据，也就是会在页面上对应数据的地方报错提醒
  {b: 3, c:2}   // {b:{message: null, type: "base", valid: true}} {c: {message: "b不能大于c", type: "combine", valid: false}}
```
#### 示例2：子级数据验证
```js
  data() {
    return {
      model: {
        b: null,
        c: null
      },
      validRules: {
        combineRules:[{
          parentRef: 'e[]', // 如果验证的是子级的数据，则需要定义父级
          refs: ['b', 'c'],
          valid(valueb,valuec){
            if(valueb > valuec){
              return "b不能大于c";
            }
            return true;
          }
        }]
      }
    }
  }
  // 合并验证，这里需要注意的是默认会报错在最后一个数据，也就是会在页面上对应数据的地方报错提醒
  {e:[{b: 1, c:2}, {b: 3, c: 2}]}
  // e: {message: null, type: "base", valid: true}
  // e[0]: {message: null, type: "base", valid: true}
  // e[0].b: {message: null, type: "combine", valid: true}
  // e[0].c: {message: null, type: "combine", valid: true}
  // e[1]: {message: null, type: "base", valid: true}
  // e[1].b: {message: null, type: "base", valid: true}
  // e[1].c: {message: "b不能大于c", type: "combine", valid: false}
```

#### 示例3：内置合并验证规则
```js
  // lessThan b小于c
  // greaterThan b大于c
  // equal b等于c
  {
    refs: ['b', 'c'],
    valid: {
      valid: 'lessThan',
      message: "开始时间必须小于结束时间"
    }
  }
```

## 方法
方法名 | 说明 | 参数 | 返回值  
-|-|-|-
valid | 校验方法 | data,next:Function,allNext:Function | 无
getConfig | 获取相关配置 | prop | 对应数据的校验配置
setConfig | 设置相关配置 | prop, options | 无
validField | 校验部分数据 | prop,data,next:Function | 校验结果
destroy | 销毁实例 | 无 | 无

#### valid
```js
  import HeyValidator from "hey-validator"
  let validator = new HeyValidator({
    required: ['b'],
    rules:{
      b: {
        type:'int'
      }
    }
  })
  
  validator.valid({b: 3.3})   // {b: {message: "不是正确的整数格式", type: "base", valid: false}}}
  // next     异步校验只有执行的回调
  // allNext  多个异步校验全部完成之后执行的回调
```

#### getConfig
```js
  let HeyValidator = require("hey-validator")
  let validator = new HeyValidator({
    required: ['b'],
    rules:{
        b: {
            type:'int'
        }
    }
  })
  validator.getConfig('b')   // {required: true, type: "int"}
```

#### setConfig
```js
  let HeyValidator = require("hey-validator")
  let validator = new HeyValidator({
    required: ['b'],
  })
  let rules = {
    b: {
      type:'int'
    }
  }
  validator.setConfig('b',rules);
  validator.getConfig('b')  // {b: {type: "int"}, required: true}
```

#### validField
```js
  let HeyValidator = require("hey-validator")
  let validator = new HeyValidator({
    required: ['b','c'],
    rules:{
      b: {
        type: 'int'
      },
      c: {
        type: 'email'
      }
    }
  })
  validator.validField('b', { b: 3.3 })  // {b: {message: "不是正确的整数格式", type: "base", valid: false}}
``` 

#### destroy
```js
  let HeyValidator = require("hey-validator")
  let validator = new HeyValidator({
    required: ['b','c'],
    rules:{
      b: {
        type: 'int'
      }
    }
  })
  validator.destroy()   //{combineRuleResults: null, combineRules: null, rules: null}
```

## 相关链接

- [HeyUI](https://www.heyui.top)



