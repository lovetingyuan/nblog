export default'<h2 id="快排，堆排，归并排序">快排，堆排，归并排序</h2>\n<blockquote>\n<p> 关于算法的js实现可以参考<a href="https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md">javascript-algorithms</a>，这里面有相当丰富的基于JavaScript的数据结构和算法实现。</p>\n</blockquote>\n<table>\n<thead>\n<tr>\n<th>排序算法</th>\n<th>平均时间复杂度</th>\n<th>最坏时间复杂度</th>\n<th>空间复杂度</th>\n<th>是否稳定</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>冒泡排序</td>\n<td>O（n2）</td>\n<td>O（n2）</td>\n<td>O（1）</td>\n<td>是</td>\n</tr>\n<tr>\n<td>选择排序</td>\n<td>O（n2）</td>\n<td>O（n2）</td>\n<td>O（1）</td>\n<td>不是</td>\n</tr>\n<tr>\n<td>直接插入排序</td>\n<td>O（n2）</td>\n<td>O（n2）</td>\n<td>O（1）</td>\n<td>是</td>\n</tr>\n<tr>\n<td>归并排序</td>\n<td>O(nlogn)</td>\n<td>O(nlogn)</td>\n<td>O（n）</td>\n<td>是</td>\n</tr>\n<tr>\n<td>快速排序</td>\n<td>O(nlogn)</td>\n<td>O（n2）</td>\n<td>O（logn）</td>\n<td>不是</td>\n</tr>\n<tr>\n<td>堆排序</td>\n<td>O(nlogn)</td>\n<td>O(nlogn)</td>\n<td>O（1）</td>\n<td>不是</td>\n</tr>\n<tr>\n<td>希尔排序</td>\n<td>O(nlogn)</td>\n<td>O（ns）</td>\n<td>O（1）</td>\n<td>不是</td>\n</tr>\n<tr>\n<td>计数排序</td>\n<td>O(n+k)</td>\n<td>O(n+k)</td>\n<td>O(n+k)</td>\n<td>是</td>\n</tr>\n<tr>\n<td>基数排序</td>\n<td>O(N∗M)</td>\n<td>O(N∗M)</td>\n<td>O(M)</td>\n<td>是</td>\n</tr>\n</tbody></table>\n<p>快排，堆排，归并排序是众多排序算法里时间复杂度和空间复杂度比较好的三种，它们的时间复杂度都是O(nlogn)。</p>\n<p>其中归并排序的空间复杂度对数组来讲是On，可以通过“手摇算法”降为O（1），但会增加运行时间；对链表则是Ologn，可以通过递归改循环降低为O（1）。</p>\n<p>快排和归并排序都是分治算法的典型应用，堆排序是优先队列的一种应用。</p>\n<p>其中快排的实际性能表现通常是最好的，但如果原本数据就比较有序那么快排的时间复杂度会退化，这种情况可以采用随机化选取标定值的方法规避。</p>\n<p>下面是用JS实现的三种排序算法代码：</p>\n<ul>\n<li>快速排序</li>\n</ul>\n<pre><code class="language-javascript">// 这是个递归的过程，每次我们选一个元素作为标定值\n// 然后一次遍历使得所有小于标定值的元素都位于它的左边，大于它的值位于它的右边\n// 上面这个过程是快排的核心，通常有三种方式可以实现：首尾指针、前后指针、挖坑法\n// 然后递归左右两个子数组进行上面的过程，这里采用了原地算法\n\n// 首尾指针法\nfunction quickSort (array, startIndex = 0, endIndex = array.length - 1) {\n  if (endIndex &lt;= startIndex) return array\n  const target = array[startIndex] // 选第一个值作为标定值，也可以选最后的值\n  let left = startIndex, right = endIndex\n  while (left &lt; right) {\n    // right指针找到第一个小于标定值的值，left指针找到第一个大于标定值的值然后交换\n    if (array[left] &gt; target &amp;&amp; array[right] &lt; target) {\n      [array[left], array[right]] = [array[right], array[left]]\n    } else {\n      // 注意这里一定要先判断右边的指针，因为选了最左边的作为标定值\n      array[right] &gt;= target ? right-- : left++\n    }\n  }\n  [array[left], array[startIndex]] = [target, array[left]]\n  quickSort(array, startIndex, left - 1)\n  quickSort(array, left + 1, endIndex)\n  return array\n}\n\n// 前后指针法\nfunction quickSort (array, startIndex = 0, endIndex = array.length - 1) {\n  if (endIndex &lt;= startIndex) return array\n  const target = array[endIndex] // 选最后边的值作为标定值，也可以选第一个\n  let j = startIndex // j表示等待交换的位置\n  for (let i = startIndex; i &lt;= endIndex; i++) {\n    if (array[i] &lt;= target) { // 如果遇到比标定值小或等于的值就与j处的元素交换并且j + 1\n      [array[i], array[j]] = [array[j], array[i]]\n      j++\n    }\n  }\n  quickSort(array, startIndex, j - 2)\n  quickSort(array, j, endIndex)\n  return array\n}\n</code></pre>\n<ul>\n<li>堆排序</li>\n</ul>\n<pre><code class="language-javascript">// 首先要将数组构造成大/小根堆，根节点为最大值或最小值的二叉树结构\n// 然后依次取根节点和末尾节点交换，交换之后需要保持当前的数组依旧是堆\nvar maxheapsort = (list) =&gt; {\n  // maxheapit 用来使以某个节点为根节点的子树成为大根堆\n  const maxheapit = (parentindex, heapsize) =&gt; {\n    const leftindex = parentindex * 2 + 1\n    const rightindex = leftindex + 1\n    // 比较父节点，左右子节点这三个，选最大的那个作为新的父节点\n    // 如果是子节点做了父节点，那么就要继续维护那个子节点成为堆\n    let maxindex = leftindex &lt; heapsize &amp;&amp; list[leftindex] &gt; list[parentindex] ? leftindex : parentindex\n    maxindex = rightindex &lt; heapsize &amp;&amp; list[rightindex] &gt; list[maxindex] ? rightindex : maxindex\n    if (maxindex !== parentindex) {\n      [list[parentindex], list[maxindex]] = [list[maxindex], list[parentindex]]\n      maxheapit(maxindex, heapsize)\n    }\n  }\n  let heapsize = list.length\n  // 自底向上构造大根堆，就从最后的父节点开始向前遍历\n  for (let i = Math.floor(list.length / 2) - 1; i &gt;= 0; i--) {\n    maxheapit(i, heapsize)\n  }\n  // 依次交换根节点到首位，然后维护大根堆性质\n  for (let i = heapsize - 1; i &gt;= 0; i--) {\n    [list[i], list[0]] = [list[0], list[i]]\n    maxheapit(0, --heapsize)\n  }\n  return list\n}\n</code></pre>\n<ul>\n<li>归并排序</li>\n</ul>\n<pre><code class="language-javascript">// 同样是递归的过程，把数组分成左右两列分别归并排序\n// 然后合并左右两个有序数组为新的数组并返回\nfunction mergeSort (array, start = 0, end = array.length - 1) {\n  if (array.length &lt;= 1) return array\n  if (end === start) return [array[start]]\n  const middle = Math.floor((end - start) / 2) + start\n  const left = mergeSort(array, start, middle)\n  const right = mergeSort(array, middle + 1, end)\n  const merged = []\n  let i = 0, j = 0\n  while (i &lt; left.length || j &lt; right.length) {\n    if (i &lt; left.length &amp;&amp; j &lt; right.length) {\n      merged.push(left[i] &gt; right[j] ? right[j++] : left[i++])\n    } else {\n      merged.push(i &lt; left.length ? left[i++] : right[j++])\n    }\n  }\n  return merged\n}\n</code></pre>\n<p>由于递归在运行中有其自身的切换、调用以及栈空间开销，所以我们还可以用非递归的形式实现上面的归并排序算法（前提是算法本身能比较容易的将递归改为循环迭代并且不会对代码可读性产生太大的影响）</p>\n<pre><code class="language-javascript">// 循环的形式实现归并排序，此时我们需要按照“自底向上”的方向求解问题\nfunction mergeSort(array) {\n  const length = array.length\n  let i = 0, len = 1, merged = [] // len维护每次的合并区间长度\n  while (len &lt; length) {\n    while (i &lt; length) {\n      let [a, b, c, d] = [i, i + len, i + len, i + len * 2]\n      if (b &gt;= length) c = b = length - 1\n      if (d &gt; length) d = length\n      while (a &lt; b || c &lt; d) {\n        if (a &lt; b &amp;&amp; c &lt; d) {\n          merged[i++] = array[a] &lt; array[c] ? array[a++] : array[c++]\n        } else {\n          merged[i++] = a &lt; b ? array[a++] : array[c++]\n        }\n      }\n    }\n    [array, merged] = [merged, array] // 这里只使用了一个On的额外数组\n    len = len * 2, i = 0\n  }\n  return array\n}\n</code></pre>\n';