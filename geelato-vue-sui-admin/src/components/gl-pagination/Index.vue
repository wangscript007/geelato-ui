<template>
    <div class="ui gl-pagination mini menu">
        <div class="item">
            共{{total}}条
        </div>
        <select v-if="showSizeChanger" class="ui dropdown" @change="showSizeChange">
            <option v-for="item in pageSizeItems" :key="item.value"
                    :value="item.value" :selected="showSize===item.value">{{item.text}}
            </option>
        </select>
        <a class="icon item" :class="{'disabled':currentPage==1}"
           @click="gotoPage(currentPage==1?currentPage:currentPage-1)">
            <i class="left chevron icon"></i>
        </a>
        <a class="item" style="background-color:#fff;" v-for="(page) in selectPage"
           :class="{'p-active':page==currentPage}" @click="gotoPage(page)">
            <template v-if="page">{{page}}</template>
            <template v-else>···</template>
        </a>
        <a class="icon item" :class="{'disabled':currentPage==pages}"
           @click="gotoPage(currentPage==pages?currentPage:currentPage+1)">
            <i class="right chevron icon"></i>
        </a>
    </div>
</template>

<script>
    export default {
        name: "Index",
        props: {
            // 总页数
            total: {
                type: Number,
                required: true
            },
            showSize: {
                type: Number,
                required: true
            },
            current: {
                type: Number,
                required: true
            },
            // 展示跳转页码输入框
            showQuickJumper: {
                type: Boolean,
                default: true
            },
            // 展示每页展示记录数调整功能
            showSizeChanger: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                option: this.$gl.componentOption['gl-pagination'] || {},
                currentPage: 1,
                selectedPageSize: 0,
            }
        },
        computed: {
            // 总页数
            pages: function () {
                // return Math.ceil(this.total / this.pageSize)
                return Math.ceil(this.total / this.showSize)
            },
            pageSizeItems: function () {
                let ps = this.option.pageSizes || [10, 15, 20, 30, 50, 100]
                let items = []
                for (let i in (this.option.pageSizes || ps)) {
                    items.push({
                        value: ps[i],
                        text: ps[i] + '条/页 '
                    })
                }
                return items
            },
            // 每页应展示的记录数
            // pageSize: function () {
            //     console.log('pageSize>selectedPageSize', this.selectedPageSize)
            //     return this.selectedPageSize || this.option.defaultPageSize || 15
            // },
            selectPage: function () {
                let pageNum = this.pages;
                let index = this.currentPage;
                let arr = [];
                if (pageNum <= 5) {
                    for (let i = 1; i <= pageNum; i++) {
                        arr.push(i);
                    }
                    return arr;
                }
                if (index <= 2) return [1, 2, 3, 0, pageNum];
                if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum];
                if (index === 3) return [1, 2, 3, 4, 0, pageNum];
                if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
                return [1, 0, index - 1, index, index + 1, 0, pageNum];
            }
        },
        methods: {
            init: function () {
                this.currentPage = 1;
            },
            gotoPage: function (page) {
                $(this.$el).find('.item').removeClass('active');
                if (page == 0)
                    return;
                if (page != this.currentPage) {
                    this.currentPage = page;
                    this.$emit('navPage', this.currentPage);
                }
            },
            showSizeChange(e) {
                // this.showSize = e.target.value
                // console.log(' e.target.value', e.target.value)
                // this.$emit('update:showSize', e.target.value)
                this.$emit('showSizeChange', e.target.value)
            }
        },
        watch: {
            'currentPage': function () {
                $('.pagination>.item').removeClass('active');
            }
        }
    }
</script>

<style>
    .gl-pagination .ui.selection.dropdown {
        min-width: 4em !important;
        border: 0;
    }
</style>
