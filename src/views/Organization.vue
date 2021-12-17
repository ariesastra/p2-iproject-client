<template>
  <div>
    <navbar />
    <Table class="container mt-5" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Table from '../components/TableOrgs.vue'

export default {
  name: "Organization",
  components: {
    Navbar,
    Table
  },
  async created() {
    await this.fetchOrganization()
  },
  methods: {
    ...mapActions(['fetchOrganization'])
  },
  computed: {
    ...mapState(['organizationData'])
  },
}
</script>