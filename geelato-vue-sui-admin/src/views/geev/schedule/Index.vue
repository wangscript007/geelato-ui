<template>
    <div id="schedule" style="width: 1100px;height:540px;">
        <!--A2：2807*1985-->
    </div>
</template>

<script>
    import Schedule from './Schedule.js'
    import * as dataset from './dataset.json'
    import * as datasetjs from './dataset.js'
    import DataHandler from './DataHandler.js'


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
            let ds = new DataHandler().convert(datasetjs)
            console.log('ds>', ds)
            // const data = (dataset as any).data
            // console.log('dataset', dataset.default)
            new Schedule().render(document.getElementById('schedule'), dataset.default)
            // new Schedule().render(document.getElementById('schedule'), datasetjs)

        }
    }
</script>

<style scoped>

</style>
