export default'<h3 id="typescript高阶类型">TypeScript高阶类型</h3>\n<p>Typescript的一个强大之处在于它支持通过泛型以及一些关键字和操作符对类型本身进行编程。</p>\n<p>TypeScript语言本身就内置的一些高阶类型，利用它们可以方便的实现类型编程：</p>\n<p>借助于下面要介绍的工具类型，可以实现一些其他常用的工具类型，例如<a href="https://github.com/sindresorhus/type-fest"><code>type-fest</code></a>以及<a href="https://github.com/piotrwitek/utility-types"><code>utility-types</code></a>, <a href="https://github.com/millsp/ts-toolbelt"><code>ts-toolbelt</code></a> 都是一些不错的实现，值得参考。</p>\n<pre><code class="language-typescript">// 类型T的所有属性都变为可选的\ntype Partial&lt;T&gt; = {\n    [P in keyof T]?: T[P];\n};\n\n// T的所有属性都变成必选的\ntype Required&lt;T&gt; = {\n    [P in keyof T]-?: T[P];\n};\n\n// T所有的属性都变成只读的\ntype Readonly&lt;T&gt; = {\n    readonly [P in keyof T]: T[P];\n};\n</code></pre>\n<pre><code class="language-typescript">// 从T中选择若干特定名称的属性组成新类型\ntype Pick&lt;T, K extends keyof T&gt; = {\n    [P in K]: T[P];\n};\n// 例子：从类型中只选取函数类型的属性组成新类型\n    type PickFunc&lt;T&gt; = Pick&lt;T, {\n        [k in keyof T]: T[k] extends (...args: any) =&gt; any ? k : never\n    }[keyof T]&gt;\n\n// K作为键，T作为类型值组成的新类型（keyof any的值是string | number | symbol）\ntype Record&lt;K extends keyof any, T&gt; = {\n    [P in K]: T;\n};\n// 例子\n    type AnyObject = Record&lt;string, any&gt;\n    const x: Record&lt;&#39;home&#39; | &#39;about&#39; | &#39;contact&#39;, { title: string }&gt; = {\n        about: { title: &#39;about&#39; },\n        contact: { title: &#39;contact&#39; },\n        home: { title: &#39;home&#39; },\n    };\n\n// 从类型T中去除属于类型U的类型所得到的剩余类型，T通常是联合类型\ntype Exclude&lt;T, U&gt; = T extends U ? never : T;\n// 例子\n    type T0 = Exclude&lt;&quot;a&quot; | &quot;b&quot; | &quot;c&quot;, &quot;a&quot;&gt;;  // &quot;b&quot; | &quot;c&quot;\n    type T1 = Exclude&lt;&quot;a&quot; | &quot;b&quot; | &quot;c&quot;, &quot;a&quot; | &quot;b&quot;&gt;;  // &quot;c&quot;\n    type T2 = Exclude&lt;string | number | (() =&gt; void), Function&gt;;  // string | number\n\n// 和Exclude相反，Extract表示将类型T中不属于U的类型去除\ntype Extract&lt;T, U&gt; = T extends U ? T : never;\n// 例子\n    type T0 = Extract&lt;&quot;a&quot; | &quot;b&quot; | &quot;c&quot;, &quot;a&quot; | &quot;f&quot;&gt;;  // &quot;a&quot;\n    type T1 = Extract&lt;string | number | (() =&gt; void), Function&gt;;  // () =&gt; void\n\n// 表示去除T中名称属于K的那些属性\ntype Omit&lt;T, K extends keyof any&gt; = Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;;\n// 例子\n    const todo: Omit&lt;{\n        title: string;\n        description: string;\n        completed: boolean;\n    }, &#39;description&#39;&gt; = {\n        title: &#39;Clean room&#39;,\n        completed: false,\n    };\n\n// 去除掉T中的null和undefined\ntype NonNullable&lt;T&gt; = T extends null | undefined ? never : T;\n// 例子\n    type T0 = NonNullable&lt;string | number | undefined&gt;;  // string | number\n    type T1 = NonNullable&lt;string[] | null | undefined&gt;;  // string[]\n</code></pre>\n<pre><code class="language-typescript">// 获取函数的参数类型，以元组的形式返回\ntype Parameters&lt;T extends (...args: any) =&gt; any&gt; = T extends (...args: infer P) =&gt; any ? P : never;\n// 例子\n    declare function f1(arg: { a: number, b: string }): void\n    type T0 = Parameters&lt;() =&gt; string&gt;;  // []\n    type T1 = Parameters&lt;(s: string) =&gt; void&gt;;  // [string]\n    type T2 = Parameters&lt;typeof f1&gt;;  // [{ a: number, b: string }]\n\n// 获取构造方法的参数类型列表\ntype ConstructorParameters&lt;T extends new (...args: any) =&gt; any&gt; = T extends new (...args: infer P) =&gt; any ? P : never;\n// 例子\n    type T0 = ConstructorParameters&lt;ErrorConstructor&gt;;  // [(string | undefined)?]\n    type T1 = ConstructorParameters&lt;FunctionConstructor&gt;;  // string[]\n    type T2 = ConstructorParameters&lt;{\n        new (a: string, b?: number): {}\n    }&gt;;  // [string, (number | undefined)?]\n\n// 获取函数的返回类型\ntype ReturnType&lt;T extends (...args: any) =&gt; any&gt; = T extends (...args: any) =&gt; infer R ? R : any;\n// 例子\n    declare function f1(): { a: number, b: string }\n    type T0 = ReturnType&lt;() =&gt; string&gt;;  // string\n    type T1 = ReturnType&lt;(s: string) =&gt; void&gt;;  // void\n    type T2 = ReturnType&lt;(&lt;T extends U, U extends number[]&gt;() =&gt; T)&gt;;  // number[]\n    type T3 = ReturnType&lt;typeof f1&gt;;  // { a: number, b: string }\n\n// 返回构造类型T的实例类型\ntype InstanceType&lt;T extends new (...args: any) =&gt; any&gt; = T extends new (...args: any) =&gt; infer R ? R : any;\n// 例子\n    class C {\n        x = 0;\n        y = 0;\n    }\n    type T0 = InstanceType&lt;typeof C&gt;;  // C\n    type T1 = InstanceType&lt;Function&gt;;  // Error\n\n// 获取函数的this类型，这个需要--strictFunctionTypes配置项开启才能用\ntype ThisParameterType&lt;T&gt; = T extends (this: infer U, ...args: any[]) =&gt; any ? U : unknown;\n// 例子\n    function toHex(this: Number) {\n        return this.toString(16);\n    }\n    function numberToString(n: ThisParameterType&lt;typeof toHex&gt;) {\n        return toHex.apply(n);\n    }\n\n// 去除函数的this类型\ntype OmitThisParameter&lt;T&gt; = unknown extends ThisParameterType&lt;T&gt; ? T : T extends (...args: infer A) =&gt; infer R ? (...args: A) =&gt; R : T;\n// 例子\n    function toHex(this: Number) {\n        return this.toString(16);\n    }\n    const fiveToHex: OmitThisParameter&lt;typeof toHex&gt; = toHex.bind(5);\n</code></pre>\n';
