<template>
  <div>
    <h3 class="text-left font-weight-bold mt-5 mb-2">Add New Organization</h3>
    <p>
      Add new orgnaization for creating a payment for your member
    </p>
    <div class="d-flex justify-content-center">
      <form class="w-75" @submit.prevent="submitOrganization">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="formOrganization.name">
          </div>
          <div class="form-group col-md-6">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" rows="2" v-model="formOrganization.description"></textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputAddress">Is Paid</label>
            <select id="inputState" class="form-control" v-model="formOrganization.isPaid">
              <option selected>Choose...</option>
              <option value="true">Paid</option>
              <option value="false">Unpaid</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="price">Price</label>
            <input type="number" class="form-control" id="price" min="100000" v-model="formOrganization.price">
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <a href="" class="btn btn-outline-secondary mx-2 w-25" @click.prevent="$router.go(-1)">Go Back</a>
          <button type="submit" class="btn btn-primary mx-2 w-25">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "FormAddOrg",
  data() {
    return {
      formOrganization: {
        name: '',
        description: '',
        isPaid: '',
        price: 0
      }
    }
  },
  methods: {
    ...mapActions(['createOrganization']),
    async submitOrganization () {
      await this.createOrganization(this.formOrganization)

      if (this.successResponse) {
        this.$router.push('/')
        this.$toast.success(this.successResponse)
      } else if (this.errorResponse) {
        this.$toast.error(this.errorResponse)
      }
    }
  },
  computed: {
    ...mapState(['successResponse', 'errorResponse'])
  }
}
</script>