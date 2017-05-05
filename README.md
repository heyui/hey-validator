# validator
- 验证字符串非空
- 验证字符串长度
- 数字填写控制
- 整数填写控制
- 验证邮箱，验证网址，其他验证
- 验证手机号码
- 验证电话号码

## 验证定义
```js
func(prop, value){
    return true;
    //或者
    return "error message";
}
```

## 定义方式
```js

new Valid({
    rules:{
        a:{
            valid: 'int|number|email|url|tel|mobile|globalmobile', //可以自定义
            required: true,
            maxlen: 1000,
            minlen: 2
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
            validAsync(prop, parent, next, data){
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
      parentRef: 'e[]',
      refs: ['b', 'c'],
      valid(valueb,valuec){
        if(condition){
          return "a不能大于b";
        }
        return true;
      }
    },{
      refs: ['b', 'c'],
      valid: 'lessThan', //greaterThan
      message: "开始时间必须小于结束时间"
    },{
      refs: ['d', 'e'],
      valid: 'equal',
      message: "两次密码输入必须一致"
    }],
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

## 全局定义
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
    validAsyncs:{
      test(prop, parent, next, data){
        if(condition){
          next();
        }
        next('');
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

