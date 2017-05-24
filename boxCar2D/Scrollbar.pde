class Scrollbar {
  int swidth, sheight;
  float xpos, ypos;
  float spos, newspos;
  float sposMin, sposMax;
  int loose;
  boolean over;
  boolean locked;
  float ratio;
  
  Scrollbar(float xp, float yp, int sw, int sh, int l) {
    this.swidth = sw;
    this.sheight = sh;
    int widthtoheight = sw - sh;
    ratio = (float)sw / (float)widthtoheight;
    this.xpos = xp;
    this.ypos = yp - sheight/2;
    this.spos = xpos + swidth/2 - sheight/2;
    this.newspos = spos;
    this.sposMin = xpos;
    this.sposMax = xpos + swidth - sheight;
    loose = l;
  }
  
  void update() {
    if(overEvent()) {
      over = true;
    } else {
      over = false;
    }
    if (mousePressed && over) {
      locked = true;
    }
    if (!mousePressed) {
      locked = false;
    }
    if (locked) {
      newspos = constrain(mouseX - sheight/2, sposMin, sposMax);
    }
    if (abs(newspos - spos) > 1) {
      spos = spos + (newspos - spos)/loose;
    }
  }
  
  float constrain(float val, float minv, float maxv) {
    return min(max(val, minv), maxv);
  }
  
  boolean overEvent() {
    if (mouseX > xpos && mouseX < xpos + swidth && mouseY > ypos + 18 && mouseY < ypos + sheight) {
      return true;
    } else {
      return false;
    }
  }
  
  void show() {
    noStroke();
    fill(204);
    rect(xpos, ypos, swidth, sheight);
    if (over || locked) {
      fill(0, 0, 0);
    } else {
      fill(102, 102, 102);
    }
    rect(spos, ypos, sheight, sheight);
  }
  
  float getPos() {
    return spos*ratio;
  }
}