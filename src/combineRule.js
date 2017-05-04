import utils from 'hey-utils';
import combineValids from './validation/combineValids';
import baseValids from './validation/baseValids';

class CombineRule {
  constructor(rules) {
    if (!utils.isArray(rules)) {
      console.error("validator:请传递正确的CombineRule参数");
    }
    this.rules = {};
    this.initRules(rules);
  }

  initRules(rules) {
    let genRules = {};
    for (let rule of rules) {
      let parentRef = '';
      if (rule.parentRef) parentRef = `${rule.parentRef}.`;
      for (let ref of rule.refs) {
        let refProp = parentRef + ref;
        if (utils.isArray(genRules[refProp])) {
          genRules[refProp].push(rule);
        } else {
          genRules[refProp] = { rule };
        }
      }
    }
    this.rules = genRules;
    console.log(rules);
  }

  valid(prop, value, parent, data) {
    let rules = genRules[prop];
    if (!rules) return true;
    for (let rule of rules) {
      let values = [];
      for (let ref of rule.refs) {
        let v = utils.getKeyValue(parent, ref);
        //当有参数为空时暂时不验证
        if (baseValids.required.valid(v) != true) {
          return true;
        }
        values.push(v);
      }
      let valid = null;
      if (utils.isString(rule.valid)) {
        valid = baseValids(rule.valid);
        if (utils.isNull(valid)) {
          throw Error(`不存在命名为${valid}的验证规则`);
        }
        let result = valid.apply(null, values, parent);
        if (result !== true) {
          return result;
        }
      }
    }
    return true;
  }
}

module.exports = CombineRule;
