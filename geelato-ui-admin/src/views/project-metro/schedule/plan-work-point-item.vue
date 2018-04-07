<template>
  <td>
    <template v-if="activeYear===year">
      <template v-if="m==={}||m.active===false">
        <i class="window minimize grey icon" aria-disabled="true" title="无需上报"></i>
      </template>
      <template v-else>
        <i v-if="m.taskSetCode" class="eye icon" @click="$_uploadPlan(m)"></i>
        <i v-if="!m.taskSetCode" class="arrow up icon" @click="$_uploadPlan(m)"></i>
      </template>
    </template>
  </td>
</template>
<script>
  export default {
    props: {
      year: {
        type: Number,
        required: true
      },
      activeYear: {
        type: String,
        required: true
      },
      month: {}
    },
    data () {
      return {
        m: {}
      }
    },
    mounted () {
      console.log(typeof this.month, this.month)
      if (typeof this.month === 'object') {
        this.m = this.month
      } else {
        this.m = {}
      }
    },
    methods: {
      $_uploadPlan (month) {
        console.log('month>', month)
      }
    },
    components: {}
  }
</script>
<style scoped>
  td:not(:first-of-type) {
    text-align: center !important;
  }
  .icon:not(.grey) {
    cursor: pointer;
  }
</style>
