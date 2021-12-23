<template>
  <div id="app">
    <div id="nav" class="navBar">
      <router-link to="/">About</router-link> |
      <router-link to="/todo-list">Todo List</router-link> |
      <router-link to="/counter">Counter</router-link> |
      <router-link to="/save-links">Save Links</router-link>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.navBar {
  position: relative;
  width: 100%;
  /* background-color: #2d6d35; */
}
</style>
