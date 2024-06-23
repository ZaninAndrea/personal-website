Probability is a brach of mathematics concerned with formalizing a concept that we intuitively understand: in everyday life we use phrases like "It's likely to rain today" or "You have 1 in 6 chances of rolling 6 if the dice is fair". One of the marvelous characteristics of probability theory is that it never says what "choosing at random" means, it instead reformulates every statement about probability in terms of geometry.

For example the phrase "You have 1 in 6 chances of rolling 6 if the dice is fair" can be reformulated as follows:

-   take a rectangle of height 1 and width 6, <label id="label-rectangle">this rectangle</label> is called **event space**
-   divide it into 6 squares of height 1 and width 1, each <label id="label-square">square</label> corresponds with one of the possible outcomes of the dice roll
-   notice that the <label id="label-square6">square corresponding to the outcome 6</label> has area equal to 1/6th of the area of the rectangle

{{statistics-chapter1-image1}}

The key insight is that the events that we are considering (e.g. rolling a 6, rolling an even number, ...) are represented as areas inside a space of our choice and the probability of that event is its area divided by the area of the event space. The structure that we defined by choosing an event space and the areas corresponding to each event is called **probability space**.

Within this framework we can calculate other probabilities, for example the probability of rolling an even number: to do so we just need to compute the <label id="label-even-squares">area corresponding to that event</label>, this is simply 3 and so the probability is 3/6=50%.

