# Smart Rockets
---
This program demonstrates how a population of `rockets` can be taught to meander around an obstacle using genetic algorithms. Is it deployed [here](https://smart-rockets.firebaseapp.com/)

### How rockets are built
Each rocket consists of an origin vertex, where all the forces are applied. An arrow-like shape is drawn around this origin, to resemble a rocket.

### The DNA sequence
Each rocket lives for 400 frames and hence the DNA consists of 400 vectors, one for each frame. The corresponding vector is applied as a force to the rocket at each frame.

### Algorithm
The DNA sequences thus obtained are subjected to optimization using a genetic algorithm in order to create an array of vectors (the physics vectors) that would lead the rocket to the target circle at the top of the screen..