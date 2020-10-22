---
published: false
title: A neuroscience-inspired approach to transfer learning
layout: post
author: Xiaoliang Luo, Brett D. Roads, Bradley C. Love
image: /images/blog/attention_layer.png
comments: false
mathjax: true

---

Inspired by the brain, we find a goal-directed attention approach to feature reuse bests a commonly used machine learning strategy (<a href="https://arxiv.org/abs/2002.02342">Luo et al., 2020</a>). In particular, attentional modulation of mid-level features in deep convolutional neural networks is more effective than retraining the last layer to transfer to a new task.

Neuroscience and machine learning have been enjoying a virtuous cycle in which advances in one field spurs advances in the other. For example, deep convolutional neural networks (DCNNs) were motivated by the organisation of the visual cortex. In this blog, we highlight another success for neuroscience-inspired approaches, namely using goal-directed attention to repurpose an existing network for a new task.

### Goal-directed attention in humans
When searching for one’s car keys, a sensible strategy is to prioritise small and metallic objects. Focusing on goal-directed features at the expense of irrelevant features can increase one’s chances of finding the target item. Instead of retraining one’s brain for this particular recognition task, people use goal-directed attention to modulate activity in their visual system.

<figure class="fig">
<img src="{{ site.baseurl }}/images/blog/topDownAttention3.png" title="Figure 2 from topDown preprint." class="u-max-full-width centered">
<figcaption>
  <div class="inner-caption centered">
  Figure 2 from <a href="https://arxiv.org/abs/2002.02342">Luo et al., 2020</a>: The absence of a strong top-down signal (left) to guide visual processing leads to uncertainty about what this confusing image depicts. In contrast, when there is an expectation that a dog is present (right) the visual system is reconfigured to be more sensitive and biased toward supporting information, which leads to successful recognition of the Dalmatian.
</div>
</figcaption>
</figure>

### Conventional transfer learning in machine learning
In contrast, one popular method for transfer learning in machine learning is to remove the final layer of the DCNN and retrain it for the new task. Like the attentional approach, most aspects of the original network are preserved. For example, all the useful features previously learned could be reused for a task that prioritises finding one’s keys. To provide another [example](https://keras.io/guides/transfer_learning/#an-endtoend-example-finetuning-an-image-classification-model-on-a-cats-vs-dogs\), a DCNN model pre-trained on ImageNet could be fine-tuned into a cats-vs-dogs detector using very little data.


### An alternative approach: goal directed attention
Goal-directed attention and transfer learning approaches reuse existing features, but there is a critical difference. In the brain, goal-directed attention primarily operates at mid- to late-stages of the ventral visual stream. Our networks with goal-directed attention operate similarly. In contrast, transfer learning adjusts features at the very end of a DCNN. How does a neuroscience-inspired approach compare to the standard machine learning approach?

Here, we describe a study in which we incorporate goal-directed attention into the mid-level of a DCNN and use it as an alternative to the transfer learning approach. Results from three object recognition tasks favour the neuroscience-inspired approach both in terms of performance and ability to scale.

### Incorporating goal-directed attention in DCNN
In cognitive neuroscience, goal-directed attention is a mechanism that emphasises or de-emphasises features based on their task relevance. This is often formalised as the stretching and contracting of psychological feature dimensions.

<figure class="fig">
<img src="{{ site.baseurl }}/images/blog/size_albedo_intro.png" title="Figure 1 from topDown preprint." class="u-max-full-width centered">
<figcaption>
  <div class="inner-caption centered">
  Figure 1 from <a href="https://arxiv.org/abs/2002.02342">Luo et al., 2020</a>: Attention alters the importance of feature dimensions. Four kitchen objects vary on two feature dimensions: albedo and size. In this example, albedo is the attended dimension (hence stretched) whereas attention to size is tuned down (hence compressed). Consequently, the key becomes more similar to the silver toaster than to the chopping board or salt shaker.
</div>
</figcaption>
</figure>

To incorporate this principle into DCNN models, we introduce a goal-directed attention layer at the mid-level of a pre-trained DCNN that can direct its focus on a set of features based on their goal relevance.

<figure class="fig">
<img src="{{ site.baseurl }}/images/blog/attention_layer.png" title="Figure 4 from topDown preprint." class="u-max-full-width centered">
<figcaption>
  <div class="inner-caption centered">
  Figure 4 from <a href="https://arxiv.org/abs/2002.02342">Luo et al., 2020</a>: Integration of Attention Layer with VGG-16. The attention layer is constructed with the same shape as the output representation of the preceding layer but constrained such that a single filter value is used across all spatial locations. The attention operation is carried out as a Hadamard product between the pre-attention activations and attention weights. As the bottom panel shows, previously highly activated filter can be tuned down by a small attention weight (colour from dark to bright) whereas previously barely activated filter can become highly activated due to attention re-weighting (colour from bright to dark)
</div>
</figcaption>
</figure>

### Attention beats convention
Models trained on ImageNet using either approach are tested on three object recognition tasks involving standard ImageNet images, blended images and natural adversarial images. Natural adversarial images exploit vulnerabilities in DCNNs such as colour and texture biases ([Hendrycks et al., 2019](https://arxiv.org/pdf/1907.07174.pdf)).

<figure class="fig">
<img src="{{ site.baseurl }}/images/blog/eg_intro.png" title="Figure 3 from topDown preprint." class="u-max-full-width centered">
<figcaption>
  <div class="inner-caption centered">
  Figure 3 from <a href="https://arxiv.org/abs/2002.02342">Luo et al., 2020</a>: (Left) A standard image from ImageNet’s Tabby Cat category (<a href="http://www.image-net.org/papers/imagenet_cvpr09.pdf">Deng et al., 2009</a>). (Middle) A blended image by alpha-blending an image of a cat and an image of a dog. (Right) A natural adversarial image of a dragonfly misclassified as banana by DenseNet-121 with high confidence (<a href="https://arxiv.org/pdf/1907.07174.pdf">Hendrycks et al., 2019</a>).

</div>
</figcaption>
</figure>

All three tests follow the same procedure involving both target and non-target images. For example, when testing a model dedicated to detecting Chihuahuas, an equal number of Chihuahua and non-Chihuahua images are used to tune the network. For each model, we assess performance using signal detection theory.

[We found](https://arxiv.org/abs/2002.02342) that the goal-directed attention approach generally outperformed (i.e., higher $d^\prime$) the widely used transfer learning approach in all three tasks.

One explanation is that even though the attention layer had fewer tunable parameters ($512$ vs. $4,096,000$ parameters) than the retraining approach, the cascading effects through subsequent network layers provided the needed flexibility to match the task goal. The results suggest that this neuroscience-inspired approach can enable the model to more effectively adapt to new tasks at a relatively low cost. Additionally, since each attention weight has a unique correspondence to the entire feature map from the preceding layer, this goal-directed mechanism can potentially be more interpretable than the fully connected weights. 





