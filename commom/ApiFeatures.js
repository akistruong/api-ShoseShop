class ApiFeature {
  input;
  actions;
  constructor(input, actions) {
    this.input = input;
    this.actions = actions;
  }
  pagging() {
    const page = this.actions.page * 1 || 1;
    const limit = this.actions.limit * 1 || 20;
    const start = (page - 1) * limit;
    console.log(start);
    const end = start + limit;
    console.log(end);
    this.input = this.input.slice(start, end);
    return this;
  }
  sort() {
    const time = this.actions?.sortByDate;
    const price = this.actions?.sortByPrice;
    console.log(time + price);
    if (time) {
      this.input = this.input.sort((a, b) => {
        if (time == "-1") {
          return new Date(b.createdAt) - Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - Date(b.createdAt);
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
