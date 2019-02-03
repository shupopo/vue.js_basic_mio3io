Vue.component('my-component', {
    template: `<div>
        <p>MyComponent</p>
        <comp-child :val="message" v-on:childs-event="parentsMethod" ref="child">slot here
        <p slot-scope="props">
        {{ props.text }}
        </p></comp-child>
        <ul>
          <comp-child2 v-for="item in list"
            v-bind:key="item.id"
            :id = "item.id"
            v-bind:name="item.name"
            v-bind:hp="item.hp"
            v-on:attack="handleAttack"></comp-child2>
        </ul>
        <button v-on:click="handleClick">comp-child呼び出し</button>
    </div>`,
    data: function () {
        return {
            message: "hello",
            list: [
                {id: 1, name: 'スライム', hp: 100},
                {id: 2, name: 'ゴブリン', hp: 200},
                {id: 3, name: 'ドラゴン', hp: 500}
            ]
        }
    },
    methods: {
        parentsMethod: function () {
            alert('イベントをキャッチ！ ')
        },
        handleAttack: function (id) {
            // 引数のIDから要素を検索
            var item = this.list.find(function (el) {
                return el.id === id
            })
            // HPが0より多ければ10減らす
            if (item !== undefined && item.hp > 0) item.hp -= 10
        },
        handleClick: function () {
            // 子コンポーネントのイベントを発火
            this.$refs.child.$emit('open')
        }
    }
});

Vue.component('comp-child', {
    // テンプレートで受け取ったvalを使用
    template: `<div>
            <p>{{ val }}</p>
            <button v-on:click="handleClick">イベント発火</button>
            what?<slot></slot>
            <slot text="hello"></slot>
                </div>`,
    // 受け取る属性名を指定
    props: {
        val: {
            type: String,
            required: true
        }
    },
    methods: {
        // ボタンのクリックイベントのハンドラでchilds-eventを発火する
        handleClick: function () {
            this.$emit('childs-event')
        }
    },
    created: function () {
        // 自分自身のイベント
        this.$on('open', function () {
            alert('親から呼び出し')
        })
    }
});

Vue.component('comp-child2', {
    template:
        '<li>id {{ id }}{{ name }} HP.{{ hp }}<button v-on:click="doAttack">攻撃する</button></li>',
    props: ['id', 'name', 'hp'],
    methods: {
        doAttack: function () {
            // 引数として自分のIDを渡す
            //alert("ugoita")
            this.$emit('attack', this.id)
        }
    }
})

var app = new Vue({
    el: '#app'
})
