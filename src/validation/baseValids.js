let valids = {
  required: {
    valid(value) {
      return value !== null && value !== undefined && new String(value).length > 0;
    },
    message: '字段不能为空'
  },
  maxLen(value, length) {
    let result = value !== null && value !== undefined && new String(value).length <= length;
    return result === true ? true : `长度不能大于${length}`;
  },
  minLen(value, length) {
    let result = value !== null && value !== undefined && new String(value).length >= length;
    return result === true ? true : `长度不能小于${length}`;
  },
  max(value, configValue) {
    let result = value !== null && value !== undefined && new Number(value) <= configValue;
    return result === true ? true : `不能小于${length}`;
  },
  max(value, configValue) {
    let result = value !== null && value !== undefined && new Number(value) >= configValue;
    return result === true ? true : `不能大于${length}`;
  }
};
module.exports = valids;
