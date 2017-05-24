int np = 8;
class Triangle {
  Body body;
  int r = 10;
  float[] angles = new float[np];
  float[] magnitudes = new float[np+1];
  ArrayList<Vec2> thirdvertex;
  float asum = 0.0;
  DNA tmpdna;
  
  Triangle (float _x, float _y, DNA dna) {
    this.tmpdna = dna;
    for(int i = 0; i < 8; ++i) {
      angles[i] = map(dna.genes[1 + 4*i], 0, 1, PI/16, 2*PI/np);
    }
    magnitudes[0] = map(dna.genes[0], 0, 1, 1, 80);
    magnitudes[1] = map(dna.genes[4], 0, 1, 1, 80);
    magnitudes[2] = map(dna.genes[8], 0, 1, 1, 80);
    magnitudes[3] = map(dna.genes[12], 0, 1, 1, 80);
    magnitudes[4] = map(dna.genes[16], 0, 1, 1, 80);
    magnitudes[5] = map(dna.genes[20], 0, 1, 1, 80);
    magnitudes[6] = map(dna.genes[24], 0, 1, 1, 80);
    magnitudes[7] = map(dna.genes[28], 0, 1, 1, 80);
    magnitudes[8] = map(dna.genes[32], 0, 1, 1, 80);
    thirdvertex = new ArrayList<Vec2>();
    BodyDef bd = new BodyDef();
    bd.type = BodyType.DYNAMIC;
    bd.position.set(b2.coordPixelsToWorld(_x, _y));
    body = b2.createBody(bd);
 
    ArrayList<PolygonShape> ps = new ArrayList<PolygonShape>();
    Vec2 temp = b2.vectorPixelsToWorld(new Vec2(magnitudes[0] * cos(0), magnitudes[0] * sin(0)));
   
    for(int i = 0; i < np; ++i) {
      asum += angles[i];
      Vec2[] vertices = new Vec2[3];
      vertices[0] = b2.vectorPixelsToWorld(new Vec2(0, 0));
      vertices[1] = temp;
      vertices[2] = b2.vectorPixelsToWorld(new Vec2(magnitudes[i+1] * cos(asum), magnitudes[i+1] * sin(asum)));
     
      temp = vertices[2];
      thirdvertex.add(b2.vectorWorldToPixels(vertices[2]));
  
      PolygonShape sd = new PolygonShape();
      sd.set(vertices, vertices.length);
      FixtureDef fd = new FixtureDef();
      fd.shape = sd;
      fd.friction = 0.2;
      fd.density = 10;
      fd.restitution = 0.5;
      ps.add(sd);
      body.createFixture(fd);
      body.setActive(false);
    }
  }
  
  Vec2 getRandomVertex() {
    int r = int(random(thirdvertex.size()));
    return thirdvertex.get(r);
  }
  
  Vec2 getVertexAt(int i) {
    return thirdvertex.get(i);
  }
  
  Vec2 getPosition() {
    return b2.getBodyPixelCoord(body);
  }
  
  void killBody() {
    b2.destroyBody(body);
  }

  void show() {
    fill(map(this.tmpdna.genes[33], 0, 1, 0, 255), map(this.tmpdna.genes[34], 0, 1, 0, 255), map(this.tmpdna.genes[35], 0, 1, 0, 255));
    stroke(127);
    pushMatrix();
    Vec2 pos = b2.getBodyPixelCoord(body);
    float a = body.getAngle();

    translate(pos.x, pos.y);
    rotate(-a);

    Fixture f = body.getFixtureList();
    for(int i = 0; i < np; ++i) {
      beginShape();
      PolygonShape ps = (PolygonShape) f.getShape();
      for(int j = 0; j < ps.getVertexCount(); ++j) {
        Vec2 v = b2.vectorWorldToPixels(ps.getVertex(j));
        vertex(v.x, v.y);
      }
      endShape(CLOSE);
      f = f.getNext();
    }
    popMatrix();
  }
}