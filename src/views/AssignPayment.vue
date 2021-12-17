<template>
  <div>
    <navbar />
    <div class="container">
      <h3 class="text-left font-weight-bold mt-5 mb-2">Assign New Payment</h3>
      <p>
        Assing Other member using their email to activate payment
      </p>
      <div class="d-flex justify-content-center">
        <form class="w-75" @submit.prevent="submitNewPayment">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name">Email</label>
              <input type="email" class="form-control" id="name" v-model="formPayment.email">
            </div>  
            <div class="form-group col-md-6">
              <label for="inputAddress">Organization Name</label>
              <select id="inputState" class="form-control" v-model="formPayment.OrganizationId">
                <option selected>Choose...</option>
                <option 
                  v-for="orgs in this.organizationData" 
                  :key="orgs.id" 
                  :value="orgs.id"
                >
                  {{ orgs.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <a href="" class="btn btn-outline-secondary mx-2 w-25" @click.prevent="$router.go(-1)">Go Back</a>
            <button type="submit" class="btn btn-primary mx-2 w-25">Assign</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
import { mapActions, mapState } from 'vuex'

export default {
  name: "AssignPayment",
  components: {
    Navbar
  },
  data() {
    return {
      formPayment: {
        email: '',
        OrganizationId: ''
      }
    }
  },
  async created() {
    await this.fetchOrganization()
  },
  methods: {
    ...mapActions(['fetchOrganization', 'createPayment']),
    async submitNewPayment () {
      await this.createPayment(this.formPayment)

      if (this.successResponse) {
        this.$router.push('/')
        this.$toast.success(this.successResponse)
      }
      else if (this.errorResponse) {
        this.$toast.error(this.errorResponse)
      }
    },
  },
  computed: {
    ...mapState(['organizationData', 'errorResponse','successResponse'])
  }
}
</script>