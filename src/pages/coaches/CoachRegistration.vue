<template>
  <div>
    <base-dialog :show="!!error" title="An error accurred!" @close="handleError">
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <section>
      <base-card>
        <teleport to="body">
          <div v-if="isLoading" class="backdrop">
            <base-spinner></base-spinner></div
        ></teleport>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form
      ></base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '../../components/couches/CoahForm.vue'
export default {
  components: {
    CoachForm
  },
  data() {
    return {
      isLoading: false,
      error: null
    }
  },

  methods: {
    async saveData(data) {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/registerCoach', data)
        this.isLoading = false
        this.$router.replace('/coaches')
      } catch (error) {
        this.isLoading = false
        this.error = error.message || 'Something  went wrong!'
      }
    },
    handleError() {
      this.error = null
      this.$router.replace('/coaches')
    }
  }
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 10;
}
</style>
