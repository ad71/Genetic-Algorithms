# Car AI

[This](https://github.com/ad71/Unity-Projects-2/tree/master/Car%20AI%20GA) is the link to the actual project.
The environment, created on Unity-C#, consists of a track on an island. The track is marked with waypoints. Cars can run on the tracks following the waypoints. Each car tries to steer towards the next closest waypoint. A function similar to the `seek` behavior by Craig Reynolds is used to handle the steering of the cars.

### The DNA sequence
Each DNA sequence contains 18 optimizable variables. Each element handles a physical property of the car. The 18 variables are:
1. maxSteerAngle
2. topSpeed
3. maxMotorTorque
4. maxBrakingTorque
5. centerOfMass.y
6. Mass
7. sensorLength
8. sensorSkewAngle
9. 4WheelDrive?
10. 4WheelBrake?
11. 4WheelTurn?
12. switchToNextWaypointDistance
13. sense()?
14. brakingConditions1
15. brakingConditions2
16. avoidMultiplier parameter
17. lerpToSteerAngle?
18. turningSpeed
The use of some of these variables will be apparent only after looking at the source code.

### Algorithm
A modified genetic algorithm is used to optimize  over the DNA sequence in order to find the set of parameters that allow a car to achieve the lowest track time. The lowest time recorded yet was about 16 seconds.