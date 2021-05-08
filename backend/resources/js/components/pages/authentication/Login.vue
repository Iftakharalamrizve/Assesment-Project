<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h3 class="text-center m-0">
          <a href="index.html" class="logo logo-admin">
            <img src="admin_template/images/logo.png" height="30" alt="logo" />
          </a>
        </h3>
        <div class="p-3">
          <h4 class="text-muted font-18 m-b-5 text-center">Inventory Management Software</h4>
          <p class="text-muted text-center">Sign in to continue</p>
          <div
            class="alert alert-danger"
            v-if="authenticationError"
            role="alert"
          >{{ authenticationError }}</div>
          <form class="form-horizontal m-t-30" @submit.prevent="login">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                class="form-control"
                v-model="credentials.email"
                v-bind:class="{'is-invalid':validationErrors.email}"
                placeholder="Enter email"
              />
              <small
                class="text-danger"
                v-if="validationErrors.email"
              >{{ validationErrors.email[0] }}</small>
            </div>
            <div class="form-group">
              <label for="userpassword">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="credentials.password"
                v-bind:class="{'is-invalid':validationErrors.password}"
                placeholder="Enter password"
              />
              <small
                class="text-danger"
                v-if="validationErrors.password"
              >{{ validationErrors.password[0] }}</small>
            </div>
            <div class="form-group row m-t-20">
              <div class="col-6">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customControlInline" />
                  <label class="custom-control-label" for="customControlInline">Remember me</label>
                </div>
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
              </div>
            </div>
            <div class="form-group m-t-10 mb-0 row">
              <div class="col-12 m-t-20">
                <a href="pages-recoverpw.html" class="text-muted">
                  <i class="mdi mdi-lock"></i> Forgot your password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="m-t-40 text-center">
      <p>
        Don't have an account ?
        <a href="pages-register.html" class="text-primary">Signup Now</a>
      </p>
      <p>© 2020 SoftKeting</p>
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  name: "login",
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", this.credentials)
        .then((response) => {
          this.$toast.success("Logged in successfully");
          this.$router.go();
        })
        .catch((error) => {});
    },
  },
  computed: {
    validationErrors() {
      return this.$store.getters.loginValidationErrors;
    },
    authenticationError() {
      return this.$store.getters.loginError;
    },
  },
};
</script>
