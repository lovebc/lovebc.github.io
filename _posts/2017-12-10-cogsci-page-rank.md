---
published: true
title: How a CogSci undergrad invented PageRank three years before Google
layout: post
author: Bradley C. Love
image: /images/blog/figure.jpg
comments: true

---


Before Google, search engines, like AltaVista, often retrieved spurious web pages. Out of all the possible pages to return how does one determine which ones are the most relevant? One key to Google's success was the PageRank algorithm developed by Google founders [Sergey Brin and Larry Page in 1998](https://www.sciencedirect.com/science/article/pii/S016975529800110X). As they say, the rest is history, except there was a curious prehistory.

Three years prior in 1995, while an undergrad in Brown's Cognitive and Linguistic Sciences program, [I published an identical algorithm to PageRank](http://bradlove.org/papers/love_sloman_1995.pdf), so I guess it would be more correct to say that Brin and Page published an algorithm identical to the Love and Sloman centrality algorithm. At the time, I was a Mathematics and Computer Science major that switched over to the Cognitive and Linguistic Sciences program because I wanted to understand which algorithms the human mind used to solve interesting problems. The story of my undergraduate honors thesis highlights how thinking about how the mind works can be useful for solving practical problems.

Returning to the centrality measure, the goal was to determine which parts of concepts were most central or important to people. The idea I had was that people view nodes in human concepts as more central to the extent that other nodes depend on them. For example, in the graph below of our concept of *Robin* (collected from human participants), *Beak* should be  somewhat central because *Eats* depends on it. Like PageRank, indirect connections also influence centrality. For example, *Eats* depends on *Beak* and *Living* depends on eats, i.e., *Living* → *Eats* → *Beak*, which should have the effect of making *Beak* even more central to our conception of a *Robin*. To take into account all of these influences, the centrality algorithm iteratively computes how central a node is, taking into account its place in the overall dependency graph. With some mathematics background, I worked out that this iterative algorithm converges to the Eigen vector with the largest Eigen value in the dependency matrix (all the links can be represented as a matrix).

<figure class="fig"><img src="{{ site.baseurl }}/images/blog/figure.jpg" title="An example dependency (link) graph from Love and Sloman (1995)." class="u-max-full-width centered">
<figcaption>
<div class="inner-caption centered">
An example dependency (link) graph from <a href="http://bradlove.org/papers/love_sloman_1995.pdf">Love and Sloman (1995)</a>.
</div>
</figcaption>
</figure>

PageRank is identical, but instead of working on a graph for a human concept it works on the links in the world wide web; simply replace concept node with webpage and dependency link with hyperlink. The goal of each algorithm is the same, to determine which nodes in a network are most central. [Here](http://www.ams.org/samplings/feature-column/fcarc-pagerank) is a good description of the math and ideas behind PageRank (i.e., the centrality algorithm) for those who want to know more.

One wonders whether other ideas are lying in the cognitive science dustbin awaiting rediscovery. The field itself is largely driven by fads and is prone to ignore genuine discoveries. That year at the Cognitive Science Society (CSS) conference my paper was well received but did not make a big splash. At the time, CSS folks were excited about [connectionism](https://en.wikipedia.org/wiki/Connectionism) and a paper on that topic won best student paper. Of course, that trend gave way to [Bayesianism](https://doi.org/10.1017/S0140525X10003134) which has or will likely give way to deep learning. CSS tends to be fad-driven, which is one of the several reasons I resigned from the CSS last summer, but that is a topic for another blog post.


My undergraduate thesis is not a unique case of cognitive science research being relevant to machine learning research. The [backpropagation algorithm](https://www.nature.com/articles/323533a0), which is behind the past and current neural networks revolution, was developed by cognitive scientists. In addition, [John R. Anderson independently discovered](http://psycnet.apa.org/record/1991-32228-001) the Dirichlet process mixture for effective Bayesian clustering. And of course, the current excitement about the convolutional neural network architecture (trained with backpropgation) is motived by basic insights on how the human visual system is organized.

In these examples, establishing a connection to machine learning was possible because the cognitive science research was formal.
Perhaps one lesson is that more students in cognitive science should seek training in formal methods. Another lesson is that computer scientists may be well served from some contact with cognitive science. Facetiously as much as seriously, a final lesson for any potential benefactors with deep pockets is to contact me because I have some more good ideas waiting on the shelf! 😊
