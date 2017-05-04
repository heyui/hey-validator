var validator = require('../src/index');
var expect = require('chai').expect;
(function () {
  'use strict';

  describe('不同数据要求验证', function () {
    it('validator非空', function () {
      let d = new manba();
      expect(validator({ required: ['a'] }).valid({ a: '' })).to.equal(false);
    });
  });

}());
