export default{
    methods: {
        giveFatherMoney(money) {
            // this.$parent可以拿到父组件对象，操作父组件对象的数据
            // this.$parent如果拿到的一个父组件对象没问题，如果这个子组件有多个父亲，那么就出问题
          // console.log(this.$parent);
          this.money -= money;
          //   this.$parent.forEach((item) => (item.money += 50));
          this.$parent.money += money;
        },
      },
}