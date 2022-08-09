Perhaps the most important distribution in all of statistics is the **Gaussian distribution**, also known as normal distribution. It has a bell shape and spans all the real line, in fact for every real value $x$ we have $f_X(x)>0$.

{{statistics-chapter3-image1}}

To be precise we don't have one single normal distribution, we have instead an infinite family of normal distributions, each characterized (or more formally "parameterized") by $\mu$ and $\sigma^2$; for this reason we usually denote a normal distribution as $N(\mu,\sigma^2)$.

{{statistics-chapter3-playground2}}

The probability density function of a normal distribution is

$$
f(x)={{1\over\sqrt{2\pi\sigma^2}}e^{-{(x-\mu)^2\over 2 \sigma^2}}}
$$

It may look scary at first, but let's unpack it bit by bit:

-   the fraction ${1\over\sqrt{2\pi\sigma^2}}$ is just a normalization term, which means that it's there just to make sure that the area under the curve is $1$, this is a convention throughout probability but it doesn't fundamentally change the essence of the distribution
-   the second term is the exponential of a negative quantity, so it will approach $0$ very fast as the exponent gets larger
-   at the exponent we have $(x-\mu)^2$, this bit is **symmetric** with respect to $\mu$ and thus it makes the whole distribution symmetric with respect to $\mu$
-   finally at the denominator of the exponent we have $\sigma^2$, so for larger values of $\sigma^2$ the exponent will increase slower and thus the whole distribution will approach $0$ slower

The probability distribution is defined with $\mu$ and $\sigma^2$ as parameters, which may look confusing because $\mu$ and $\sigma^2$ are also used to refer to the mean and the variance of a random variable. However it turns out that if we have a random variable $X$ with distribution $N(\mu,\sigma^2)$, which we can also compactly write as $X\sim N(\mu,\sigma^2)$, then $\mathbb{E}[X]=\mu$ and $Var(X)=\sigma^2$; we can easily prove the statement about the expected value leveraging the symmetry of the distribution, the one about the variance is less straightforward.

::: proof
Let's start by considering $\mu=0$: take a random variable $X\sim N(0,\sigma^2)$, then by definition its expected value is

$$
\mathbb{E}[X]=\int_{-\infty}^{+\infty} x f(x)\; dx
$$

As we noticed above the function $f$ is symmetric with respect to $\mu$, so in this case we have $f(x)=f(-x)$. We can leverage this fact by splitting the integral in two parts and then performing a variable change in the first one:

$$
\begin{aligned}
\mathbb{E}[X]&=\int_{-\infty}^{0} x f(x)\; dx \; + \; \int_{0}^{+\infty} x f(x)\; dx\\
&=\int_{0}^{+\infty} -x f(-x)\; dx \; + \; \int_{0}^{+\infty} x f(x)\; dx\\
&=\int_{0}^{+\infty} -x f(x)\; dx \; + \; \int_{0}^{+\infty} x f(x)\; dx\\
&=-\int_{0}^{+\infty} x f(x)\; dx \; + \; \int_{0}^{+\infty} x f(x)\; dx\\
&=0
\end{aligned}
$$

To generalize the proof to the case with any $\mu$ let's first notice that given any random variable $X$ and a constant $k$ we have that

$$
\begin{aligned}
\mathbb{E}[X+k]&=\int (x + k) * f(x)\; dx\\
&=\int x f(x)\; dx \; + \; \int k f(x)\; dx\\
&=\int x f(x)\; dx \; +\; k\int f(x)\; dx\\
&=\mathbb{E}[X] + k \cdot 1\\
&=\mathbb{E}[X] + k
\end{aligned}
$$

Then we can conclude the thesis by noticing that if $X\sim N(\mu, \sigma^2)$ then $X-\mu\sim N(0, \sigma^2)$, as we can easily verify that $f_{N(\mu,\sigma^2)}(x)=f_{N(0,\sigma^2)}(x-\mu)$.  
Trivially $X=X-\mu + \mu$, so $\mathbb{E}[X]=\mathbb{E}[X-\mu+\mu]=\mathbb{E}[X-\mu]+\mu$, but we have proven that $\mathbb{E}[X-\mu]=0$, so $\mathbb{E}[X]=\mu$.
:::

