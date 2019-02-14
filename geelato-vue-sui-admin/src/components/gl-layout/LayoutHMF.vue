<template>
    <div>
        <div :style="header">
            <page-header :mode="mode" :size="sidebar.size" @changeLayoutMode="changeLayoutMode"
                         @changeColor="changeColor" @changeModule="changeModule"></page-header>
        </div>
        <div class="gl-layout-sidebar" :style="sidebar">
            <page-sidebar :mode="mode" :size="sidebar.size" :height="sidebar.height" :width="sidebar.width"
                          :headerHeight="sidebar.headerHeight"></page-sidebar>
        </div>
        <div :style="content" style="position: absolute;overflow-x: auto">
            <!--<page-content></page-content>-->
            <router-view :key="key"></router-view>
        </div>
        <div v-show="footDisplay" class="teal" :style="footer" style="position: absolute;bottom: 0;width: 100%">
            <page-footer :mode="mode" :height="footer.height"></page-footer>
        </div>
    </div>
</template>
<script>
    import PageHeader from './PageHeader.vue'
    import PageSidebar from './PageSidebar.vue'
    import PageFooter from './PageFooter.vue'
    import utils from '../../assets/script/utils'
    import {types} from '@/store'

    export default {
        data() {
            return {
                mode: 0,
                header: {},
                footer: {},
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
            },
            key: function () {
                return this.$store.state.platform.routeViewKey
            }
        },
        created() {
//      let user = this.$gl.isLogged()
//      if (user) {
//        console.debug('isLogged true')
//        this.$store.commit(types.LOGIN, user)
//      } else {
//        console.debug('isLogged false')
//        this.$router.push('/login')
//      }
        },
        mounted() {
            let thisVue = this
            $(window).resize(function () {
                this.content = {}
                if (thisVue.isMax) {
                    thisVue.resizeMaxContent()
                } else {
                    thisVue.resizeMinContent()
                }
            })
            thisVue.initUiComponent()
            $(this.$el).find(this.selector().sidebarToggle).click(function () {
                thisVue.toggle()
            })
        },
        methods: {
            selector() {
                return {
                    sidebarToggle: '.gl-layout-sidebar-toggle',
                    sidebar: '.gl-layout-sidebar'
                }
            },
            initUiComponent() {
                $('.ui.dropdown').dropdown()
                $('.ui.accordion').accordion()
            },
            convertToNumber(heightOrWidth) {
                if (!heightOrWidth) return 0
                return heightOrWidth.replace('px', '')
            },
            toggle() {
                this.isMax = !this.isMax
                if (this.isMax) {
                    this.resizeMaxContent()
                } else {
                    this.resizeMinContent()
                }
            },
            // hide sidebar
            resizeMaxContent() {
                this.reset()
                this.sidebar.width = this.defaultValue.sidebar.minWidth
                this.sidebar.size = 'min'
                this.sidebar.display = 'none'
                this.header.height = this.defaultValue.header.minHeight
                this.footer.height = this.defaultValue.footer.minHeight
                this.content['left'] = this.convertToNumber(this.sidebar.width) + 'px'
                this.isMax = true
                this.refresh()
            },
            resizeMinContent() {
                this.reset()
                // 取消依赖子内容进行自动调整最大化窗口的功能
//        if (this.defaultValue.sidebar.adjustWidthBySub) {
//          this.sidebar.width = $(this.$el).find(this.selector().sidebar).children().eq(0).width() + 2 + 'px'
//        } else {
//          this.sidebar.width = this.defaultValue.sidebar.maxWidth
//        }
                this.sidebar.width = this.defaultValue.sidebar.maxWidth
                this.sidebar.size = 'max'
                this.sidebar.display = 'block'
                this.header.height = this.defaultValue.header.maxHeight
                this.footer.height = this.defaultValue.footer.maxHeight
                this.content['left'] = this.convertToNumber(this.sidebar.width) + 'px'
                this.isMax = false
                this.refresh()
            },
            reset() {
                // 注意重置content，刷新content的大小才有效
                this.content = {}
//        this.content.float = 'left'
                this.sidebar.float = 'left'
//        this.sidebar['background-color'] = this.$gl.ui.color.background
                for (let key in this.$gl.ui.colorHex) {
                    let hex = this.$gl.ui.colorHex[key]
                    if (key === this.$gl.ui.color.primary) {
                        this.sidebar['background-color'] = utils.hex2Rgb(hex, '0.30')
//            console.log(this.sidebar['background-color'])
                    }
                }
            },
            /**
             * 浏览器窗口的尺寸
             * IE、Chrome、FireFox、Opera以及Safari
             *  window.innerHeight   浏览器内部高度
             *  window.innerWidth    浏览器内部宽度
             *  对于IE 5 6 7 8 版本
             *  document.documentElement.clientHeight
             * document.documentElement.clientWidth
             * 或者
             * document.body.clientHeight
             * document.body.clientWidth
             */
            refresh() {
                let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                let winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                this.content.height = (winHeight - this.convertToNumber(this.header.height) - this.convertToNumber(this.footer.height) - 0) + 'px'
                this.content['max-height'] = this.content.height
                this.content.width = (winWidth - this.convertToNumber(this.sidebar.width) - 0) + 'px'
                this.sidebar.height = this.content.height
                this.$store.commit(types.CHANGE_LAYOUT, {
                    content: {
                        height: this.content.height,
                        width: this.content.width
                    }
                })
            },
            changeLayoutMode(value) {
                this.$emit('changeLayoutMode', value)
            },
            changeModule(module) {
                // 当模块指定需最大化打开时，则相应调整窗口，让内容区域最大化
                if (module.resize === 'max') {
                    this.isMax = false
                } else {
                    this.isMax = true
                }
                console.log('changeModule', this.isMax)
                this.toggle()
            },
            changeColor(value, oldValue) {
                this.$emit('changeColor', value, oldValue)
            }
        },
        components: {PageHeader, PageSidebar, PageFooter}
    }
</script>

<style>
</style>
