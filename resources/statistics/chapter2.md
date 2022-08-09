In the previous chapter we saw how a geometric approach can help us formalize our intuition of probability, we'll now extend this approach to a less intuitive topic: calculating probabilities when there are infinite possible outcomes.

A typical example of probability statement in this context could be "30% of the adult population is taller than 1.85cm"; it's clear that there are infinite possible heights (any number between 0m and 2.50m), so how can we represent this in our geometrical model? And how can we compute the probability of any event?

The key insight is that instead of talking about probability of having a specific height we talk about probability of being taller than or shorter than a specific height; indeed it's pretty straightforward that the probability of being exactly 1.80m tall down, not one atom more not one atom less, is 0% because it's one height among infinite possible heights.
This time in our usual rectangle we'll have overlapping regions representing the possible statements we are interested in and we'll have an infinite number of such regions.

{{statistics-chapter2-image1}}

We can still use the rules we introduced in the previous chapter, for example if we want to compute the probability of <label id="label-160">someone being taller than 1.60m</label> knowing that <label id="label-180" class="secondary">they are shorter than 1.80m</label> we can follow the usual construction for the conditional probability.

The cases where we have infinite possible outcomes are called **continuous probability distributions**. Since the probability of any specific outcome is $0$ we usually characterize them with a **cumulative distribution function** $F_X(x)=\mathbb{P}(X\le x)$, meaning that the value we are interested in (e.g. the height) is less or equal to a given numerical value (e.g. 1.80m).

Notice that we may well define a cumulative distribution function for a discrete probability distribution, and indeed it's often useful to do so, for example when we want to compare discrete and continuous probability distributions.

# Probability density functions

With finite probability distributions we have an easy way to compare how likely two events are: simply looking at the relative size of the rectangles, but with continuous probability distributions how can we tell that "being around 1.80m tall is much more likely than being around 2.20m tall"?
To do this we can modify our geometric representation a bit: instead of representing the event space as a big rectangle we represent it as the area under a curve such as the following:

{{statistics-chapter2-image2}}

The key difference is that the marks representing each height are now evenly spaced and we can judge the relative likelihoods just by looking at the y value of the curve at each height we are interested in: greater y values mean that it's likelier to be around that value. The function that represents the curve is called **probability density function** and we usually write it as $f_X(x)$.

Another very useful characteristic of introducing the probability density function is that it helps us to compute specific probabilities: we know that the probability of an event is the area of the region representing that event divided by the area of the whole event space, both these areas are the areas under the curve between two given points and if you studied calculus you'll know that it can be computed as an integral. For example the probability of being between 1.60m and 1.80m can be calculated as:

$$\mathbb{P}(1.60\le X\le 1.80)=\int_{1.60}^{1.80}f_X(x)\;dx$$

Remember that we also defined the cumulative distribution function $F_X$ as $F_X(x)=\mathbb{P}(X\le x)$, this implies that

$$
\begin{aligned}
F_X(x_2)-F_X(x_1)&=\mathbb{P}(X\le x_2)-\mathbb{P}(X\le x_1)\\
&=\int_{-\infty}^{x_2}f_X(x)\; dx \; -\;\int_{-\infty}^{x_1}f_X(x)\; dx\\
&=\int_{-\infty}^{x_2}f_X(x)\; dx \; +\;\int^{-\infty}_{x_1}f_X(x)\; dx\\
&=\int_{x_1}^{x_2}f_X(x)\; dx
\end{aligned}
$$

By the fundamental theorem of calculus we have proved that $f_X(x)$ is simply the derivative of $F_X(x)$.

# Random variables

