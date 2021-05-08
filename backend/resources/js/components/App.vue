<template>
  <div class="vue-component-wrapper" id="wrapper">
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <div id="overlay" v-if="showLoader">
          <div id="text">
            <div class="loader"></div>
          </div>
        </div>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.nav-md .container.body .right_col {
  padding: 10px 20px 0;
  margin-left: 230px;
  height: 500px;
}
</style>

<script>
export default {
  name: "App",
  data() {
    return {
      routerViewKey: 0,
    };
  },
  computed: {
    loggedIn() {},
  },
  methods: {
    refreshRouterView() {
      this.routerViewKey += 1;
    },
  },
  created() {
    this.$root.$on("refreshRouterView", this.refreshRouterView);
  },
  destroyed() {
    this.$root.$off("refreshRouterView", this.refreshRouterView);
  },
  computed: {
    showLoader() {
      return this.$store.state.commonStore.showLoader;
    },
  },
};
</script>
<style scoped>
#overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
}

#text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>