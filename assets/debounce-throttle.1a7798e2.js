export default'<h2 id="节流throttle和防抖debounce">节流(throttle)和防抖(debounce)</h2>\n<p>这两种函数执行策略都是针对短时间内函数被频繁触发执行的问题，比如input事件，resize事件，scroll事件，mousemove等等，是改善程序性能的一种手段。</p>\n<p>其中</p>\n<ul>\n<li>节流表示在设置的单位时间内，保证函数只被执行一次；</li>\n</ul>\n<pre><code class="language-javascript">throttle(method, 200); // method每次调用时间间隔都保证至少为200ms\nfunction throttle(func, delay) {\n  let timer\n  return function (...args) {\n    if (timer) return\n    timer = setTimeout(() =&gt; { // 也可以通过记录上一次执行时的时间戳对比现在的时间戳是否超出delay来决定是否执行函数\n      func.call(this, ...args)\n      timer = null\n    })\n  }\n}\n</code></pre>\n<ul>\n<li>防抖表示在函数仅在频繁触发(间隔小于设置的时间)的最后一次执行；</li>\n</ul>\n<pre><code class="language-javascript">debounce(method, 200); // 在一段时间内，如果method触发的周期都小于200ms，那么只会最后执行一次\nfunction debounce(func, delay) {\n  let timer\n  return function (...args) {\n    clearTimeout(timer)\n    timer = setTimeout(() =&gt; {\n      func.call(this, ...args)\n    }, delay)\n  }\n}\n</code></pre>\n<p><code>lodash</code>提供了上面两个方法更为增强和细致的实现，<a href="https://github.com/lodash/lodash/blob/master/throttle.js">throttle</a>, <a href="https://github.com/lodash/lodash/blob/master/debounce.js">debounce</a>.</p>\n';
