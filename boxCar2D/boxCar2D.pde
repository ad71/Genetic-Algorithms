import shiffman.box2d.*;

import org.jbox2d.collision.shapes.*;
import org.jbox2d.collision.shapes.Shape;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;
import org.jbox2d.dynamics.joints.*;
import org.jbox2d.dynamics.contacts.*;

import java.util.Random;

//Commented experimental code in sandboxBoxCar2D folder in this repo
Box2DProcessing b2;
Population p;
boolean awake = false;
int i = 0;

void setup() {
  fullScreen();
  b2 = new Box2DProcessing(this);
  frameRate(100);
  b2.createWorld();
  p = new Population();
}

/*IDEA:
use a global variable to set arguments for draw and change global variables through a third function called through draw when execution terminates
*/

void draw() {
  if(!awake) {
    p.cars.get(i).awaken();
  }
  background(255);
  b2.step();
  translate(-p.cars.get(i).t.getPosition().x+width/2, 200);
  if(p.cars.get(i).t.body.getLinearVelocity().x < 0.001 && p.cars.get(i).t.body.getLinearVelocity().y <0.001 && frameCount > 300) {
    p.cars.get(i).dead += 1;
  }
  if(p.cars.get(i).dead > 150) {
    awake = false;
    iterate(true, false);
  }
  if(p.cars.get(i).t.getPosition().x > 10*width) {
    background(0, 0, 200);
    awake = false;
    iterate(false, true);
  }
  p.surface.display();
  p.cars.get(i).show();
  fill(200, 100, 100);
  fill(0);
  text("Framerate: " + floor(frameRate) + "fps", -410+p.cars.get(i).t.getPosition().x, -160+p.cars.get(i).t.getPosition().y);
  text("Trial: " + (i + 1), -410+p.cars.get(i).t.getPosition().x, -120+p.cars.get(i).t.getPosition().y);
  text("Generation: " + Integer.toString(p.generation), -410+p.cars.get(i).t.getPosition().x, -140+p.cars.get(i).t.getPosition().y);
}

void iterate(boolean _dead, boolean _completed) {
  if(_dead) {
    p.cars.get(i).fitness = pow(p.cars.get(i).t.getPosition().x, 3)/pow(frameCount, 2);
    frameCount = 0;
    p.cars.get(i).deadBool = true;
    p.cars.get(i).sleep();
    p.cars.get(i).killBody();
  }
  if(_completed) {
    p.cars.get(i).fitness = pow(p.cars.get(i).t.getPosition().x, 3)/pow(frameCount, 2);
    p.cars.get(i).fitness *= 1.25;
    frameCount = 0;
    p.cars.get(i).deadBool = true;
    p.cars.get(i).completed = true;
    p.cars.get(i).sleep();
    p.cars.get(i).killBody();
  }
  if(i < p.popsize) {
    i++;
  }
  if(i == p.popsize) {
    frameCount = 0;
    i = 0;
    p.generation++;
    p.evaluate();
    p.selection();
  }
}

void mousePressed() {
  awake = false;
  p.cars.get(i).sleep();
  p.cars.get(i).killBody();
  p.cars.set(i, new Motor(200, 0));
}