We will often use the term **random variable**, meaning a value that depends on random phenomena (e.g. the height of an adult chosen at random); more formally to define a random variable we have to choose a probability space (e.g. the result of one spin of a slot machine) and then the random variable is any function that assigns a numerical value to each event in the probability space (e.g. the function that maps every possible combination of a slot machine's symbols to the associated prize).

Given a random variable $X$ the expression $\mathbb{P}(X<x)$ thus indicates the total probability of the events that when mapped by the function $X$ output a value less than $x$. For example, calling $X$ the random variable corresponding to a slot machine spin, $\mathbb{P}(X<100\$)$ is the probability of spinning a combination of symbols worth less than $100\$$.
The expression $\mathbb{P}(X<x)$ is exactly the same expression that we used to defined the cumulative distribution function and indeed it has the same name also in the context of random variables.

Notice that the random variable is completely described by its cumulative distribution function, so when studying it it's irrelevant which probability space was used to define it. For this reason from this point on we can forget about the geometric representation, the space of events and the rest of the theoretical roots of probability, because we will only deal with random variables, cumulative distribution functions and probability densities.

# Average, standard deviation and quantiles

Now that we are dealing with random variables that can have infinite possible values we need some syntethic ways to qualitatively describe them without having to explicitly say the probability of every possible value.

The first thing that comes to mind is calculating the **average value** of the random variable; if the variable $X$ has finite possible values than we know that the average $\mathbb{E}[X]$ is defined as follows:

$$\mathbb{E}[X]=\sum_{x_i} x_i\cdot \mathbb{P}(X=x_i)$$

In the continuous case the definition is analogous, but uses an integral and the probability density function instead of the sum and the probability function:

$$\mathbb{E}[X]=\int x \cdot f_X(x)\; dx$$

In a way we can say that the the mean is the center of gravity of the random variable.  
Notice that if the distribution is not symmetric than $\mathbb{P}(X\le \mathbb{E}[X])\ne 50\%$.

We often use the letter $\mu$ to indicate the mean if it's clear to which random variable we are referring. Furthermore average, mean and expected value all have the same meaning.

Another very important property of a random variable is it's **variance**, that is "how spread out it is"; formally the variance of a random variable $X$ is defined as follows:

$$\text{Var}(X)=\mathbb{E}[(X-\mu)^2]=\int (x-\mu)^2\cdot f_X(x)\; dx$$

We can understand this definition as "the variances is the average distance from the mean". Visually we can distinguish high variance and low variance variables by how "spiky" they look:

{{statistics-chapter2-image3}}

Often it's more practical to talk about the standard deviation of a random variable, that is the square root of the variance. We use the letter $\sigma$ to refer to the standard deviation and thus $\sigma^2$ is the variance.

Just because two distributions have the same average and variance doesn't mean that they are the same distribution, but it means that they have some commonalities. Below you can play around changing the average and variance of some very common distributions that we will explore more in depth later on:

{{statistics-chapter2-playground1}}

Another group of metrics that we can define for any random variable are the **quantiles**, the quantile $q_p(X)$ is the value such that $\mathbb{P}(X\le q_p(X))=p$, we can also leverage our definition of cumulative distribution function $F_X(x)=\mathbb{P}(X\le x)$ to notice that

$$q_p(X)=F_X^{-1}(p)$$

There are a few important quantiles that get their own names:

-   the **median** is the 50% quantile;
-   the quantiles with probabilities 25%, 50% and 75% are called **quartiles**.

# The law of large numbers

We will often need to handle several random variables at the same time, those variables are said to be **independent** if the value of one doesn't influence the other, for example height and weight are not independent because tall people are likely heavier too, whereas the result of one dice roll and of another one are independent. Formally we say that $X$ and $Y$ are independent random variables if

$$\mathbb{P}_{X=x}(Y=y)=\mathbb{P}(Y=y) \qquad \forall x,y$$

For independent random variables we have a couple of useful relations:

-   $\mathbb{E}[X]+\mathbb{E}[Y]=\mathbb{E}[X+Y]$
-   $\text{Var}(X)+\text{Var}(Y)=\text{Var}(X+Y)$

Furthermore for any random variable $X$ we have that

-   $\mathbb{E}\left[ X\over n\right]={\mathbb{E}[X]\over n}$
-   $\text{Var}\left(X\over n\right)={\text{Var}(X)\over n^2}$

From those properties we can prove the **law of large numbers**: if we call $\bar X_n$ the average of $n$ identically distributed independent random variables $X_1,...,X_n$ then

$$
\mathbb{E}[\bar X_n]=\mathbb{E}[X_1]\\
\lim_{n\to \infty}\text{Var}(\bar X_n)=0
$$

::: proof
We have defined $\bar X_n$ as $\bar X_n={1\over n}\sum_{i=1}^n X_i$, thus it's expected value is

$$
\begin{aligned}
\mathbb{E}[\bar X_n]&=\mathbb{E}\left[{1\over n}\sum_{i=1}^n X_i\right]\\
&={1\over n}\mathbb{E}\left[\sum_{i=1}^n X_i\right]\\
&={1\over n}\sum_{i=1}^n \mathbb{E}\left[X_i\right]\\
&={1\over n}\sum_{i=1}^n \mathbb{E}\left[X_1\right]\\
&={1\over n}n \mathbb{E}\left[X_1\right]\\
&=\mathbb{E}\left[X_1\right]
\end{aligned}
$$

With analogous calculations we find that

$$
Var(\bar X_n)={1\over n}Var(X_1)
$$

Thus $\lim_{n\to \infty}\text{Var}(\bar X_n)=0$.
:::

This means that as we average more and more random variables the distribution will come closer and closer to the mean.  
For example let's say that we throw a coin and say heads=1 and tails=0, the average coin toss will be 0.5, but it wouldn't be that weird to throw 2 heads in a row and get a mean of 1, on the other hand it would be extremely unlikely to throw 200 coins and still have a mean of less than 0.3.

We can verify this experimentally: try to do a few virtual coin tosses and see if the average value stabilizes around 0.5.

{{statistics-chapter2-playground2}}

If you try to do a few rounds of 200 tosses, you will notice that the average value after 5 coin flips bounces around quite a lot, but the average value after 200 coin flips is always very close to 0.5, that's because the variance of the former is high whereas the variance of the latter is low.
