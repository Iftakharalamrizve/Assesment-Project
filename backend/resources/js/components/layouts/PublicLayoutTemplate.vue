
<template>
  <div class="wrapper-page">
    <!-- page content -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- /page content -->
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

<script>
export default {
  name: "public-layout-template",
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
};
</script>
