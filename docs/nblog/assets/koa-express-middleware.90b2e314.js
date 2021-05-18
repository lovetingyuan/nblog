export default'<h2 id="koa和express的中间件机制">Koa和Express的中间件机制</h2>\n<h3 id="koa">Koa</h3>\n<pre><code class="language-javascript">const createServer = (req, res) =&gt; {\n  const ctx = createContext(req, res)\n  ctx.res.statusCode = 404\n  const fnMiddleware = compose(middlewares)\n  return fnMiddleware(ctx)\n    .then(() =&gt; finalRespond(ctx))\n    .catch(err =&gt; ctx.onerror(err));\n}\n// 洋葱模型\nfunction compose (middlewares) {\n  return function (context, next) {\n    let index = -1 // last called middleware #\n    return dispatch(0)\n    function dispatch (i) {\n      if (i &lt;= index) return Promise.reject(new Error(&#39;next() called multiple times&#39;))\n      index = i\n      let fn = middlewares[i]\n      // 当i等于中间件队列长度时表示最后一个中间件正在调用next\n      if (i === middlewares.length) fn = next\n      // 这里next是空的就直接resolve返回即可，之后就是从洋葱芯回到表皮的过程\n      if (!fn) return Promise.resolve()\n      try {\n        // 这里可以看到，调用next方法其实就是调用下一个中间件\n        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));\n      } catch (err) {\n        return Promise.reject(err)\n      }\n    }\n  }\n}\n</code></pre>\n<h3 id="express">Express</h3>\n<p>Express中间件其实和Koa类似，也是从上到下的执行流程，当调用<code>next</code>的时候，express会执行下一个中间件，如果没调用<code>next</code>并且也没有返回响应，那么express会挂起，前端就一直等待，而Koa则不同，不调用<code>next</code>只是不会调用剩余的中间件，但最终还是会返回响应；另外express的中间件是同步调用的，意味着如果中间件有异步操作，<code>next</code>也不会等待异步完成，而就只是线性的调用下一个中间件</p>\n<pre><code class="language-javascript">// 伪代码\nfunction dispatch(req, res, done) {\n  var idx = 0;\n  var stack = this.stack;\n  if (stack.length === 0) return done();\n  next();\n  function next(err) {\n    var layer = stack[idx++]; // 因为express注册中间件途径多种多样，每个中间件都会被抽象成layer\n    if (err === &#39;route&#39; || err === &#39;router&#39; || !layer) return done(err);\n    if (err) {\n      layer.handle_error(err, req, res, next);\n    } else {\n      layer.handle_request(req, res, next);\n    }\n  }\n}\n</code></pre>\n<hr>\n<p>总结来讲，Koa和Express的中间件区别主要在于，express是依靠主动调用<code>res.end</code>来响应请求，koa则只是向ctx挂载数据，中间件执行完再返回响应；二者都是通过<code>next</code>来调用下一个中间件，区别在于express不会等待异步的中间件执行完，而koa会强制让你<code>await next()</code>才可以</p>\n';
