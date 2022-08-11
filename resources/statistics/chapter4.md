Up until now we have explored probability and statistics very abstractly, without ever applying it to a real world events; even when we calculated probabilities about dice rolls or medical tests, we did it by studying theoretical models, for example we assumed that the probability of rolling a 1 was $1\over 6$ without needing any real world data to support this hypotesis.  
In this chapter we will begin to explore **inferential statistics**, that is the statistics that deals with how to look at real world data and deduce valuable informations.

In general our goal when doing inferential statistics is to observe a random phenomenon, measure several occurrences of that phenomenon, and then deduce the distribution of the random variable that represents it or some property of that distribution.  
To be precise we will mostly be doing **parametric statistics**, that is we will assume that it's distribution is within some family, for example the family of the normal distributions, and then deduce which distribution best fits the data, for example finding the mean and variance of the normal distribution.

# Statistical hypotesis test

Let's begin with an example: we think that the average width of the petals of the Iris flower is 1.5 cm, to test that hypotesis we will pick and measure 100 flowers and we decide that if the average width is between 1.4 cm and 1.6 cm we will consider our hypotesis to be correct, otherwise we will consider it to be incorrect.

We have just constructed an **hypotesis test**, formally we would say that:

-   we have taken a **random sample**, i.e. the petal width of the 100 flowers
-   we have defined a **null hypotesis**, i.e. the average petal width is 1.5 cm, and an **alternative hypotesis**, i.e. the average petal width is not 1.5 cm
-   we have defined a **region of rejection**, i.e. all the combinations of petal widths whose average isn't between 1.4 cm and 1.6 cm

Using this procedure we can experimentally verify, with some degree of certainty, that our hypotesis is correct. At this point you are probably asking youself "How can we be sure that the range 1.4 cm to 1.6cm is the right one? Isn't it too large, or isn't it too small?", luckily for us statistics has a few tools to assess the quality of an hypotesis test, the most important ones being:

-   the **significance level of a test**, usually denoted by $\alpha$, is the probability of rejecting the null hypotesis even though in reality it's true
-   the **power of a test**, usually denoted by $1-\beta$, is the probability of rejecting the null hypotesis when it's false

To evaluate any hypotesis test we just need to compute it's significance level and it's power, a good test will have a low significance level and a high power; generally the test is built by choosing the significance level and then maximizing the power.

