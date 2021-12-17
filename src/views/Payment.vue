<template>
<div>
  <navbar />
  <table-payments class="container mt-5"/>
  <div class="container d-flex justify-content-center mt-5">
  </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import TablePayments from '../components/TablePayments.vue'

export default {
  name: 'Payment',
  components: {
    Navbar,
    TablePayments
  },
  data() {
    return {
      UserId: 0
    }
  },
  created() {
  },
  methods: {
  },
  computed: {
  }
}
</script>