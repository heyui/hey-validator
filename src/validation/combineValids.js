let valids = {
  lessThan(value1, value2) {
    return value1 < value2;
  },
  greaterThan(value1, value2) {
    return value1 > value2;
  },
  equal(value1, value2) {
    return value1 == value2;
  }
};
module.exports = valids;
