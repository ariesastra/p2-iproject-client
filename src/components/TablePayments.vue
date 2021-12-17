<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>Payments Table</h3>
          <p class="text-subtitle text-muted">List of Payments</p>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <p>Payment List</p>
        </div>
        <div class="card-body">
          <img src="" alt="">
          <table class="table table-striped" id="tableOrganization">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Event Owner</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="pay in paymentData"
                :key="pay.id"
              >
                <td>{{pay.Organization.name}}</td>
                <td>{{pay.Organization.description}}</td>
                <td>{{pay.Organization.User.email}}</td>
                <td>{{pay.Organization.price}}</td>
                <td>
                  <span class="badge badge-warning" v-if="pay.status === 'pending'">
                    {{pay.status}}
                  </span>
                  <span class="badge badge-success" v-if="pay.status === 'paid'">
                    {{pay.status}}
                  </span>
                </td>
                <td class="d-flex justify-content-center">
                  <button 
                    class="btn btn-outline-success mx-auto"
                    @click="collectData({
                      id: pay.id,
                      amount: pay.Organization.price,
                      name: pay.Organization.name,
                      description: pay.Organization.description,
                    })"
                    :disabled="pay.status === 'paid'"
                  >
                    Make Payment
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { server } from '../../apis/axios'

export default {
  name: "TablePayments",
  data() {
    return{ 
      UserId: ''
    }
  },
  async created() {
    await this.fetchProfile()
    this.UserId = this.profileData.UserId
    await this.fetchPayment(this.UserId)

    if (this.$route.query.success === 'true') {
      await this.successPayment(this.$route.query.paymentId)
      await this.fetchPayment(this.UserId)
      this.$toast.success(this.successResponse)
    }
    else if (this.$route.query.success === 'false') {
      this.$toast.error('Payment Unsuccessful !')
    }
  },
  methods: {
    ...mapActions(['fetchPayment', 'fetchProfile', 'successPayment']),
    collectData(data) {
      try {
        const stripe = [{
          price_data: {
            currency: 'idr',
            product_data: {
              name: data.name,
              description: data.description
            },
            unit_amount: data.amount
          },
          quantity: 1
        }]

        const dataStripe = {
          idPayment: data.id,
          stripe
        }

        this.makePayment(dataStripe) 
      } catch (error) {
        console.log(error)
      }
    },
    async makePayment(stripe) {
      try {
        const result = await server.post('/payment/stripe-checkout-session', 
          stripe, 
          {
            headers: {
              access_token: this.access_token
            }
          }
        )
        
        window.location.href = result.data.url
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapState(['paymentData', 'profileData', 'access_token', 'successResponse'])
  },
}
</script>