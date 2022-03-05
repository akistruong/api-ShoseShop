class ApiFeature {
  input;
  actions;
  constructor(input, actions) {
    this.input = input;
    this.actions = actions;
  }
  pagging() {
    const page = this.actions.page * 1 || 1;
    const limit = this.actions.limit * 1 || 5;
    const start = (page - 1) * limit;
    const end = start + limit;
    this.input = this.input.slice(start, end);
    return this;
  }
  sort() {
    const time = this.actions?.sortByDate;
    const price = this.actions?.sortByPrice;
    if (time) {
      this.input = this.input.sort((a, b) => {
        if (time == "-1") {
          return b.createdAt - a.createdAt;
        } else {
          return a.createdAt - b.createdAt;
        }
      });
    } else if (price) {
      this.input = this.input.sort((a, b) => {
        if (price == "-1") {
          return b.price - a.price;
        } else {
          return a.price - b.price;
        }
      });
    } else {
      return this;
    }

    return this;
  }
}

module.exports = ApiFeature;
