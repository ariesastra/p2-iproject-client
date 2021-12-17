<template>
  <div>
    <navbar />
    <div class="container">
      <form-add-org></form-add-org>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
import FormAddOrg from "../components/FormAddOrg.vue"
export default {
  name: "FormOrganization",
  components: {
    Navbar,
    FormAddOrg
  },
  methods: {

  }
}
</script>