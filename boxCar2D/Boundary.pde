class Boundary {
  float x, y, w, h;
  Body body;
  Boundary (float _x, float _y, float _w, float _h) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    BodyDef bd = new BodyDef();
    bd.type = BodyType.STATIC;
    bd.position.set(b2.coordPixelsToWorld(_x, _y));
    body = b2.createBody(bd);
    
    PolygonShape sd = new PolygonShape();
    float bW = b2.scalarPixelsToWorld(w/2);
    float bH = b2.scalarPixelsToWorld(h/2);
    sd.setAsBox(bW, bH);
    
    FixtureDef fd = new FixtureDef();
    fd.shape = sd;
    fd.friction = 0.3;
    fd.restitution = 0.5;
    fd.density = 1;
    
    body.createFixture(fd);
  }
  
  void show() {
    fill(0);
    stroke(0);
    rectMode(CENTER);
    pushMatrix();
    rect(this.x, this.y, this.w, this.h);
    popMatrix();
  }
}