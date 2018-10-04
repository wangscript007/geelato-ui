<template>
    <div class="ui mini form">
        <table class="gl-form gl-col-24">
            <tbody>
            <tr>
                <td>
                    <sui-dropdown
                            placeholder="Gender"
                            selection
                            :options="options"
                            v-model="current"
                    />
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "FormOne",
        data() {
            return {
                current: null,
                options: [{
                    text: 'Male',
                    value: 1,
                }, {
                    text: 'Female',
                    value: 2,
                }]
            }
        },
    }
</script>

<style scoped>

</style>