From the properties of mean and variance that we discovered in the previous chapter follows that if we have a random variable $X$ with distribution $N(\mu, \sigma^2)$, then:

-   $X+k$ has distribution $N(\mu+k, \sigma^2)$
-   $X/h$ has distribution $N\left({\mu\over h}, {\sigma^2\over h^2}\right)$
-   ${X+k\over h}$ has distribution $N\left({\mu +k\over h}, {\sigma^2\over h^2}\right)$

# Stability of the gaussian distribution

An interesting property of the normal distribution is that any linear combination of normally distributed random variables is still normally distributed, that is if we take $X\sim N(\mu_x, \sigma_x^2)$ and $Y\sim N(\mu_y, \sigma_y^2)$ independent random variables then $Z=aX+bY$ (where $a$ and $b$ are real numbers) has distribution $N(\mu_z,\sigma_z^2)$. This is property is called **stability** of the distribution.  
Furthermore from the properties of the expected value and the variance seen in the previous chapter follows that $\mu_z=a\mu_x+b\mu_y$ and $\sigma_z^2=a^2\sigma_x^2+b^2\sigma_y^2$.

Down below you can see what happens when you sum two normally distributed random variables:

{{statistics-chapter3-playground1}}

Notice that not all distributions have the stability property, for example the uniform distribution is not stable:

{{statistics-chapter3-playground3}}

# Convergence

If shown the sequence $1,{1\over2},{1\over3},{1\over 4},...$, even without formal mathematical training, you'd easily recognize that the sequence is approaching $0$, or more formally that the limit of the sequence is $0$; we can define a similar concept of limit also for random variables.

In the last chapter we have seen that a random variable is identified by its cumulative distribution function (CDF), so it seems natural to defined the **convergence of a sequence of random variables** by looking at the sequence of the CDFs: given any sequence of random variables $X_1,X_2,...$ we say that the sequence has as limit the random variable $X$ if

$$
\forall x\in\mathbb{R}.\; \lim_{n\to+\infty} F_{X_n}(x)=F_X(x)
$$

Which means that the value of <span style="color:var(--primary-color)">the CDF of $X_n$</span> at any point approaches the value of <span style="color:var(--blue)">the CDF of $X$</span> at that same point. Visually it looks like this

{{statistics-chapter3-playground4}}

# The Central Limit Theorem

Many real life random variables, for example height and weight, follow a normal distribution, so studying its properties allows us to have more tools to study real life phenomena. This alone would make the Gaussian distribution a very important distribution, but its applicability is far wider thanks to the **Central Limit Theorem**, whose statement is the following:

Given $n$ independent random variables $X_1,...,X_n$ all having the same distribution with average $\mu$ and variance $\sigma^2$, define $Z_n={\bar X_n -\mu\over \sqrt{\sigma^2/n}}$ where $\bar X_n$ is the average of the variables $X_i$, then the limit of the sequence $Z_n$ is a random variable with distribution $N(0,1)$.

Let's unpack all that jargon:

-   we take $n$ independent random variables with any distribution, not necessarily normally distributed, but it has to be the same for all the variables
-   we average all the variables, just like we did in the law of large numbers. This time however we shift the result by subtracting $\mu$, this makes it so that $\mathbb{E}[Z_n]=0$ (you can verify that by doing a bit of calculations if you feel like it), and then we scale the result by dividing it by $\sqrt{\sigma^2/n}$, this makes it so that $Var(Z_n)=1$ (again you can check it for yourself)
-   the incredible result is that as $n$ gets larger and larger the distribution of this "modified" average tends to a normal distribution, meaning that its cumulative distribution function (CDF) gets closer and closer to the CDF of the normal distribution $N(0,1)$

Unfortunately the proof of this theorem requires some advanced concepts, so we won't work through it, but we will be using this theorem extensively in the following chapters; it will be particularly useful to approximate the distribution of sums of independent random variables when dealing with the correct distribution is too hard.

For example if we choose the random variables $X_i$ to represent $N$ coin flips, then then the <span style="color:var(--primary-color)">distribution of $Z_n$</span> compared to the <span style="color:var(--blue)">$N(0,1)$ distribution</span> looks as follows:

{{statistics-chapter3-playground5}}
