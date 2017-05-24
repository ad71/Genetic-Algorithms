class DNA {
  float genes[] = new float[36];
  DNA() {
    for(int i = 0; i < 36; ++i) {
      genes[i] = random(1);
    }
  }
  
  DNA(float newgenes[]) {
    this.genes = newgenes;
  }
  
  DNA crossover (DNA partnerDNA) {
    float newgenes[] = new float[36];
    int mid = floor(random(this.genes.length));
    for(int i = 0; i < this.genes.length; ++i) {
      if (i > mid) {
        newgenes[i] = this.genes[i];  
      } else {
        newgenes[i] = partnerDNA.genes[i];
      }
    }
    return new DNA(newgenes);
  }
  
    void mutate(float mutationRate) {
    for (int i = 0; i < this.genes.length; ++i) {
      if (random(1) < mutationRate) {
        this.genes[i] = random(1);
      }
    }
  }
}