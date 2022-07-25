# -*- coding: utf-8 -*-
from math_utils.point import Point
from math_utils.angle import degrees

# El rol "BallFollower" sigue ciegamente a la pelota.
# ¡Ojo que podemos meter goles en contra! 
class BallFollower:
    def applyOn(self, robot, snapshot):
        # Si sabemos dónde está la pelota, nos movemos hacia ella.
        # Caso contrario, nos movemos al centro de la cancha
        if snapshot.ball != None:
            robot.moveToBall()
        else:
            robot.moveToPoint(Point.ORIGIN)

# El rol "Goalkeeper" implementa un arquero básico
class Goalkeeper:
    def applyOn(self, robot, snapshot):
        # Definimos un punto objetivo en el cual queremos ubicar el robot.
        # Este punto está dado por la coordenada X de la pelota y un valor
        # de Y fijo (este valor está definido de forma que esté cerca del 
        # arco pero fuera del área)
        if snapshot.ball != None:
            ball = snapshot.ball.position
        else:
            ball = Point.ORIGIN

        # Si el robot está lo suficientemente cerca del punto objetivo, 
        # entonces giramos para mirar a los laterales. Sino, nos movemos
        # hacia el punto objetivo
        target = Point(ball.x, - 0.55)
        if robot.getPosition().dist(target) < 0.01:
            robot.lookAtAngle(degrees(90))
        else:
            robot.moveToPoint(target)