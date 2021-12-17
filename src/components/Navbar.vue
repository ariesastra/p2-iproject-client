<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container px-4 px-lg-5">
      <a class="navbar-brand logo" href="" @click.prevent="goToHome">Tetangga</a>

      <div class="collapse navbar-collapse d-flex justify-content-end">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <!-- <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/home"
                >
                  Homepage
                </router-link>
              </li> -->
              <li class="nav-item">
                <a
                  class="nav-link"
                  href=""
                  @click.prevent="getOrganization"
                >
                  My Organization
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href=""
                  @click.prevent="getPayment"
                >
                  My Payment
                </a>
              </li>
          </ul>
          <button class="btn btn-outline-dark" @click="actionLogout">
              Logout
          </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {}
  },
  methods: {
    ...mapActions(['doLogout', 'fetchOrganization', 'fetchPayment']),
    // goToHome () {
    //   this.$router.push({ path: '/' })
    // },
    actionLogout () {
      this.doLogout()
      this.$router.push('/login')
    },
    async getOrganization () {
      await this.fetchOrganization()
      this.$router.push('/')
    },
    async getPayment () {
      await this.fetchPayment()
      this.$router.push('/payment')
    }
  }
}
</script>

<style lang='scss' scoped>
  .logo{
    font-family: 'Pacifico', cursive;
    font-family: 'Press Start 2P', cursive;
  }
</style>
