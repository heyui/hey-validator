var baseValids = require('../src/validation/baseValids');
var typeValids = require('../src/validation/typeValids');
var expect = require('chai').expect;
'use strict';

module.exports = function (Validator) {

  let v = new Validator({
    rules: {
      a: {
        required: true
      },
      a1: {
        required: true
      },
      b1: {
        type: "int"
      }
    },
    required: ['b'],
    int: ["a1"]
  });
  let data = { a: 'a', b: '', a1: '', b1: 'a' };
  let requireError = { valid: false, message: baseValids.required.message, type: "base" };
  let success = { valid: true, message: null, type: "base" };
  describe('非空验证', function () {
    it('validator非空: 空值', function () {
      expect(v.validField('a', { a: 'a' })).to.deep.equal({ a: success });
    });

    it('validator非空: 非空值', function () {
      expect(v.validField('b', { b: '' })).to.deep.equal({ b: requireError });
    });
  });
  describe('类型验证:int', function () {
    it('validator基础int验证: 非必填有验证', function () {
      expect(v.validField('b1', { b1: '' })).to.deep.equal({ b1: success });
    });

    it('validator基础int验证: 整数值', function () {
      expect(v.validField('a1', { a1: '1' })).to.deep.equal({ a1: success });
    });

    it('validator基础int验证: float', function () {
      expect(v.validField('b1', { b1: '2.4' })).to.deep.equal({ b1: { valid: false, message: typeValids.int.message, type: "base" } });
    });

    it('validator基础int验证: string', function () {
      expect(v.validField('b1', { b1: 'a' })).to.deep.equal({ b1: { valid: false, message: typeValids.int.message, type: "base" } });
    });

    it('validator基础int验证: negative', function () {
      expect(v.validField('b1', { b1: '-13' })).to.deep.equal({ b1: success });
    });

    it('validator基础number验证: 整数值', function () {
      expect(v.validField('a1', { a1: '1' })).to.deep.equal({ a1: success });
    });

  });

  let numValid = new Validator({
    rules: {
      b: {
        required: true
      }
    },
    number: ['b']
  });

  describe('类型验证:number', function () {
    it('number定义初始化', function () {
      expect(numValid.getConfig("b").type).to.equal("number");
    });

    it('validator基础number验证: string', function () {
      expect(numValid.validField('b', { b: 'a' })).to.deep.equal({ b: { valid: false, message: typeValids.number.message, type: "base" } });
    });

    it('validator基础number验证: date', function () {
      expect(numValid.validField('b', { b: new Date() })).to.deep.equal({ b: success });
    });

    it('validator基础number验证: number', function () {
      expect(numValid.validField('b', { b: '1.3' })).to.deep.equal({ b: success });
    });

    it('validator基础number验证: int', function () {
      expect(numValid.validField('b', { b: '12' })).to.deep.equal({ b: success });
    });

  });



  let emailValid = new Validator({
    rules: {
      b: {
        required: true
      }
    },
    email: ['b']
  });

  var emailError = { valid: false, message: typeValids.email.message, type: "base" };

  describe('类型验证:email', function () {
    it('email定义初始化', function () {
      expect(emailValid.getConfig("b").type).to.equal("email");
    });

    it('validator基础email验证: string', function () {
      expect(emailValid.validField('b', { b: 'a' })).to.deep.equal({ b: emailError });
    });

    it('validator基础email验证: date', function () {
      expect(emailValid.validField('b', { b: new Date() })).to.deep.equal({ b: emailError });
    });

    it('validator基础email验证: number', function () {
      expect(emailValid.validField('b', { b: '1.3' })).to.deep.equal({ b: emailError });
    });

    it('validator基础email验证: email', function () {
      expect(emailValid.validField('b', { b: 'a@sina.com' })).to.deep.equal({ b: success });
    });

  });



  let urlValid = new Validator({
    rules: {
      b: {
        required: true
      }
    },
    url: ['b']
  });

  var urlError = { valid: false, message: typeValids.url.message, type: "base" };

  describe('类型验证:url', function () {
    it('url定义初始化', function () {
      expect(urlValid.getConfig("b").type).to.equal("url");
    });

    it('validator基础url验证: string', function () {
      expect(urlValid.validField('b', { b: 'a' })).to.deep.equal({ b: urlError });
    });

    it('validator基础url验证: date', function () {
      expect(urlValid.validField('b', { b: new Date() })).to.deep.equal({ b: urlError });
    });

    it('validator基础url验证: number', function () {
      expect(urlValid.validField('b', { b: '1.3' })).to.deep.equal({ b: urlError });
    });

    it('validator基础url验证: www.baidu.com', function () {
      expect(urlValid.validField('b', { b: 'www.baidu.com' })).to.deep.equal({ b: success });
    });

    it('validator基础url验证: http://www.baidu.com', function () {
      expect(urlValid.validField('b', { b: 'http://www.baidu.com' })).to.deep.equal({ b: success });
    });

    it('validator基础url验证: https://www.baidu.com', function () {
      expect(urlValid.validField('b', { b: 'https://www.baidu.com' })).to.deep.equal({ b: success });
    });

  })


  let telValid = new Validator({
    rules: {
      b: {
        required: true
      }
    },
    tel: ['b']
  });

  var telError = { valid: false, message: typeValids.tel.message, type: "base" };

  describe('类型验证:tel', function () {
    it('tel定义初始化', function () {
      expect(telValid.getConfig("b").type).to.equal("tel");
    });

    it('validator基础tel验证: string', function () {
      expect(telValid.validField('b', { b: 'a' })).to.deep.equal({ b: telError });
    });

    it('validator基础tel验证: date', function () {
      expect(telValid.validField('b', { b: new Date() })).to.deep.equal({ b: telError });
    });

    it('validator基础tel验证: number', function () {
      expect(telValid.validField('b', { b: '1.3' })).to.deep.equal({ b: telError });
    });

    it('validator基础tel验证: 05568981829', function () {
      expect(telValid.validField('b', { b: '05568981829' })).to.deep.equal({ b: success });
    });

    it('validator基础tel验证: 0556-8981829', function () {
      expect(telValid.validField('b', { b: '0556-8981829' })).to.deep.equal({ b: success });
    });

  });



  let mobileValid = new Validator({
    rules: {
      b: {
        required: true
      }
    },
    mobile: ['b']
  });

  var mobileError = { valid: false, message: typeValids.mobile.message, type: "base" };

  describe('类型验证:mobile', function () {
    it('mobile定义初始化', function () {
      expect(mobileValid.getConfig("b").type).to.equal("mobile");
    });

    it('validator基础mobile验证: number', function () {
      expect(mobileValid.validField('b', { b: '1.3' })).to.deep.equal({ b: mobileError });
    });

    it('validator基础mobile验证: 13400000001', function () {
      expect(mobileValid.validField('b', { b: '13400000001' })).to.deep.equal({ b: success });
    });

    it('validator基础mobile验证: 8613400000001', function () {
      expect(mobileValid.validField('b', { b: '+8613400000001' })).to.deep.equal({ b: mobileError });
    });

  });


  let patternValid = new Validator({
    rules: {
      a: {
        valid: {
          pattern: /^[0-9]+$/,
          message: "请输入正确的数字格式"
        }
      }
    }
  });

  var patternError = { valid: false, message: "请输入正确的数字格式", type: "base" };

  describe('正则表达式验证:pattern', function () {

    it('validator基础pattern验证1', function () {
      expect(patternValid.validField('a', { a: '1.22a' })).to.deep.equal({ a: patternError });
    });

    it('validator基础pattern验证2', function () {
      expect(patternValid.validField('a', { a: '001000' })).to.deep.equal({ a: success });
    });

  });

  let minMaxValid = new Validator({
    rules: {
      b: {
        required: true,
        type: 'number',
        min: 12,
        max: 23
      }
    }
  });
  describe('基础验证:min max', function () {

    it('validator基础min max验证: min', function () {
      expect(minMaxValid.validField('b', { b: '1.3' })).to.deep.equal({ b: { valid: false, message: "不能小于12", type: 'base' } });
    });

    it('validator基础min max验证: max', function () {
      expect(minMaxValid.validField('b', { b: 13400000001 })).to.deep.equal({ b: { valid: false, message: "不能大于23", type: 'base' } });
    });

    it('validator基础min max验证: 正确数值', function () {
      expect(minMaxValid.validField('b', { b: '14' })).to.deep.equal({ b: success });
    });

  });


  let minMaxLenValid = new Validator({
    rules: {
      b: {
        required: true,
        minLen: 10,
        maxLen: 23
      }
    }
  });
  describe('基础验证:minLen maxLen', function () {

    it('validator基础minLen maxLen验证: minLen', function () {
      expect(minMaxLenValid.validField('b', { b: '123' })).to.deep.equal({ b: { valid: false, message: "文字长度不能少于10个字", type: "base" } });
    });

    it('validator基础minLen maxLen验证: maxLen', function () {
      expect(minMaxLenValid.validField('b', { b: '134000000011340000000113400000001' })).to.deep.equal({ b: { valid: false, message: "文字长度不能超过23个字", type: "base" } });
    });

    it('validator基础minLen maxLen验证: 正确数值', function () {
      expect(minMaxLenValid.validField('b', { b: '13400000001' })).to.deep.equal({ b: success });
    });

  });

  let combineValid = new Validator({
    rules: {
      b: {
        required: true,
        min: 10,
        max: 23,
        valid(value) {
          return value == 15 ? true : "b的值不等于15";
        }
      },
      a: {
        type: "number",
        min: 10,
        max: 23
      },
      c: {
        type: "number",
      }
    },
    number: ['d.a', 'd.b'],
    combineRules: [{
      refs: ['a', 'b'],
      valid: {
        valid: 'equal',
        message: 'a和b的值不一致'
      }
    }, {
      refs: ['c', 'b'],
      valid(value1, value2) {
        return value1 == value2 ? true : 'c和b的值不一致';
      }
    },{
      refs: ['c', 'd.a'],
      valid: {
        valid: 'lessThan',
        message: 'c必须小于d.a'
      }
    },{
      refs: ['c', 'd.b'],
      valid: {
        valid: 'greaterThan',
        message: 'c必须大于d.b'
      }
    }, {
      parentRef: 'd',
      refs: ['a', 'b'],
      valid(value1, value2) {
        return value1 == value2 ? true : 'd.a和d.b的值不一致';
      }
    }]
  });

  let combineSuccess = {type: "combine", valid: true, message: null};

  describe('combine valid验证', function () {

    it('validator基础valid验证: valid1', function () {
      expect(combineValid.validField('b', { b: '22' })).to.deep.equal({ b: { valid: false, message: "b的值不等于15", type: 'base' } });
    });

    it('validator基础valid验证: combine0', function () {
      expect(combineValid.validField('b', { b: '15', c: 15 })).to.deep.equal({ b: { valid: false, message: "a和b的值不一致", type: 'combine' } });
    });

    it('validator基础valid验证: lessThan', function () {
      expect(combineValid.validField('c', { c: '166', d: { a: '23'}})).to.deep.equal({ c: success, 'd.a': { valid: false, message: "c必须小于d.a", type: 'combine' }, 'd.b': { valid: false, message: "c必须大于d.b", type: 'combine' } });
    });

    it('validator基础valid验证: greaterThan', function () {
      expect(combineValid.validField('c', { c: '15', d: { b: '16'}})).to.deep.equal({ c: success, 'd.b': { valid: false, message: "c必须大于d.b", type: 'combine' }, 'd.a': { valid: false, message: "c必须小于d.a", type: 'combine' } });
    });

    it('validator基础valid验证: combine1', function () {
      expect(combineValid.validField('b', { b: '15', a: '14', c: 15 })).to.deep.equal({ b: { valid: false, message: "a和b的值不一致", type: 'combine' } });
    });

    it('validator基础valid验证: combine2', function () {
      expect(combineValid.validField('b', { b: '15', a: 13400000001 })).to.deep.equal({ b: { valid: false, message: "c和b的值不一致", type: 'combine' } });
    });

    it('validator基础valid验证: combine3', function () {
      expect(combineValid.validField('a', { b: '15', a: '14' })).to.deep.equal({ b: { valid: false, message: "a和b的值不一致", type: 'combine' }, a: success });
    });

    it('validator基础valid验证: combine4', function () {
      expect(combineValid.validField('b', { b: '15', a: '15', c: 1 })).to.deep.equal({ b: { valid: false, message: "c和b的值不一致", type: 'combine' } });
    });

    it('validator基础valid验证: combine5', function () {
      expect(combineValid.validField('b', { b: '15', a: '15', c: "ad" })).to.deep.equal({ b: combineSuccess });
    });

    it('validator基础valid验证: combine6', function () {
      expect(combineValid.validField('b', { b: '15', a: '15', c: 15 })).to.deep.equal({ b: combineSuccess });
    });

    it('validator基础valid验证: combine7', function () {
      expect(combineValid.validField('d.a', { d: { b: '15', a: '14' } })).to.deep.equal({ 'd.a': { valid: false, message: 'c必须小于d.a', type: 'combine' }, 'd.b': { valid: false, message: 'd.a和d.b的值不一致', type: 'combine' } });
    });

  });

  describe('Async valid验证', function () {

    let asyncValid = new Validator({
      rules: {
        id1: {
          validAsync(value, next) {
            setTimeout(() => {
              if (value == 15) {
                next('id1已存在');
              } else {
                next();
              }
            }, 1000);
          }
        },
        id2: {
          validAsync(value, next) {
            setTimeout(() => {
              if (value == 15) {
                next('id2已存在');
              } else {
                next();
              }
            }, 1000);
          }
        }
      }
    });
    it('validator基础validAsync验证: 异步1', function (done) {
      expect(asyncValid.validField('id1', { id1: '14' }, (result) => {
        expect(result).to.deep.equal({ id1: { valid: true, message: null, loading: false, type: "async" } });
        done();
      })).to.deep.equal({ id1: { valid: true, message: null, loading: true, type: "base" } });
    });

    it('validator基础validAsync验证: 异步2', function (done) {
      let result = asyncValid.validField('id1', { id1: '15' }, (result) => {
        expect(result).to.deep.equal({ id1: { valid: false, message: "id1已存在", loading: false, type: "async" } });
        done();
      });
      expect(result).to.deep.equal({ id1: { valid: true, message: null, loading: true, type: "base" } });
    });

    it('validator基础validAsync验证: 异步集成', function (done) {
      expect(asyncValid.valid({ id1: '14', id2: '14' }, null, (result) => {
        expect(result).to.deep.equal({ 
          id1: { valid: true, message: null, loading: false, type: "async" },
          id2: { valid: true, message: null, loading: false, type: "async" },
        });
        done();
      }))
      .to.deep.equal({
        id1: { valid: true, message: null, loading: true, type: "base" },
        id2: { valid: true, message: null, loading: true, type: "base" }
      });
    });

  });


}
