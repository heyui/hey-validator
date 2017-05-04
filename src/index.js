import utils from 'hey-utils';
import valids from './validation/valids';
import baseValids from './validation/baseValids';

function ruleExecute(rule, value, configValue) {
  if (utils.isFunction(rule)) {
    return rule.call(null, value, configValue);
  } else if (utils.isObject(rule)) {
    let result = null;
    if (rule.pattern) {
      result = rule.pattern.test(new String(value));
    } else if (utils.isFunction(rule.valid)) {
      result = rule.pattern.test(new String(value));
    }
    return result === true ? true : rule.message;
  }
}

const DEFAULT = {
  rules: {},
  combineRules: []
}
class Validator {
  constructor(rules) {
    if (!utils.isObject(rules)) {
      console.error("validator:请传递正确的验证参数");
    }
    this.rules = {};
    this.initRules(rules);
  }

  initRules(rules) {
    let genRules = {};
    utils.extend(true, genRules, DEFAULT, rules);
    for (let v in valids) {
      let validList = rules[v];
      if (utils.isArray(validList)) {
        for (let p of validList) {
          let rule = genRules.rules[p];
          if (utils.isObject(rule)) {
            if (v == 'required') {
              rule.required = true;
            } else {
              if (utils.isArray(rule.valid)) {
                rule.valid.unshift(v);
              } else {
                let old = rule.valid;
                rule.valid = [v];
                if (!utils.isNull(old)) {
                  rule.valid.push(old);
                }
              }
            }
          }
        }
      }
    }
    console.log(genRules.rules);
    console.log(genRules.combineRules);
    genRules.combineRules = new CombineRule(genRules.combineRules);
    this.rules = genRules;
  }

  valid(data) {

  }

  validField(prop, next, data) {
    if (utils.isNull(prop)) {
      next();
    }

    let ruleKey = prop;
    let value = utils.getKeyValue(this.model, prop);
    if (prop.indexOf("[") > -1) {
      let ruleKey = prop.replace(/\[\w+\]/, "[]");
    }
    let parent = data;
    if (prop.lastIndexOf(".") > -1) {
      let parentProp = prop.substr(0, prop.lastIndexOf("."));
      parent = utils.getKeyValue(data, parentProp);
    }

    let rule = this.rules.rules[ruleKey];
    if (rule) {
      let baseValidKeys = Object.keys(baseValids);
      for (let key of baseValidKeys) {
        if (!utils.isNull(rule[key])) {
          let result = ruleExecute(baseValids[key], value, rule[key]);
          if (result !== true) next(result);
        }
      }
    }
    let result = this.rules.combineRules.valid(ruleKey, value, parent, data);
    if (result !== true) next(result);
    if (utils.isFunction(rule.validAsync)) {
      rule.validAsync.call(null, value, next, parent, data);
    } else {
      next();
    }
  }
}

module.exports = Validator;
