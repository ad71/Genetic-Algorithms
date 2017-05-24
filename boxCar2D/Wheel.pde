class Wheel {
  float r;
  Body body;
  
  Wheel(float _x, float _y, float _r) {
    this.r = _r;
    BodyDef bd = new BodyDef();
    bd.type = BodyType.DYNAMIC;
    bd.position.set(b2.coordPixelsToWorld(_x, _y));
    body = b2.createBody(bd);
    
    CircleShape sd = new CircleShape();
    sd.m_radius = b2.scalarPixelsToWorld(r);
    
    FixtureDef fd = new FixtureDef();
    fd.shape = sd;
    fd.density = 1;
    fd.friction = 1;
    fd.restitution = 0.5;
    
    body.createFixture(fd);
    body.setActive(false);
  }
  
  void killBody() {
    b2.destroyBody(body);
  }

  void show() {
    fill(75, 200);
    stroke(0);
    pushMatrix();
    Vec2 pos = b2.getBodyPixelCoord(body);
    float a = body.getAngle();
    
    translate(pos.x, pos.y);
    rotate(-a);
    stroke(0);
    strokeWeight(1);
    ellipse(0, 0, 2*this.r, 2*this.r);
    line(0, 0, 0, this.r);
    popMatrix();
  }
}