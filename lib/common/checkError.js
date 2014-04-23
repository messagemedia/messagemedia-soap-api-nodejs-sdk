exports.containsCode = function(errors, code) {
  for (var i = 0; i < errors.length; i++) {
    if (errors[i].code === code) {
      return true;
    }
    return false;
  }
};