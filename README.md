# validator
Validate Form Data.

## Install

```sh
npm install -S hey-validator
```

## API
```js

new Valid({
    rules:{
        a:{
            type: 'int|number|email|url|tel|mobile|globalmobile', //可以自定义
            required: true,
            maxLen: 1000,
            minLen: 2
        },
        b:{
            valid: {
              pattern: /^[0-9]+$/,
              message: "请输入正确的数字格式"
            },
            required: true,
            min: 1,
            max: 5
        },
        c:{
            required: true,
            type: 'int',
            valid(prop, parent, data){
              if(resp.isExsit){
                return "错误";
              }
              return true;
            },
            validAsync(prop, next, parent , data){
              $.ajax('/test').then((resp)){
                if(resp.isExsit){
                  next("已存在");
                }
                next();
              }
            }
        },
        "d.b":{
            
        },
        "e[].a":{
            
        }
    },
    combineRules:[{
      parentRef: 'e[]', //如果验证的是子集的数据，则需要定义父级
      refs: ['b', 'c'],
      valid(valueb,valuec){
        if(condition){
          return "b不能大于c";
        }
        return true;
      }
    },{
      refs: ['b', 'c'],
      valid: {
        valid: 'lessThan', //greaterThan
        message: "开始时间必须小于结束时间"
      }
    },{
      refs: ['d', 'e'],
      valid: : {
        valid: 'equal',
        message: "两次密码输入必须一致"
      }
    }],
    //可以对一些同一种类型的类型判断集成设定
    required:['b','c','e','f','e',"d.b","e[].a"],
    int:['a'],
    number:['a'],
    email:['a'],
    url:['a'],
    tel:['a'],
    mobile:['a'],
    globalmobile:['a'] //国际号码
});


```


## Define Valid Function
```js
func(prop, value){
    return true;
    //或者
    return "error message";
}
```

## Define Global Valid
```js

Valid.config({
    valids:{
      test(prop, parent, data){
        if(condition){
          return true;
        }
        return '';
      },
      test2:{
        pattern: /^[0-9a]+$/,
        message: '不符合自定义要求'
      }
    },
    combineValids:{
      test(value1, value2){
        if(condition){
          return true;
        }
        return ''
      }
    }
})

```

## Usage

### type
```js

let rule = {
  rules: {
    int: {
      type: 'int'
    },
    number: {
      type: 'number'
    },
    url: {
      type: 'url'
    },
    pro: {
      valid(prop, parent, data){
        if(prop == '0'){
          return "pro不能为0";
        }
        return true;
      }
    }
  },
  required: ['int']
}
let validator = new Validator(rule);
//部分验证
validator.validField('int', {int: ''});
// { a: { valid: false, message: '不能为空', type: 'base' } }

validator.validField('int', {int: '不是整数'});
// { a: { valid: false, message: '不是正确的整数格式', type: 'base' } }

validator.validField('number', {int: '123.23'});
// { number: { valid: true, message: null, type: 'base' } }

validator.validField('pro', {pro: '0'});
// { pro: { valid: false, message: 'pro不能为0', type: 'base' } }
```


### combine
```js

let rule = {
  rules: {
    int: {
      type: 'int'
    },
    number: {
      type: 'number'
    },
  },
  combineRules: [{
    refs: ['int', 'number'],
    valid: {
      valid: 'equal',
      message: 'int必须等于number'
    }
  }]
}

let validator = new Validator(rule);
//全部验证
validator.valid({int: '不是number', number: '0'});
// { int: { valid: false, message: '不是正确的整数格式', type: 'base' },
//   number: { valid: true, message: null, type: 'base' } }

validator.valid({int: 1, number: 2});
// { int: { valid: true, message: null, type: 'base' },
//   number: { valid: false, message: 'int必须等于number', type: 'combine' } }

validator.valid({int: 1, number: '1'});
// { int: { valid: true, message: null, type: 'base' },
//   number: { valid: false, message: 'c必须大于d.b', type: 'combine' } }


```


### async
```js

let rule = {
  rules: {
    async: {
      validAsync(prop, next, parent, data){
        setTimeout(()=>{
          if(prop != '哈哈'){
            next('prop需要叫哈哈');
          }
          next(true);
        }, 50);
      }
    },
    async2: {
      validAsync(prop, next, parent, data){
        setTimeout(()=>{
          if(prop == '哈哈'){
            next('prop不需要叫哈哈');
          }
          next(true);
        }, 50);
      }
    }
  }
}

let validator = new Validator(rule);
//部分验证
validator.validField('async', {async: '呵呵'}, (result)=>{
  // { async:
  //    { valid: false,
  //      message: 'prop需要叫哈哈',
  //      type: 'async',
  //      loading: false } }
});

//全部验证
validator.valid({async: '呵呵', async2: '呵呵'}, (result)=>{
  // 当所有的异步验证都执行完毕的时候调用
  // 所有验证的result
}, (result) => {
  // 每一个异步验证执行完毕的时候调用
});

```