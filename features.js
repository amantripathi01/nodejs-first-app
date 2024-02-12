const generateLovePercent = () => {
  return `${~~(Math.random() * 100)}%`;
};

// Export the function using module.exports
module.exports = {
  generateLovePercent,
};