NwtDomQueryFunctions.prototype.printEach = function() {
  const list = this.getTarget();
  for(let index in list) {
    const item = list[index];
    console.log(`Item ${index} is: ${item.tagName}`);
  }
  return this;
};