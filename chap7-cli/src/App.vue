<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/product">商品情報</router-link>
    </nav>
    <!-- ここにパスと一致したコンポーネントが埋め込まれる -->
    <router-view />
  </div>
</template>

<style>
    /* ナビゲーション */
  nav {
    display: flex;
    align-items: center;
    background: #222;
  }
  nav a {
    display: block;
    padding: 0.5em;
    color: #eee;
    line-height: 1em;
    text-decoration: none;
  }
  /* アクティブなリンク */
  .router-link-active {
    background: palevioletred;
  }
</style>
