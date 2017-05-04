var validator = require('../src/index');
var expect = require('chai').expect;
(function () {
  'use strict';

  describe('不同数据要求验证', function () {
    new Valid({
      rules: {
        a: {
          valid: 'int|number|email|url|tel|mobile|globalmobile', //可以自定义
          required: true,
          maxlen: 1000,
          minlen: 2
        },
        b: {
          valid: {
            pattern: /^[0-9]+$/,
            message: "请输入正确的数字格式"
          },
          required: true,
          min: 1,
          max: 5
        },
        c: {
          required: true,
          valid: ['int', (prop, parent, data) {
            if (resp.isExsit) {
              return "错误";
            }
            return true;
          }],
          validAsync(prop, parent, next, data) {
            $.ajax('/test').then((resp)) {
              if (resp.isExsit) {
                next("已存在");
              }
              next();
            }
          }
        },
        "d.b": {

        },
        "e[].a": {

        }
      },
      combineRules: [{
        parentRef: 'a[]',
        refs: ['b', 'c'],
        valid() {
          if (condition) {
            return new Error("a不能大于b");
          }
          return true;
        }
      }, {
        refs: ['b', 'c'],
        valid: 'lessThan', //greaterThan
        message: "开始时间必须小于结束时间"
      }, {
        refs: ['d', 'e'],
        valid: 'equal',
        message: "两次密码输入必须一致"
      }],
      required: ['b', 'c', 'e', 'f', 'e', "d.b", "e[].a"],
      int: ['a'],
      number: ['a'],
      email: ['a'],
      url: ['a'],
      tel: ['a'],
      mobile: ['a'],
      globalmobile: ['a'] //国际号码
    });

    it('validator非空', function () {
      let d = new manba();
      expect(validator({ required: ['a'] }).valid({ a: '' })).to.equal(false);
    });
  });

}());
