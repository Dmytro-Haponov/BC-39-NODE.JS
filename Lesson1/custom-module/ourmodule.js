//Export example 1
/* const getCurrentTime = () => {
  return Date.now();
};

module.exports = {
  getCurrentTime
}; */

//Export module example 2
exports.getCurrentTime = () => {
  return Date.now();
};
