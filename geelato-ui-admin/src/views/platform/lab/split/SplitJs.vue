<template>
  <div class="splitjs-demo vertical-panes" layout="vertical">
    <div class="container">
      <h3>Split.js</h3>
      <div class="row example-1">
        <div id="one" class="split split-horizontal">
          <p>Split.js is a lightweight, unopinionated utility for creating adjustable split views or panes.</p>
          <p>
            No dependencies or markup required, just two or more elements with a common parent.
          </p>
          <p>
            Views can be split horizontally or vertically, with draggable gutters inserted between every two elements.
          </p>
        </div>
        <div id="two" class="split split-horizontal">
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
      <br><br>
      <div class="row">
        <h5>Usage Examples</h5>
        <hr>
        <p>A split with two elements, starting at 25% and 75% wide with 200px minimum width.</p>
        <pre><code>Split(['#one', '#two'], {
    sizes: [25, 75],
    minSize: 200
});</code></pre>
        <div class="example-2">
          <div id="three" class="split split-horizontal">
            <p>#three</p>
          </div>
          <div id="four" class="split split-horizontal">
            <p>#four</p>
          </div>
        </div>
        <br>
        <p>A split with three elements, starting with even widths with 100px, 100px and 300px minimum widths,
          respectively.</p>
        <pre><code>Split(['#one', '#two', '#three'], {
    minSize: [100, 100, 300]
});</code></pre>
        <div class="example-3">
          <div id="five" class="split split-horizontal">
            <p>#five, minSize: 100px</p>
          </div>
          <div id="six" class="split split-horizontal">
            <p>#six, minSize: 100px</p>
          </div>
          <div id="seven" class="split split-horizontal">
            <p>#seven, minSize: 300px</p>
          </div>
        </div>
        <br>
        <p>A vertical split with two elements, starting with even heights.</p>
        <pre><code>Split(['#eight', '#nine'], {
    direction: 'vertical'
});</code></pre>
        <div class="example-4">
          <div id="eight" class="split split-vertical">
            <p>#eight</p>
          </div>
          <div id="nine" class="split split-vertical">
            <p>#nine</p>
          </div>
        </div>
        <br>
        <p>Nested splits, horizontal and vertical.</p>
        <pre><code>Split(['#ten', '#eleven']);

Split(['#twelve', '#thirteen'], {
    direction: 'vertical'
});</code></pre>
        <div class="example-5">
          <div id="ten" class="split split-horizontal">
            <div id="twelve" class="split split-vertical">
              <p>#twelve</p>
            </div>
            <div id="thirteen" class="split split-vertical">
              <p>#thirteen</p>
            </div>
          </div>
          <div id="eleven" class="split split-horizontal">
            <p>#eleven</p>
          </div>
        </div>
        <br><br>
        <p>The actual size calculation falls back from calc() to support IE8, or can be configured to use flexbox.</p>
        <pre><code>Split(['#flex-1', '#flex-2'], {
    elementStyle: function (dimension, size, gutterSize) {
        return { 'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)' }
    },
    gutterStyle: function (dimension, gutterSize) {
        return { 'flex-basis':  gutterSize + 'px' }
    }
});</code></pre>
        <div class="example-flex">
          <div id="flex-1" class="split-flex split-horizontal-flex">
            <p>#flex-1</p>
          </div>
          <div id="flex-2" class="split-flex split-horizontal-flex">
            <p>#flex-2</p>
          </div>
        </div>
        <br><br>
        <p>And with flexbox reverse:</p>
        <pre><code>Split(['#flex-3', '#flex-4'], {
    elementStyle: function (dimension, size, gutterSize) {
        return { 'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)' }
    },
    gutterStyle: function (dimension, gutterSize) {
        return { 'flex-basis':  gutterSize + 'px' }
    }
});</code></pre>
        <div class="example-flex example-flex-reverse">
          <div id="flex-3" class="split-flex">
            <p>#flex-3</p>
          </div>
          <div id="flex-4" class="split-flex">
            <p>#flex-4</p>
          </div>
          <div id="flex-5" class="split-flex">
            <p>#flex-5</p>
          </div>
        </div>
        <br><br>
        <h5>API</h5>
        <hr>
        <p>Use the returned instance to access two methods that control the split: <b>setSizes</b> and <b>collapse</b>,
          a method for getting the current sizes: <b>getSizes</b> and a method for destroying the split: <b>destroy</b>.
        </p>
        <pre><code>var instance = Split(['#fourteen', '#fifteen', '#sixteen'], {
    sizes: [50, 25, 25]
});

