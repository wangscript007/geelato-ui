<template>
  <div>
    <div class="ui info segment" v-for="msg in messages">
      {{msg}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "VueLifeCycle",

    data() {
      return {messages: []}
    },

    beforeCreate() {
      console.log('lifeCycle: beforeCreate')
      // this.messages.push('beforeCreate')
    },
    created() {
      console.log('lifeCycle: created')
      this.messages.push('lifeCycle: created')
    },
    beforeMount() {
      console.log('lifeCycle: beforeMount')
      this.messages.push('lifeCycle: beforeMount')
    },
    mounted() {
      console.log('lifeCycle: mounted')
      this.messages.push('lifeCycle: mounted')
    },
    beforeUpdate() {
      console.log('lifeCycle: beforeUpdate')
      // this.messages.push('lifeCycle: beforeUpdate')
    },
    updated() {
      console.log('lifeCycle: updated')
      // this.messages.push('lifeCycle: updated')
    },
    destroyed() {
      console.log('lifeCycle: destroyed')
      this.messages.push('lifeCycle: destroyed')
    }
  }
</script>

<style scoped>

</style>
