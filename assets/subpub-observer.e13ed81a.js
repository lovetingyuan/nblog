export default'<h2 id="发布订阅模式和观察者模式">发布订阅模式和观察者模式</h2>\n<p>这两种都是比较常用的编程模式，它们的含义很相近但实现起来又有不同。\n<img src="https://s1.ax1x.com/2020/08/07/afuYod.jpg" alt="alt"></p>\n<h3 id="观察者模式">观察者模式</h3>\n<p>观察者模式包含 <strong>被观察者(Subject)</strong> 和 **观察者(Observers)**，它们是一对多的关系，即Observer有很多个，Subject只有一个。</p>\n<p>其中，Observer是依赖于Subject的，意味着当Subject有变化的时候，它会通知到每一位Observer。</p>\n<p>依赖的实现需要Observer主动联系Subject，而通知则是Subject变化时主动去遍历Observer。</p>\n<p>可以看到二者是需要紧密联系的，它们知道彼此的存在并直接通信。比如Vue中的watch功能就是观察者模式的体现。</p>\n<h3 id="订阅-发布模式">订阅-发布模式</h3>\n<p>订阅发布模式通常被视为观察者模式抽象思想上的一种实现，这种模式同样存在甲方乙方，这里称它们为 <strong>订阅者(Subscriber)</strong> 和 **发布者(Publisher)**。</p>\n<p>除此之外还存在着一个第三方的角色，可以称它为消息中心，或者事件调度中心或者简称为<strong>中介</strong>。</p>\n<p>所以二者最主要的区别出现了，订阅发布模式中，Subscriber和Publisher不是直接通信的，而是借助于中介来联系，从而实现了松耦合的设计。</p>\n<p>Subscriber在订阅事件的时候，只关注事件本身，而不关心谁会发布这个事件；Publisher在发布事件的时候，只关注事件本身，而不关心谁订阅了这个事件。</p>\n<p>在实现中，中介通常会维护一个事件队列，每一种事件都有对应的订阅者，并向外提供订阅(on)和发布(emit)的接口。Node中EventEmitter，Vue中的EventBus等都是订阅发布模式的体现。</p>\n';