instance.setSizes([33.3, 33.3, 33.3]);  // Set Sizes 33%
instance.collapse(0);  // Collapse First
instance.collapse(1);  // Collapse Second
instance.collapse(2);  // Collapse Third
instance.getSizes();  // Get Sizes
instance.setSizes([50, 25, 25]);  // Reset
instance.destroy();  // Destroy</code></pre>

        <div class="example-6">
          <div id="fourteen" class="split split-horizontal">
            <p>#fourteen</p>
          </div>
          <div id="fifteen" class="split split-horizontal">
            <p>#fifteen</p>
          </div>
          <div id="sixteen" class="split split-horizontal">
            <p>#sixteen</p>
          </div>
        </div>
        <br><br>
        <div>
          <button @click="instance.setSizes([100 / 3, 100 / 3, 100 / 3])">Set Sizes 33%</button>
          <button @click="instance.collapse(0)">Collapse First</button>
          <button @click="instance.collapse(1)">Collapse Second</button>
          <button @click="instance.collapse(2)">Collapse Third</button>
          <button @click="console.log(instance.getSizes())">Get Sizes</button>
          <button @click="instance.setSizes([50, 25, 25])">Reset</button>
          <button @click="instance.destroy()">Destroy</button>
          <button @click="instance = Split(['#fourteen', '#fifteen', '#sixteen'], {sizes: [50, 25, 25]});">Create
          </button>
        </div>

        <br>
        <p>JSFiddle style is also possible: <a href="examples/jsfiddle.html">Demo</a>.
          <br>
          <br><br>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Split from 'split.js'

  export default {
    data () {
      return {
        instance: {}
      }
    },
    mounted: function () {
      Split(['#one', '#two'], {
        sizes: [29, 71],
        minSize: 200
      })

      Split(['#three', '#four'], {
        sizes: [25, 75],
        minSize: 200
      })

      Split(['#five', '#six', '#seven'], {
        minSize: [100, 100, 300]
      })

      Split(['#eight', '#nine'], {
        direction: 'vertical'
      })

      Split(['#ten', '#eleven'])

      Split(['#twelve', '#thirteen'], {
        direction: 'vertical'
      })

      Split(['#flex-1', '#flex-2'], {
        elementStyle: function (dimension, size, gutterSize) {
          return {'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'}
        },
        gutterStyle: function (dimension, gutterSize) {
          return {'flex-basis': gutterSize + 'px'}
        }
      })

      Split(['#flex-3', '#flex-4', '#flex-5'], {
        elementStyle: function (dimension, size, gutterSize) {
          return {'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'}
        },
        gutterStyle: function (dimension, gutterSize) {
          return {'flex-basis': gutterSize + 'px'}
        }
      })

      this.instance = Split(['#fourteen', '#fifteen', '#sixteen'], {
        sizes: [50, 25, 25]
      })
    },
    components: {}
  }
</script>

<style>
  .splitjs-demo td {
    padding: 8px 10px;
  }

  .splitjs-demo td:first-child {
    font-family: monospace;
  }

  .splitjs-demo h3 {
    margin-top: 100px;
  }

  .splitjs-demo h5 {
    margin-bottom: 0;
  }

  .splitjs-demo hr {
    margin-top: 2px;
  }

  .splitjs-demo .example-1 {
    height: 600px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .splitjs-demo .example-2, .example-3, .example-4, .example-5, .example-6 {
    height: 250px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .splitjs-demo .example-flex {
    height: 200px;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
  }

  .splitjs-demo .example-flex-reverse {
    flex-direction: row-reverse;
  }

  .splitjs-demo #one, #two {
    padding: 20px;
  }

  .splitjs-demo #one p {
    padding: 0;
  }

  .splitjs-demo .example-4, .example-5 {
    height: 400px;
  }

  .splitjs-demo .split p, .split-flex p {
    padding: 20px;
  }

  .splitjs-demo .split, .split-flex {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    overflow-y: auto;
    overflow-x: hidden;
  }

  .splitjs-demo .gutter {
    background-color: #eee;

    background-repeat: no-repeat;
    background-position: 50%;
  }

  .splitjs-demo .gutter.gutter-horizontal {
    /*background-image: url('grips/vertical.png');*/
    cursor: ew-resize;
  }

  .splitjs-demo .gutter.gutter-vertical {
    /*background-image: url('grips/horizontal.png');*/
    cursor: ns-resize;
  }

  .splitjs-demo .split.split-horizontal, .gutter.gutter-horizontal {
    height: 100%;
    float: left;
  }

</style>
