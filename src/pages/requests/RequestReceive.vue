<template>
  <div>
    <base-dialog :show="!!error" title="An error accurred!" @close="handleError">
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requeqst Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.userMessage"
          ></request-item>
        </ul>
        <p v-else>You haven`t received any request yet!</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/request/RequestItem.vue'

export default {
  components: {
    RequestItem
  },
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests']
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests']
    }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true
      try {
        await this.$store.dispatch('requests/fetchRequest')
      } catch (error) {
        this.error = error.message || 'Something  went wrong!'
      }

      this.isLoading = false
    },
    handleError() {
      this.error = null
    }
  },
  created() {
    this.loadRequests()
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
