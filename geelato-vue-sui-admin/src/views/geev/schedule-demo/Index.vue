<template>
    <div>
        <sui type="dropdown" selector=".ui.dropdown" v-model="form.select">
            <div class="ui dropdown">
                <input type="hidden" name="gender">
                <div class="default text">Gender</div>
                <i class="dropdown icon"></i>
                <div class="menu">
                    <div class="item" data-value="1">Male</div>
                    <div class="item" data-value="0">Female</div>
                </div>
            </div>
        </sui>
        :{{form.select}}:
        <div id="schedule" style="width: 1100px;height:540px;">
            <!--A2：2807*1985-->
        </div>
    </div>

</template>

<script>
    import Schedule from './Schedule.js'
    import * as dataset from './dataset.json'


    export default {
        name: "Index",
        data() {
            return {
                form: {
                    select: ''
                }
            }
        },
        mounted: function () {
            // const data = (dataset as any).data
            console.log('dataset', dataset.default)
            new Schedule().render(document.getElementById('schedule'), dataset.default)
        }
    }
</script>

<style scoped>

</style>
