var scroll = new SmoothScroll()


app = new Vue({
    el: '#app',
    data: {
        show: true,
        message: "Let's vue",
        count: 0,
        isChild: true,
        isActive: true,
        radius: 50,
        list: [
            {id: 1, name: 'スライム', hp: 100},
            {id: 2, name: 'ゴブリン', hp: 200},
            {id: 3, name: 'ドラゴン', hp: 500}
        ],
        val: true,
        width: 900,
        budget: 300,
        // 表示件数
        limit: 2,
        // もとになるリスト
        list2: [
            {id: 1, name: 'りんご', price: 100},
            {id: 2, name: 'ばなな', price: 200},
            {id: 3, name: 'いちご', price: 400},
            {id: 4, name: 'おれんじ', price: 300},
            {id: 5, name: 'めろん', price: 500}
        ],
        list3: [],
        current: '',
        topics: [
            {value: 'vue', name: 'Vue.js'},
            {value: 'jQuery', name: 'jQuery'}
        ]

    },
    created: function () {
        // ハンドラを登録
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy: function () {
        // ハンドラを解除（コンポーネントやSPAの場合忘れずに！）
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        // ボタンをクリックしたときのハンドラ
        increment: function () {
            this.count += 1 // 処理は再代入するだけでOK！
        },
        doAdd: function () {
            // リスト内で1番大きいIDを取得
            var max = this.list.reduce(function (a, b) {
                return a > b.id ? a : b.id
            }, 0)
            // 新しいモンスターをリストに追加
            this.list.push({
                id: max + 1, // 現在の最大のIDに+1してユニークなIDを作成
                name: this.name, // 現在のフォームの入力値
                hp: 500
            });
            this.name = null;
        },
        doAttack: function (index) {
            this.list[index].hp -= 10 // HPを減らす

        },
        handleClick: function () {
            alert('クリックしたよ')
        },
        handleInput: function (event) {
            // 代入前に何か処理を行う…
            this.message = event.target.value
        },
        // 違和感のない程度に200ms間隔でscrollデータを更新する例
        handleScroll: function () {
            if (this.timer === null) {
                this.timer = setTimeout(function () {
                    this.scrollY = window.scrollY
                    clearTimeout(this.timer)
                    this.timer = null
                }.bind(this), 200)
            }
        },
        scrollTop: function () {
            scroll.animateScroll(0)
        }
    },
    computed: {
        // 算出プロパティhalfWidthを定義
        halfWidth: function () {
            return this.width / 2
        },
        matched: function () {
            return this.list2.filter(function (el) {
                return el.price <= this.budget
            }, this)
        },
        limited: function () {
            return this.matched.slice(0, this.limit)
        }
    },
    watch: {
        current: function (val) {
            // GitHubのAPIからトピックのリポジトリを検索
            axios.get('https://api.github.com/search/repositories', {
                params: {
                    q: 'topic:' + val
                }
            }).then(function (response) {
                this.list3 = response.data.items
            }.bind(this))
        }
    },
})
