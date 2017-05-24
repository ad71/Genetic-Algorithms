//ORIGINAL (Before sandbox) CODE

//class Population {
//  ArrayList<Motor> cars;
//  int popsize = 1;
//  Surface surface;
  
//  Population() {
//    cars = new ArrayList<Motor>();
//    surface = new Surface();
//    for(int i = 0; i < popsize; ++i) {
//      cars.add(new Motor(100, 0));
//    }
//  }
  
//  //void run() {
//  //  for(int i = 0; i < popsize; ++i) {
//  //    int framecount = 0;
//  //    int deadC = 0;
//  //    while (true) {
//  //      background(255);
//  //      framecount++;
//  //      translate(-cars.get(i).t.getPosition().x + width/2, -cars.get(i).t.getPosition().y + height/2);
//  //      if(cars.get(i).t.body.getLinearVelocity().x < 0.001 && cars.get(i).t.body.getLinearVelocity().y < 0.001 && framecount > 300) {
//  //        deadC+=1;
//  //        background(0, 100, 0);
//  //      }
//  //      if (deadC > 150) {
//  //        background(255, 0, 0);
//  //        cars.get(i).killBody();
//  //        dead = 0;
//  //        framecount = 0;
//  //        break;
//  //      }
//  //      if (cars.get(i).t.getPosition().x > 10*width) {
//  //        background(0, 0, 255);
//  //        cars.get(i).killBody();
//  //        dead = 0;
//  //        framecount = 0;
//  //        break;
//  //      }
//  //      cars.get(i).show();
//  //      surface.display();
//  //    }
//  //  }
//    //for(int i = 0; i < popsize; ++i) {
//    //  int framecount = 0;
//    //  while(framecount < 100) {
//    //    framecount++;
//    //    background(255);
//    //    b2.step();
//    //    cars.get(i).show();
//    //    surface.display();
//    //  }
//    //}
//  //}
    
//  //add mating pool equivalent
//  //add evaluation function
//  //add selection function
//  //add execution function
//}

//Sandbox code
class Population {
  ArrayList<Motor> cars;
  ArrayList<Motor> matingPool;
  int popsize = 20;
  int generation = 1;
  Surface surface;
  
  Population() {
    cars = new ArrayList<Motor>();
    matingPool = new ArrayList<Motor>();
    surface = new Surface();
    for(int i = 0; i < popsize; ++i) { 
      cars.add(new Motor(200, 0));
    }
  }
  
  void evaluate() {
    float maxfit = 0;
    for(int i = 0; i < this.popsize; ++i) {
      if(this.cars.get(i).fitness > maxfit)
        maxfit = this.cars.get(i).fitness;
    }
    
    for(int i = 0; i <this.popsize; ++i) {
      this.cars.get(i).fitness /= maxfit;
    }
    
    this.matingPool = new ArrayList<Motor>();
    for(int i = 0; i < this.popsize; ++i) {
      int n = floor(this.cars.get(i).fitness * 100);
      for(int j = 0; j < n; ++j) {
        this.matingPool.add(this.cars.get(i));
      }
    }
  }
  
  void selection() {
    ArrayList<Motor> newCars = new ArrayList<Motor>();
    for(int i = 0; i < this.cars.size(); ++i) {
      DNA parentA = new DNA();
      int ra = floor(random(this.matingPool.size()));
      parentA = this.matingPool.get(ra).dna;
      DNA parentB = new DNA();
      int pil = 0; //to Prevent Infinite Loop
      do
      {
        pil ++;
        int rb = floor(random(this.matingPool.size()));
        parentB = this.matingPool.get(rb).dna;
      } while(parentA == parentB && pil < 1000);
      DNA child = parentA.crossover(parentB);
      child.mutate(0.01);
      newCars.add(new Motor(200, 0, child));
    }
    this.cars.clear();
    this.cars = newCars;
    surface = new Surface();
  }
}