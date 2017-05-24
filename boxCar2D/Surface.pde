class Surface {
  ArrayList<Vec2> surface;
  Surface() {
    surface = new ArrayList<Vec2>();

    ChainShape chain = new ChainShape();

    float xoff = 0.0;
    for (float x = 10*width+10; x > -10; x -= 5) {
      float y;
      float aleph = map(x, 10*width+10, -10, 220, 80);
      y = 200 + map(noise(xoff), 0, 1, -aleph, aleph);
      surface.add(new Vec2(x,y));
      xoff += 0.01;
    }
    Vec2[] vertices = new Vec2[surface.size()];
    for (int i = 0; i < vertices.length; i++) {
      Vec2 edge = b2.coordPixelsToWorld(surface.get(i));
      vertices[i] = edge;
    }

    chain.createChain(vertices,vertices.length);

    BodyDef bd = new BodyDef();
    bd.position.set(0.0f,0.0f);
    Body body = b2.createBody(bd);
    FixtureDef fd = new FixtureDef();
    fd.shape = chain;
    fd.density = 1;
    fd.restitution = 0.5;
    fd.friction = 1;
    body.createFixture(fd);

  }

  void display() {
    strokeWeight(3);
    stroke(0);
    noFill();
    beginShape();
    for (Vec2 v: surface) {
      vertex(v.x,v.y);
    }
    endShape();
    stroke(175);
    strokeWeight(0);
  }
}