In our floral example we will make a couple extra assumptions: the distribution of the petal widths is a normal distribution (this is quite reasonable, in fact this is true for many measurements of natural occurring phenomena) with variance of 0.16 cm (this assumption is needed for didactical purpouses, later on we won't need this simplification anymore).  
So we know that the distribution of any petal width is $\text{N}(\mu, 0.16)$, and we can write the null hypotesis as $\mu=1.5$; now we can compute the significance level:

$$
\alpha = \mathbb{P}[\bar X_n>1.6\text{ or } \bar X_n<1.4\mid \mu = 1.5]
$$

To compute the signficance level we assume the null hypotesis to be true, so we know that the petal width has distribution $N(1.5, 0.16)$, thus the average of the 100 measurements will have normal distribution with mean $1.5$ and variance $0.16/100 = 0.0016$, so $Z={\bar X_n - 1.5 \over \sqrt{0.0016}}$ has distribution $N(0,1)$. Let's try to rewrite the previous expression in terms of $Z$:

$$
\begin{aligned}
\alpha &= \mathbb{P}\left[\bar X_n>1.6\text{ or } \bar X_n<1.4\bigm\vert \mu = 1.5\right]\\
&=\mathbb{P}\left[{\bar X_n - 1.5\over \sqrt{0.0016}}> {1.6-1.5\over \sqrt{0.0016}} \text{ or }{\bar X_n - 1.5\over \sqrt{0.0016}} < {1.4-1.5\over \sqrt{0.0016}}\biggm\vert \mu=1.5\right]\\
&=\mathbb{P}[Z>2.5\text{ or }Z<-2.5]\\
&=\mathbb{P}[Z>2.5]+\mathbb{P}[Z<-2.5]
\end{aligned}
$$

To finish the calculations we need to compute the two probabilities at the last term, since the distribution of $Z$ is known they can be computed by integrating the probability density function of $N(0,1)$. Computing these integrals by hand is hard and tedious, so we usually rely on computers to do the calculations for us:

$$
\begin{aligned}
\alpha &=\mathbb{P}[Z>2.5]+\mathbb{P}[Z<-2.5]\\
&=\int_{2.5}^{+\infty}{1\over\sqrt{2\pi}} e^{-{(x-\mu)^2\over 2}} \; dx + \int_{-\infty}^{-2.5}{1\over\sqrt{2\pi}} e^{-{(x-\mu)^2\over 2}} \; dx\\
&=0.0062 + 0.0062\\
&=0.0124
\end{aligned}
$$

Our test thus has a significance level of about 1%, this is a very good significance level: depending on the field of study the significance level for a test to be considered good usually has to be below 5% or in some cases below 1%.

You may find it weird that the primary focus when designing an hypotesis test is keeping the signficance level low, shouldn't we be more concerned in making sure that the power is high? Isn't it more important to be sure that if our hypotesis is correct we know that it's correct? The confusion comes from the fact that often we choose as null hypotesis the one we hope is false and thus we want to be certain that we don't reject it when it's true.  
For example if we want to test the effectiveness of a fertilizer the null hypotesis could be that the plant's height is unaffected by the fertilizer, thus rejecting the null hypotesis means that our fertilizer is effective, so for our test to be meaningful we must make sure that the probability of rejecting the null hypotesis when it's true is low.  
Unfortunately in this case we don't have a simple rule: in other cases the null hypotesis is the common behaviour (e.g. the petal width of similar species) and in other cases it's chosen in yet another way, it's up to your good judgment choosing the most sensible null hypotesis.

# What if the samples are not normally distributed?

You may argue that the hypotesis test we've seen only works because the sample is normally distributed and that's not always true, so what do we do in such cases? We use the Central Limit Theorem.

Suppose we have a complex reaction between two chemical agents and we know that it has a certain probability to succed, we know from similar reactions that it should be less than 5%, but we want to verify this empirically; we have data about 50 reactions and we want to build a hypothesis test.

In this case the random variables $X_i$ representing each reaction can only have 2 values: 1 for successful reaction and 0 for failed reaction, this definitely isn't a normally distributed variable, but we'll see that we can leverage the Central Limit Theorem (CLT) to still be dealing with a normal distribution in the hypotesis test. The first step to apply the CLT is knowing the average and the variance of the random variables, so let's compute them.

The average can be computed as for any discrete random variable:

$$
\mathbb{E}[X_i] = 1\cdot \mathbb{P}(X_i=1) + 0\cdot \mathbb{P}(X_i=0) = p
$$

Now we can compute the variance:

$$
\begin{aligned}
\text{Var}(X_i)&=\mathbb{E}[(X_i-p)^2]\\
&=(1-p)^2\cdot \mathbb{P}(X_i=1)+(0-p)^2\cdot\mathbb{P}(X_i=0)\\
&=(1-p)^2\cdot p + p^2\cdot (1-p)\\
&=p(1-p)(1-p+p)\\
&=p(1-p)
\end{aligned}
$$

This kind of distribution, that can only have value $0$ or $1$ and has probability $p$ to be $1$, is very common in statistics and even has its own name: Bernoulli distribution, often shorthanded as $\text{Be}(p)$. In the future if you don't remember the fundamental properties, such as mean and variance, of an important distribution you can find them in the [Atlas](/atlas).

We know that the random variables $X_i$ representing each reaction all have distribution $\text{Be}(p)$, in short we write $X_i\sim \text{Be}(p)$, and our null hypotesis is $p\le0.05$, we can now choose a region of rejection and compute the significance level.  
The first step in choosing a region of rejection is summarizing all the sample data in a single metric, in this case the natural choice is the average of the samples $\bar X_n$; it's the natural choice because $\mathbb{E}[\bar X_n]=p$ and our hypotesis is about $p$. We can now choose the region of rejection to be, for example, $\bar X_n>0.1$.

Proceding as in the previous example we write out explicitly the significance level:

$$
\alpha = \mathbb{P}[\bar X_n > 0.1\mid p\le 0.05]
$$

The first issue here is that the null hypotesis doesn't choose a specific value for $p$: the probability of the sample being in the region of rejection is different if $p=0.01$ rather than $p=0.04$, but both cases are included in the null hypotesis. We thus compute the probability in the worst case, that is the one in which that probability is higher. In this example the worst case is $p=0.05$ and in general it's almost always the equality corresponding to the boundary of the null hypotesis.  
We thus want to compute

$$
\alpha = \mathbb{P}[\bar X_n > 0.1\mid p = 0.05]
$$

The distribution of $\bar X_n$ is quite hard to deal with, so we use the Central Limit Theorem (CLT) to make a normal distribution appear: from the CLT we know that $Z_n={\bar X_n - \mu \over \sqrt{\sigma^2/n}}$ tends to a normal distribution, since $n$ is quite big (the rule of thumb is $n>30$) we can approximate the distribution of $Z$ to the limit distribution, that is $\text{N}(0,1)$. Notice that in the definition of $Z_n$ we use $\mu$ and $\sigma^2$, those are the expected value and variance of the variables $X_i$ that we have computed before: $\mu=p$ and $\sigma^2=p(1-p)$, furthermore in our case $n=50$, so we have $Z_{50} = {\bar X_n - p\over \sqrt{p(1-p)/50}}$.  
Now we just need to rewrite the expression for $\alpha$ with respect to $Z_{50}$:

$$
\begin{aligned}
\alpha &= \mathbb{P}[\bar X_n > 0.1\mid p = 0.05]\\
&=\mathbb{P}\left[{{\bar X}_n-p\over \sqrt{p(1-p)/50}} > {0.1-p\over\sqrt{p(1-p)/50}}\Bigm\vert p=0.05\right]\\
&=\mathbb{P}\left[Z_{50} > {0.1-0.05\over\sqrt{ 0.05(1-0.05)/50}}\right]\\
&=\mathbb{P}[Z_{50}>0.64]
\end{aligned}
$$

Knowing that $Z_{50}$ has distribution $\text{N}(0,1)$, we can conclude the computation by looking up the computer calculated value for $\mathbb{P}[Z_{50}>0.64]$, which comes out to be 5,26%; depending on our field of work we could now accept the 5,26% significance or try to build a test with a lower level of significance.

This technique of replacing a hard to deal with distribution with the approximation given by the Central Limit Theorem can be applied to a wide range of cases provided that the sample is big enough ($n>30$).
