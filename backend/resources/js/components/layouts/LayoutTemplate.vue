
<template>
  <div id="wrapper">
    <!-- Top Bar Start -->
    <TopBar />
    <!-- Top Bar End -->
    <!-- ========== Left Sidebar Start ========== -->
    <Sidebar />
    <!-- Left Sidebar End -->
    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="content-page">
      <!-- Start content -->
      <div class="content">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
        <!-- container-fluid -->
      </div>
      <!-- content -->
      <Footer />
    </div>
    <!-- ============================================================== -->
    <!-- End Right content here -->
    <!-- ============================================================== -->
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
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default {
  name: "layouttemplate",
  data() {
    return {
      routerViewKey: 0
    };
  },
  components: {
    TopBar,
    Sidebar,
    Footer
  },
  computed: {
    loggedIn() {}
  },
  methods: {
    refreshRouterView() {
      this.routerViewKey += 1;
    }
  },
  created() {
    this.$root.$on("refreshRouterView", this.refreshRouterView);
  },
  destroyed() {
    this.$root.$off("refreshRouterView", this.refreshRouterView);
  }
};
</script>
