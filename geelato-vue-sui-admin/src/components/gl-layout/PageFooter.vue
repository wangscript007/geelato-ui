<template>
    <div class="ui inverted segment" :class="$gl.ui.color.primary" style="padding: 0px;margin: 0px">
        <div class="page-footer-inner" style="text-align: center" :style="{'line-height':height}">
            <a target="_blank" :href="$gl.copyright.href">
                {{$gl.copyright.text}}
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            mode: Number,
            height: String
        }
    }
</script>

<style scoped>
</style>
