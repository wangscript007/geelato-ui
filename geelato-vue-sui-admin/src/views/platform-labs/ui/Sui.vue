<template>
    <div>
        <sui-dropdown
                placeholder="Gender"
                selection
                :options="options"
                v-model="current"
        />
    </div>
</template>

<script>
    export default {
        name: "Sui",
        data() {
            return {
                current: null,
                options: [{
                    text: 'Male',
                    value: 1,
                }, {
                    text: 'Female',
                    value: 2,
                }],
            }
        }
    }
</script>

<style scoped>

</style>
