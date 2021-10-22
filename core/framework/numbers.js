//Functional numbers framework
module.exports = {
  generateRandomID: function () {
    return randomNumber(0, 100000000000).toString();
  },

  randomNumber: function (min, max) {
  	return Math.round(Math.random() * (max - min) + min);
  }
};
