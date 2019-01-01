<template>
    <div>
        <div class="gl-layout-sidebar" :style="sidebar">
            <!--size:'max'、'min'-->
            <page-sidebar :mode="mode" :size="sidebar.size" :height="sidebar.height" :width="sidebar.width"
                          :headerHeight="sidebar.headerHeight"></page-sidebar>
        </div>
        <div :style="header">
            <page-header :mode="mode" :size="sidebar.size" @changeLayoutMode="$_changeLayoutMode"
                         @changeModule="$_changeModule"
                         @changeColor="$_changeColor"></page-header>
        </div>
        <div :style="content" style="position: absolute;overflow-x: auto">
            <router-view></router-view>
        </div>
        <div v-show="footDisplay" class="teal" style="position: absolute;bottom: 0;width: 100%;"
             :style="{left:footer.left}">
            <page-footer :mode="mode" :height="footer.height"></page-footer>
        </div>
    </div>
</template>
<script>
    import PageHeader from './PageHeader.vue'
    import PageSidebar from './PageSidebar.vue'
    import PageFooter from './PageFooter.vue'
    import utils from '../../assets/script/utils'
    import {types} from '../../store'

    export default {
        data() {
            return {
                mode: 1,
                header: {},
                footer: {},
                // height width headerHeight size('max' or 'min')
                sidebar: {},
                content: {},
                isMax: false,
                defaultValue: this.$gl.layout
            }
        },
        computed: {
            footDisplay: function () {
                let maxH = this.$gl.layout.footer.maxHeight
                if (!maxH || maxH === '0' || maxH === '0px') {
                    return false
                }
                return true
            }
        },
        mounted() {
            let thisVue = this
            this.$_resizeMinContent()
            // 获取sidebar内容的

            $(window).resize(function () {
                this.content = {}
                if (thisVue.isMax) {
                    thisVue.$_resizeMaxContent()
                } else {
                    thisVue.$_resizeMinContent()
                }
            })
            thisVue.$_initUiComponent()
            $(this.$el).find(this.$_selector().sidebarToggle).click(function () {
                thisVue.$_toggle()
            })
        },
        methods: {
            $_selector() {
                return {
                    sidebarToggle: '.gl-layout-sidebar-toggle',
                    sidebar: '.gl-layout-sidebar'
                }
            },
            $_initUiComponent() {
                $('.ui.dropdown').dropdown()
                $('.ui.accordion').accordion()
            },
            $_convertToNumber(heightOrWidth) {
                if (!heightOrWidth) return 0
                return heightOrWidth.replace('px', '')
            },
            $_toggle() {
                this.isMax = !this.isMax
                if (this.isMax) {
                    this.$_resizeMaxContent()
                    this.$emit('resize', 'maxContent')
                } else {
                    this.$_resizeMinContent()
                    this.$emit('resize', 'minContent')
                }
            },
            // hide sidebar
            $_resizeMaxContent() {
                this.$_reset()
                this.sidebar.width = this.defaultValue.sidebar.miniWidth
                this.sidebar.size = 'min'
                this.sidebar.headerHeight = this.defaultValue.header.minHeight
                this.header.height = this.defaultValue.header.minHeight
                this.footer.height = this.defaultValue.footer.minHeight
                this.header['left'] = this.$_convertToNumber(this.sidebar.width) + 'px'
                this.footer['left'] = this.header['left']
                this.content['left'] = this.header['left']
                this.isMax = true
                this.$_refresh()
            },
            $_resizeMinContent() {
                this.$_reset()
                this.sidebar.width = this.defaultValue.sidebar.maxWidth
                this.sidebar.size = 'max'
                this.sidebar.headerHeight = this.defaultValue.header.minHeight
                this.header.height = this.defaultValue.header.maxHeight
                this.footer.height = this.defaultValue.footer.maxHeight
                this.header['left'] = this.$_convertToNumber(this.sidebar.width) + 'px'
                this.footer['left'] = this.header['left']
                this.content['left'] = this.header['left']
                this.isMax = false
                this.$_refresh()
            },
            $_reset() {
                // 注意重置content，刷新content的大小才有效
                this.content = {}
                this.sidebar.float = 'left'
                for (let key in this.$gl.ui.colorHex) {
                    let hex = this.$gl.ui.colorHex[key]
                    if (key === this.$gl.ui.color.primary) {
                        this.sidebar['background-color'] = utils.hex2Rgb(hex, '0.30')
                    }
                }
            },
            /**
             *  浏览器窗口的尺寸
             *  IE、Chrome、FireFox、Opera以及Safari
             *  window.innerHeight   浏览器内部高度
             *  window.innerWidth    浏览器内部宽度
             *  对于IE 5 6 7 8 版本
             *  document.documentElement.clientHeight
             *  document.documentElement.clientWidth
             *  或者
             *  document.body.clientHeight
             *  document.body.clientWidth
             */
            $_refresh() {
                let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                let winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                this.content.height = (winHeight - this.$_convertToNumber(this.header.height) - this.$_convertToNumber(this.footer.height) - 0) + 'px'
                this.content['max-height'] = this.content.height
                this.content.width = (winWidth - this.$_convertToNumber(this.sidebar.width) - 0) + 'px'
                this.sidebar.height = winHeight + 'px'
                this.$store.commit(types.CHANGE_LAYOUT, {
                    content: {
                        height: this.content.height,
                        width: this.content.width
                    }
                })
            },
            $_changeLayoutMode(value) {
                this.$emit('changeLayoutMode', value)
            },
            $_changeModule(module) {
                // 当模块指定需最大化打开时，则相应调整窗口，让内容区域最大化
                if (module.resize === 'max') {
                    this.isMax = false
                } else {
                    this.isMax = true
                }
                this.$_toggle()
            },
            $_changeColor(value, oldValue) {
                this.$emit('changeColor', value, oldValue)
            }
        },
        components: {PageHeader, PageSidebar, PageFooter}
    }
</script>

<style>
</style>
