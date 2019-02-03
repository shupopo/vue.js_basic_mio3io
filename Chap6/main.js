Vue.component('my-component', {
    template: `<div>
        <p>MyComponent</p>
          <p><button v-on:click="order=!order">切り替え</button></p>
          <transition-group tag="ul" class="list">
            <li v-for="item in sortedList" v-bind:key="item.id">
              {{ item.name }} {{ item.hp }}
            </li>
  </transition-group>
    </div>`,
    data: function () {
        return {
            message: "hello",
            list: [
                {id: 1, name: 'スライム', hp: 100},
                {id: 2, name: 'ゴブリン', hp: 200},
                {id: 3, name: 'ドラゴン', hp: 500}
            ],
            show: true,
            order: false,
        }
    }
    ,
    computed: {
        sortedList: function () {
            // LodashのorderByメソッドを使用
            return _.orderBy(this.list, 'hp', this.order ? 'desc' : 'asc')
        }
    }
});


var app = new Vue({
    el: '#app'
})
