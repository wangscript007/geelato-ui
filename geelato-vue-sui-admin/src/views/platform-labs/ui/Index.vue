<template>
    <div class="ui padded grid">
        <table class="ui celled blue table">
            <tr>
                <th>对象</th>
                <th>示例</th>
                <th>值</th>
            </tr>
            <tr>
                <td>
                    checkbox
                </td>
                <td>
                    <sui type="checkbox" selector=".ui.checkbox" v-model="form.checkbox">
                        <div class="ui checkbox">
                            <input type="checkbox">
                            <label>Label1</label>
                        </div>
                        <div class="ui checkbox">
                            <input type="checkbox">
                            <label>Label2</label>
                        </div>
                    </sui>
                    <div class="ui form">
                        <div class="inline fields">
                            <label>选择</label>
                            <sui class="field" type="checkbox" selector=".ui.checkbox"
                                 v-for="(item,index) in [{text:'A',value:'1'},{text:'B',value:'2'},{text:'C',value:'3'}]"
                                 :key="index">
                                <div class="ui radio checkbox" @click="form.checkboxRadio=item.value">
                                    <input type="radio" name="frequency" :checked="form.checkboxRadio===item.value">
                                    <label>{{item.text}}</label>
                                </div>
                            </sui>
                        </div>
                    </div>
                </td>
                <td>
                    {{form.checkbox}}<br>
                    {{form.checkboxRadio}}
                </td>
            </tr>
            <tr>
                <td>
                    dropdown
                </td>
                <td>
                    <sui type="dropdown" selector=".ui.dropdown" v-model="form.dropdown1">
                        <select class="ui dropdown">
                            <option value="">Gender</option>
                            <option selected="selected" value="1">Male</option>
                            <option value="0">Female</option>
                        </select>
                    </sui>
                    <br>
                    <sui type="dropdown" selector=".ui.dropdown" v-model="form.dropdown2">
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
                    <br>
                    <sui type="dropdown" selector=".ui.dropdown" v-model="form.dropdownMultiple">
                        <select name="skills" multiple="" class="ui fluid dropdown">
                            <option value="">Skills</option>
                            <option value="angular">Angular</option>
                            <option value="css">CSS</option>
                            <option value="design">Graphic Design</option>
                            <option value="ember">Ember</option>
                            <option value="html">HTML</option>
                            <option value="ia">Information Architecture</option>
                            <option value="javascript">Javascript</option>
                            <option value="mech">Mechanical Engineering</option>
                            <option value="meteor">Meteor</option>
                            <option value="node">NodeJS</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="python">Python</option>
                            <option value="rails">Rails</option>
                            <option value="react">React</option>
                            <option value="repair">Kitchen Repair</option>
                            <option value="ruby">Ruby</option>
                            <option value="ui">UI Design</option>
                            <option value="ux">User Experience</option>
                        </select>
                    </sui>
                </td>
                <td>
                    {{form.dropdown1}}<br>
                    {{form.dropdown2}}<br>
                    {{form.dropdownMultiple}}
                </td>
            </tr>
            <tr>
                <td>
                    progress
                </td>
                <td class="rapid example">
                    <sui type="progress" selector=".ui.progress" v-model="form.progress">
                        <div class="ui indicating progress" data-value="1" data-total="200" id="example5">
                            <div class="bar">
                                <div class="progress"></div>
                            </div>
                            <div class="label">
                                <div class="ui button">点击[总200]</div>
                            </div>
                        </div>
                    </sui>
                    <br>
                </td>
                <td>
                    {{form.progress}}
                </td>
            </tr>
            <tr>
                <td>
                    rating
                </td>
                <td class="rapid example">
                    <sui type="rating" selector=".ui.rating" v-model="form.rating">
                        <div class="ui rating" data-rating="3" data-max-rating="5"></div>
                    </sui>
                </td>
                <td>
                    {{form.rating}}
                </td>
            </tr>
            <tr>
                <td>
                    tab
                </td>
                <td>
                    <sui type="tab" selector=".menu .item">
                        <div class="ui top attached tabular pointing secondary  menu">
                            <a class="active item" data-tab="first">First</a>
                            <a class="item" data-tab="second">Second</a>
                            <a class="item" data-tab="third">Third</a>
                        </div>
                        <div class="ui bottom attached active tab segment" data-tab="first">
                            First
                        </div>
                        <div class="ui bottom attached tab segment" data-tab="second">
                            Second
                        </div>
                        <div class="ui bottom attached tab segment" data-tab="third">
                            Third
                        </div>
                    </sui>
                </td>
                <td>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    import Sui from '../../../components/sui/Index.vue'

    export default {
        props: {},
        data() {
            return {
                form: {
                    checkbox: undefined,
                    checkboxRadio: undefined,
                    dropdown1: undefined,
                    dropdown2: undefined,
                    dropdownMultiple: undefined,
                    progress: undefined,
                    rating: undefined
                }
            }
        },
        mounted: function () {
            this.progress()
        },
        methods: {
            progress() {
                $('.rapid.example .ui.button')
                    .on('click', function () {
                        var $progress = $('.rapid.example .ui.progress')
                        // ,updateEvent
                        var $button = $(this)
                        // restart to zero
                        clearInterval(window.fakeProgress)
                        $progress.progress('reset')
                        // updates every 10ms until complete
                        window.fakeProgress = setInterval(function () {
                            $progress.progress('increment')
                            $button.text($progress.progress('get value'))
                            // stop incrementing when complete
                            if ($progress.progress('is complete')) {
                                clearInterval(window.fakeProgress)
                            }
                        }, 10)
                    })
            }
        },
        components: {Sui}
    }
</script>
<style scoped>
    .ui.mini.button {
        margin: 0.5em;
    }
</style>