Notice that we are not observing a real life phenomena and inferring the probability of each event (this is the job of statistics, as we'll see later on), we are on the other hand choosing a model and deducing some statements about it. For example "a fair dice" is just another way of saying "the squares corresponding to each dice roll all have the same area".
This choice of the model is absolutely crucial to probability theory, without knowing that the dice is fair we can say nothing about the probability of rolling an even number.

# Discrete probability distributions

Delving a bit deeper in our geometric model we should understand how we can define probability spaces; the first and most intuitive method is the discrete one: if we have a finite number of possible outcomes then we can simply represent each event as a rectangle of appropriate size and the event space will be the union of all the rectangles.

To show the power of this geometric model we will introduce another key concept: **conditional probability**. Conditional probability is the way we model statements like "What is the probability of having rolled a number greater than 3 knowing that the number is even?"; we represent the "knowing that" by _cropping_ the event space to the portion that satisfies the given condition.

So to compute the probability of the example we start by constructing the usual event space with 6 squares

{{statistics-chapter1-image2}}

Then we crop out the area corresponding to numbers greater than 3

{{statistics-chapter1-image3}}

The event <label id="label-even-roll3">"dice roll is even"</label> has a <label id="label-remaining-area">remaining area</label> of 2, while the area of the <label id="label-event-space-3">event space</label> is 3, so the probability is 2/3=66%.

# The algebraic representation

The geometric interpretation of probability is what allows us to talk about probability without being caught in a cyclical argument trying to define what "choosing at random" means, but phrasing everything in spelled out sentences isn't very practical and will be unsustainable when we'll tackle harder topics, thus we need to introduce a more compact way to talk about probability.

The key concept here is introducing the **probability measure**, this is simply a function that maps each event to it's area divided by the area of the event space, the probability measure symbol is $\mathbb{P}$. For example if we call $\text{D1}$ the even of rolling a 1 then the probability of rolling a 1 is $\mathbb{P}(\text{D1})$.

The conditional probability of event $A$ having happened knowing that $B$ has happened is written as $\mathbb{P}_B(A)$ and the whole process we went through in the previous sections to compute it can be summarised in this succinct formula:

$$\mathbb{P}_B(A)={\mathbb{P}(A\cap B)\over \mathbb{P}(B)}$$

Where $A\cap B$ is the intersection between $A$ and $B$, that is the result of cropping $A$ to fit inside $B$.

A useful property to remember is that $\mathbb{P}(A)=1-\mathbb{P}(A^C)$, where $A^C$ is the complementary event to $A$, that is "$A$ doesn't happen". This is trivial, because the area of $A$ plus the area of $A^C$ is the area of the event space.

# Bayes' theorem

This algebraic representation allows us to very easily prove one of the most famous theorems in probability: the **Bayes' theorem**. Start by noticing that by definition of the conditional probability $\mathbb{P}_B(A)$ we have that

$$\mathbb{P}(B)\mathbb{P}_B(A)=\mathbb{P}(A\cap B)$$

Similarly we can write the definition of $\mathbb{P}_A(B)$:

$$\mathbb{P}(A)\mathbb{P}_A(B)=\mathbb{P}(B\cap A)$$

The second term is identical in both expressions so

$$\mathbb{P}(B)\mathbb{P}_B(A)=\mathbb{P}(A\cap B)=\mathbb{P}(B\cap A)=\mathbb{P}(A)\mathbb{P}_A(B)$$

Thus we have $\mathbb{P}(B)\mathbb{P}_B(A)=\mathbb{P}(A)\mathbb{P}_A(B)$ and dividing by $\mathbb{P}(B)$ we get Bayes' theorem in its usual formulation:

$$\mathbb{P}_B(A)=\frac{\mathbb{P}(A)\mathbb{P}_A(B)}{\mathbb{P}(B)}$$

The usefulness of Bayes' theorem is that it allows us to "invert the knowns and the unknowns", that is we can calculate $\mathbb{P}_B(A)$ by knowing $\mathbb{P}_A(B)$.

# The law of total probability

In the future we will mostly use the algebraic formalism and the geometric representation will be the foundation we rely on to be rigorous when discussing probability, still having introduced this geometric view allows us to elegantly prove some important result, for example the **law of total probability**:

$$\mathbb{P}(B)=\mathbb{P}(B\cap A)+\mathbb{P}(B\cap A^C)$$

This is intuitively true when rephrasing it in geometric terms: the <label id="label-areaB">area of $B$</label> is the sum of the <label id="label-areaBA">area of $B$ that's also inside $A$</label> and the <label id="label-areaBAC">area of $B$ that's not inside $A$</label>.

{{statistics-chapter1-image4}}

This formula can also be written in an equivalent way by using the definition of conditional probability:

$$\mathbb{P}(B)=\mathbb{P}(A)\mathbb{P}_A(B)+\mathbb{P}(A^C)\mathbb{P}_{A^C}(B)$$

# A real life example

One real-life application of Bayes' theorem is understanding the result of medical exams, this is a very misunderstood topic because it goes against our intuitive notion of probability and is exactly where the mathematical approach shines.

Consider for example a city with a population of 1.000.000 of which 1.000 have contracted a particular disease. We have a test for the disease that has 99% accuracy, if John tests positive what is the probability of John being sick?

The intuitive answer is 99%, but as we'll see this is wrong because we are confusing $\mathbb{P}_B(A)$ with $\mathbb{P}_A(B)$. Let's rewrite the information in a more formal way: for starters we know that $\mathbb{P}(\text{sick})=1.000.000/1.000 = 0.1\%$, this comes from the fact that 1.000 out of 1.000.000 people have the disease.
The trickier part is the 99% test-accuracy, this means that if you are sick there is 99% probability that the test will be positive and if you aren't sick then you have a 99% probability of being negative, so more formally: $\mathbb{P}_\text{sick}(\text{positive})=99\%$ and $\mathbb{P}_\text{not sick}(\text{negative})=1\%$.

Notice that $\mathbb{P}_\text{not sick}(\text{positive})=1-\mathbb{P}_\text{not sick}(\text{negative})=1-99\%=1\%$, so by applying the law of total probability we get

$$
\begin{aligned}\mathbb{P}(\text{positive})&=\mathbb{P}(\text{sick})\mathbb{P}_\text{sick}(\text{positive})+\mathbb{P}(\text{not sick})\mathbb{P}_\text{not sick}(\text{positive})\\&=0.1\%\cdot 99\% + 99.9\%\cdot1\%\\&=1.098\%

\end{aligned}
$$

Finally we can apply Bayes' theorem to calculate the probability of being sick knowing that the test was positive:

$$
\begin{aligned}\mathbb{P}_\text{positive}(\text{sick})&={\mathbb{P}(\text{sick})\mathbb{P}_\text{sick}(\text{positive})\over \mathbb{P}(\text{positive})}\\&={0.1\%\;\cdot\;99\%\over 1.098\%}\\&=9.06\%
\end{aligned}
$$

So the real probability of being sick is just 9%. Intuitively this result can be explained by the fact that even though only 1% of the healthy population gets a positive diagnosis, the healthy population is so much larger than the sick one that most of the positive tests are false positives.
