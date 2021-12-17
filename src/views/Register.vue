<template>
<div class="content">
  <img src="../assets/register-bg.jpg" class="bg-img" alt="">
  <div class="container">
    <div class="row">
      <div class="
        col-12
        min-vh-100
        d-flex
        justify-content-center
        align-items-center
      ">
        <div class="bg-white rounded p-5 w-75">
          <h1 class="text-center font-weight-bold mt-2 mb-2">Tetangga</h1>
          <h3 class="text-center font-weight-bold mb-5">Register Form</h3>
          <div>
            <form @submit.prevent="submitRegister">
              <h5>Login Credentials</h5>
              <div class="form-row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model="formRegister.email">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" v-model="formRegister.password">
                  </div>
                </div>
              </div>
              
              <h5>Profile Info</h5>
              <div class="form-row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="fullName">Nama Lengkap</label>
                    <input type="text" class="form-control" id="fullName" v-model="formRegister.namaLengkap">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="profileImage">Gambar Porfil</label>
                    <input type="file" class="form-control-file" ref="file" name="file" id="profileImage" @change="bashImg($event)">
                  </div>
                </div>
                <div class="col-md-12">
                <div class="form-group">
                  <label for="address">Alamat</label>
                  <textarea class="form-control" id="address" rows="2" v-model="formRegister.alamat"></textarea>
                </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">  
                    <label for="rtRw">RT / RW</label>
                    <input type="text" class="form-control" id="rtRw" v-model="formRegister.rtRw">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="kelurahan">Keluarahan</label>
                    <input type="text" class="form-control" id="kelurahan" v-model="formRegister.kelurahan">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="kecamatan">Kecamatan</label>
                    <input type="text" class="form-control" id="kecamatan" v-model="formRegister.kecamatan">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="kotaKab">Kota / Kab</label>
                    <input type="text" class="form-control" id="kotaKab" v-model="formRegister.kotaKab">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="provinsi">Provinsi</label>
                    <input type="text" class="form-control" id="provinsi" v-model="formRegister.provinsi">
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <input type="submit" class="btn btn-primary w-25" value="Register">
              </div>
            </form>
              
            <p class="text-center mt-4">
              Already have an account ? go back to
              <router-link
                to="/"
              >
                Login!
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      formRegister: {
        email: '',
        password: '',
        namaLengkap: '',
        profileImg: '',
        alamat: '',
        rtRw: '',
        kelurahan: '',
        kecamatan: '',
        kotaKab: '',
        provinsi: ''
      }
    }
  },
  methods: {
    ...mapActions(['register', 'clearResponse']),
    ...mapMutations({ registered: 'MUTATE_IS_REGISTER' }),
    pageLogin () {
      this.$router.push({ path: '/' })
    },
    bashImg () {
      this.formRegister.profileImg = this.$refs.file.files[0]
    },
    async submitRegister () {
      await this.register(this.formRegister)

      if (this.isRegistered) {
        this.$toast.success('Success Register, you can login now !')
        this.$router.push('/login')
        this.registered(false)
      }
      else if (this.errorResponse) {
        const error = await this.errorResponse.message
        console.log(error);
        error.forEach(el => {
          this.$toast.error(el)
          this.clearResponse()
        })
      }
    }
  },
  computed: {
    ...mapState(['isRegistered', 'errorResponse'])
  }
}
</script>

<style lang='scss'>
.content{
  overflow: hidden;
  position: relative;
  h1{
    font-family: 'Pacifico', cursive;
    font-family: 'Press Start 2P', cursive;
  }
  .bg-img{
    height: 100%;
    min-width: 100vw;
    position: absolute;
  }
  .card-register{
    width: 400px;
    background-color: white;
    height: auto;
    position: absolute;
    padding: 3em;
    margin: auto 0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
