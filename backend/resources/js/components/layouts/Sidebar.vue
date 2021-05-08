<template>
  <div class="left side-menu">
    <div class="slimscroll-menu" id="remove-scroll">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu" id="side-menu">
          <li class="menu-title">Main</li>
          <li>
            <a href="index.html" class="waves-effect">
              <i class="mdi mdi-view-dashboard"></i>
              <span class="badge badge-primary badge-pill float-right">2</span>
              <span>Dashboard</span>
            </a>
          </li>
            <li>
                <a href="javascript:void(0);" class="waves-effect">
                    <i class="mdi  mdi-wallet-travel"></i>
                    <span>
                Master
                <span class="float-right menu-arrow">
                  <i class="mdi mdi-chevron-right"></i>
                </span>
              </span>
                </a>
                <ul class="submenu">

                    <li>
                        <router-link :to="{ name: 'business-settings'}" class="waves-effect">
                            <i class="mdi mdi-settings"></i>
                            <span>Business Settings</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'product-category'}" class="waves-effect">
                            <i class="mdi mdi-calendar-check"></i>
                            <span>Product Categories</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'warehouses'}" class="waves-effect">
                            <i class="mdi mdi-home-modern"></i>
                            <span>Warehouses</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'suppliers'}" class="waves-effect">
                            <i class="mdi mdi-truck"></i>
                            <span>Suppliers</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'product-list'}" class="waves-effect">
                            <i class="mdi mdi-truck"></i>
                            <span>Product</span>
                        </router-link>
                    </li>

                </ul>
            </li>
          <li class="menu-title">STOCK IN</li>

            <li>
                <router-link :to="{ name: 'add-purchase'}" class="waves-effect">
                    <i class="mdi mdi-truck"></i>
                    <span>Purchases</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Suppliers'}" class="waves-effect">
                    <i class="mdi mdi-keyboard-return"></i>
                    <span>Sales Returns</span>
                </router-link>
            </li>

          <li class="menu-title">STOCK OUT</li>
          <li>
            <a href="javascript:void(0);" class="waves-effect">
              <i class="mdi mdi-account-location"></i>
              <span>
                Customers
                <span class="float-right menu-arrow">
                  <i class="mdi mdi-chevron-right"></i>
                </span>
              </span>
            </a>
            <ul class="submenu">
              <li>
                <a href="pages-login.html">Login</a>
              </li>
              <li>
                <a href="pages-register.html">Register</a>
              </li>
              <li>
                <a href="pages-recoverpw.html">Recover Password</a>
              </li>
              <li>
                <a href="pages-lock-screen.html">Lock Screen</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);" class="waves-effect">
              <i class="mdi mdi-google-pages"></i>
              <span>
                Sale Quotations
                <span class="float-right menu-arrow">
                  <i class="mdi mdi-chevron-right"></i>
                </span>
              </span>
            </a>
            <ul class="submenu">
              <li>
                <a href="pages-timeline.html">Timeline</a>
              </li>
              <li>
                <a href="pages-invoice.html">Invoice</a>
              </li>
              <li>
                <a href="pages-directory.html">Directory</a>
              </li>
              <li>
                <a href="pages-blank.html">Blank Page</a>
              </li>
              <li>
                <a href="pages-404.html">Error 404</a>
              </li>
              <li>
                <a href="pages-500.html">Error 500</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);" class="waves-effect">
              <i class="mdi mdi-google-pages"></i>
              <span>
                Sales
                <span class="float-right menu-arrow">
                  <i class="mdi mdi-chevron-right"></i>
                </span>
              </span>
            </a>
            <ul class="submenu">
              <li>
                <a href="pages-timeline.html">Timeline</a>
              </li>
              <li>
                <a href="pages-invoice.html">Invoice</a>
              </li>
              <li>
                <a href="pages-directory.html">Directory</a>
              </li>
              <li>
                <a href="pages-blank.html">Blank Page</a>
              </li>
              <li>
                <a href="pages-404.html">Error 404</a>
              </li>
              <li>
                <a href="pages-500.html">Error 500</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);" class="waves-effect">
              <i class="mdi mdi-google-pages"></i>
              <span>Sale Returns</span>
            </a>
          </li>
          <li class="menu-title">TRANSACTIONS</li>
          <li>
            <a href="javascript:void(0);" class="waves-effect">
              <i class="mdi mdi-google-pages"></i>
              <span>Account Receivables</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);" class="waves-effect">
              <i class="mdi mdi-google-pages"></i>
              <span>Account Payables</span>
            </a>
          </li>
          <li class="menu-title">HELP</li>
          <li>
            <a href="javascript:void(0);" class="waves-effect">
              <i class="mdi mdi-google-pages"></i>
              <span>About Software</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);" class="waves-effect">
              <i class="mdi mdi-google-pages"></i>
              <span>License</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
      <div class="clearfix"></div>
    </div>
    <!-- Sidebar -left -->
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>
