<template>
    <div id="schedule" style="width: 1100px;height:540px;">
        <!--A2：2807*1985-->
    </div>
</template>

<script>
    import Schedule from './Schedule.js'
    import * as dataset from './dataset.json'


    export default {
        name: "Index",
        mounted: function () {
            // const data = (dataset as any).data
            console.log('dataset', dataset.default)
            new Schedule().render(document.getElementById('schedule'), dataset.default)
        }
    }
</script>

<style scoped>

</style>
