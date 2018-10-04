<template>
    <table>
        <tr>
            <td>
                <textarea rows="10"><slot-container>
            <div slot="dropdownInSlot">
                <sui-dropdown
                        placeholder="Gender"
                        selection
                        :options="options"
                        v-model="current"
                />
            </div>
        </slot-container>
                </textarea>
            </td>
            <td>
                <slot-container>
                    <div slot="dropdownInSlot">
                        <sui-dropdown
                                placeholder="Gender"
                                selection
                                :options="options"
                                v-model="current"
                        />
                    </div>
                </slot-container>
            </td>
        </tr>
        <tr>
            <td>
                <textarea rows="10"><div>
            <sui-dropdown
                    placeholder="Gender"
                    selection
                    :options="options"
                    v-model="current"
            />
        </div>
                </textarea>
            </td>
            <td>
                <div>
                    <sui-dropdown
                            placeholder="Gender"
                            selection
                            :options="options"
                            v-model="current"
                    />
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <textarea rows="10"><form-one></form-one>
                </textarea>
            </td>
            <td>
                <form-one></form-one>
            </td>
        </tr>
        <tr>
            <td>
                <textarea rows="10"><gl-form-base v-show="current!==null" :opts="formOptions" ref="glForm">
                </gl-form-base>
                </textarea>
            </td>
            <td>
                <gl-form-base v-show="current!==null" :opts="formOptions" ref="glForm">
                </gl-form-base>
            </td>
        </tr>
        <tr>
            <td>
                <textarea rows="10"><gl-layout-page left-title="表单配置(JSON)" right-title="表单预览" :max="{left:0,right:16}" :min="{left:0,right:16}">
                    <div slot="right">
                        <gl-form-base v-show="current!==null" :opts="formOptions" ref="glForm">
                        </gl-form-base>
                    </div>
                </gl-layout-page>
                </textarea>
            </td>
            <td>
                <gl-layout-page left-title="表单配置(JSON)" right-title="表单预览" :max="{left:0,right:16}" :min="{left:0,right:16}">
                    <div slot="right">
                        <gl-form-base v-show="current!==null" :opts="formOptions" ref="glForm">
                        </gl-form-base>
                    </div>
                </gl-layout-page>
            </td>
        </tr>

    </table>
</template>

<script>
    import configData from '../../../platform-ide/form/formConfig.js'

    import SlotContainer from './SlotContainer'
    import FormOne from './FormOne'

    export default {
        name: "DropdownInSlot",
        data() {
            return {
                configs: configData,
                current: 0,
                options: [{
                    text: 'Male',
                    value: 1,
                }, {
                    text: 'Female',
                    value: 2,
                }]
            }
        },
        computed: {
            formOptions() {
                return {ui: this.configs[this.current].data}
            }
        },
        components: {SlotContainer, FormOne}
    }
</script>

<style scoped>
    textarea {
        row: 10;
        width: 300px;
    }
</style>
