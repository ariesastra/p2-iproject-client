<template>
<div class="bg-light vh-100 vw-100 d-flex justify-content-center align-items-center overflow-hidden">
  <div class="container-fluid">
    <div class="row">
      <div class="col-6 d-flex justify-content-center align-items-center">
        <div class="bg-white px-5 pt-5 pb-4 rounded w-50">
          <h1 class="mb-3 text-center font-weight-bold mt-3">Tetangga</h1>
          <b-form class="text-center" @submit.prevent="actionLogin">
            <b-form-group
              id="input-group-1"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label-for="password"
            >
              <b-form-input
                id="password"
                v-model="form.password"
                placeholder="Enter Password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" block variant="primary">Login</b-button>
          </b-form>
          <p
            class="text-centered my-3"
          >
            or using your google account
          </p>
          <!-- <GoogleBtn /> -->
            <GoogleLogin
              class="btn btn-light btn-block btn-outline"
              :params="params"
              :onSuccess="onSuccess"
              :onFailure="onFailure"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 48 48"
                  class="abcRioButtonSvg"
                >
                  <g>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg>
              </span>
              Sign in With Google
            </GoogleLogin>
          <p class="text-center mt-4">
            Register to see Our awesome 
            <router-link
              to="/register"
            >
              here !
            </router-link>
          </p>
        </div>
      </div>
      <div class="col-6 img-side">
        <img src="../assets/tetangga-login.jpg" alt="Background Login">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  components: { GoogleLogin },
  data() {
    return {
      params: {
        client_id: '426181688893-f60v6flscgglm36pgf8fhj25m66jght0.apps.googleusercontent.com'
      },
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['doLogin', 'googleAuth']),
    async onSuccess (googleUser) {
      const profile = googleUser.getBasicProfile()
      const email = profile.getEmail()
      const password = new Date().getTime()

      await this.googleAuth({
        idToken: googleUser.getAuthResponse().id_token,
        email,
        password
      })

      if (this.isLogin) {
        this.$router.push('/')
      } else if (this.errorResponse) {
        this.$toast.error(this.errorResponse.msg)
      }
    },
    onFailure (failure) {
      this.$toast.error(failure.response.data)
    },
    async actionLogin () {
      await this.doLogin(this.form)

      if (this.isLogin) {
        if (this.isFillProfile) {
          this.$router.push('/')
        }
        else {
          this.$router.push('/profile')
        }
      } else if (this.errorResponse) {
        this.$toast.error(this.errorResponse.message)
      }
    }
  },
  created() {

  },
  computed: {
    ...mapState(['isLogin', 'isFillProfile'])
  }
}
</script>

<style lang="scss">
h1{
  font-family: 'Pacifico', cursive;
  font-family: 'Press Start 2P', cursive;
}
.img-side{
  img{
    width: 100%;
    min-height: 100vh;
  }
}
</style>
