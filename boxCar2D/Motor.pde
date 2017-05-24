class Motor {
  ArrayList<RevoluteJoint> rj;
  ArrayList<Wheel> w;
  DNA dna;
  float fitness = 0;
  int dead =  0;
  boolean deadBool = false;
  boolean completed = false;
  //See if isDead and isComplete flags are required
  Triangle t;
  Motor (float _x, float _y) {
    dna = new DNA();
    t = new Triangle(_x, _y, dna);
    rj = new ArrayList<RevoluteJoint>();
    w = new ArrayList<Wheel>();
    for(int i = 0; i < 8; ++i) {
      if (dna.genes[2 + 4 * i] > 0.6) {
        w.add(new Wheel(t.getVertexAt(i).x + t.getPosition().x, t.getVertexAt(i).y + t.getPosition().y, map(dna.genes[3 + 4 * i], 0, 1, 5, 30)));
        RevoluteJointDef rjd = new RevoluteJointDef();
        rjd.initialize(w.get(w.size() - 1).body, t.body, w.get(w.size() - 1).body.getWorldCenter());
        rjd.motorSpeed = 3*PI;  
        rjd.maxMotorTorque = 2000.0;
        rjd.enableMotor = true;
        rj.add((RevoluteJoint) b2.world.createJoint(rjd));
      }
    }
  }
  
  Motor (float _x, float _y, DNA newDna) {
    this.dna = newDna;
    //check index errors or if a for loop is required. Idk syntax very well.
    t = new Triangle(_x, _y, this.dna);
    rj = new ArrayList<RevoluteJoint>();
    w = new ArrayList<Wheel>();
    for(int i = 0; i < 8; ++i) {
      if (this.dna.genes[2 + 4 * i] > 0.6) {
        w.add(new Wheel(t.getVertexAt(i).x + t.getPosition().x, t.getVertexAt(i).y + t.getPosition().y, map(this.dna.genes[3 + 4 * i], 0, 1, 5, 30)));
        RevoluteJointDef rjd = new RevoluteJointDef();
        rjd.initialize(w.get(w.size() - 1).body, t.body, w.get(w.size() - 1).body.getWorldCenter());
        rjd.motorSpeed = 3*PI;  
        rjd.maxMotorTorque = 2000.0;
        rjd.enableMotor = true;
        rj.add((RevoluteJoint) b2.world.createJoint(rjd));
      }
    }
  }
  
  void killBody() {
    for(Wheel s : w) {
      s.killBody();
    }
    t.killBody();
  }
  
  void awaken() {
    this.t.body.setActive(true);
    for(Wheel v : this.w) {
      v.body.setActive(true);
    }
  }
  
  void sleep() {
    this.t.body.setActive(false);
    for(Wheel v : this.w) {
      v.body.setActive(false);
    }
  }
  
  void show() {
    pushMatrix();
    t.show();
   
    for(Wheel ws : w) {
      pushMatrix();
      ws.show();
      Vec2 anchor = b2.coordWorldToPixels(ws.body.getWorldCenter());
      stroke(0);
      line(anchor.x, anchor.y, t.getPosition().x, t.getPosition().y);
      popMatrix();
    }
    popMatrix();
  }
}