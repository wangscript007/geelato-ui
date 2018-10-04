<template lang="html">
    <div class="gl-page-content-wrapper">
        <div class="gl-split example-one">
            <div class="one split split-horizontal">
                <p>Split.js is a lightweight, unopinionated utility for creating adjustable split views or panes.</p>
                <p>
                    No dependencies or markup required, just two or more elements with a common parent.
                </p>
                <p>
                    Views can be split horizontally or vertically, with draggable gutters inserted between every two
                    elements.
                </p>
            </div>
            <div class="two split split-horizontal">
                <h5>Documentation</h5>
                <hr>
                <pre><code>Split(&lt;HTMLElement|selector[]&gt; elements, &lt;options&gt; options?)</code></pre>
                <table class="u-full-width">
                    <thead>
                    <tr>
                        <th>Options</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>sizes</td>
                        <td>Array of numbers</td>
                        <td></td>
                        <td>Initial sizes of each element in percents.</td>
                    </tr>
                    <tr>
                        <td>minSize</td>
                        <td>Number or array</td>
                        <td>100</td>
                        <td>Minimum size of each element.</td>
                    </tr>
                    <tr>
                        <td>gutterSize</td>
                        <td>Number</td>
                        <td>10</td>
                        <td>Gutter size in pixels.</td>
                    </tr>
                    <tr>
                        <td>snapOffset</td>
                        <td>Number</td>
                        <td>30</td>
                        <td>Snap to minimum size offset.</td>
                    </tr>
                    <tr>
                        <td>direction</td>
                        <td>String</td>
                        <td>'horizontal'</td>
                        <td>Direction to split: horizontal or vertical.</td>
                    </tr>
                    <tr>
                        <td>cursor</td>
                        <td>String</td>
                        <td>'grabbing'</td>
                        <td>Cursor to display while dragging.</td>
                    </tr>
                    <tr>
                        <td>onDrag</td>
                        <td>Function</td>
                        <td></td>
                        <td>Callback on drag.</td>
                    </tr>
                    <tr>
                        <td>onDragStart</td>
                        <td>Function</td>
                        <td></td>
                        <td>Callback on drag start.</td>
                    </tr>
                    <tr>
                        <td>onDragEnd</td>
                        <td>Function</td>
                        <td></td>
                        <td>Callback on drag end.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Split from 'split.js'

    export default {
        mounted() {
            Split(['.example-one .one', '.example-one .two'], {
                sizes: [29, 71],
                minSize: 200
            })
        },
    }
</script>

<style scoped>


    .gl-split.example-one {
        height: 500px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .gl-split > div {
        padding: 20px;
    }

    .gl-split > div p {
        padding: 0;
    }

    .gl-split .split p, .split-flex p {
        padding: 20px;
    }
</style>
