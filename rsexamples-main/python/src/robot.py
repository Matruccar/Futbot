# -*- coding: utf-8 -*-
import math_utils.angle as Angle
from math_utils.point import Point
from math_utils.utils import clamp
from snapshot import Snapshot

from collections import deque

MAX_SPEED = 10

# Esta clase representa un robot. Incluye funciones primitivas de navegación
# que permiten mover al robot en la cancha. Estas funciones de navegación no 
# tienen un efecto inmediato en el simulador sino que recién se aplican en el 
# siguiente ciclo de simulación.
class Robot:
    role = None # El rol define el comportamiento del robot
    snapshot = None # La snapshot contiene la información actualizada del mundo
    leftVelocity = 0 # Velocidad del motor izquierdo
    rightVelocity = 0 # Velocidad del motor derecho
    teamMessages = deque() # Mensajes a enviar al resto del equipo

    def __init__(self, role):
        self.role = role

    # La posición del robot la obtenemos de la snapshot actual
    def getPosition(self):
        return self.snapshot.robot.position

    # La rotación del robot la obtenemos de la snapshot actual
    def getRotation(self):
        return self.snapshot.robot.rotation

    # La función "loop" se ejecuta en cada iteración. Recibe la información
    # del mundo y devuelve el mensaje a enviar al simulador, el cual contiene
    # las velocidades a aplicar a cada motor y los mensajes para el resto
    # del equipo. 
    # El comportamiento del robot se define en el método "run" (ver más abajo)
    def loop(self, data):
        self.snapshot = Snapshot(data)
        self.run()
        teamMessages = list(self.teamMessages)
        self.teamMessages.clear()
        return {
            "team": teamMessages,
            "L": self.leftVelocity,
            "R": self.rightVelocity
        }

    # Encola un mensaje para el resto del equipo
    def sendDataToTeam(self, data):
        self.teamMessages.append(data)

    # Modifica la velocidad de los motores de forma que el robot gire hacia 
    # el ángulo especificado. Tiene en cuenta la simetría del robot.
    def lookAtAngle(self, a):
        ra = self.getRotation()
        delta = min(Angle.diff(a, ra), Angle.diff(a, Angle.opposite(ra)))
        threshold = Angle.degrees(1)

        if delta < threshold:
            vl = 0
            vr = 0
        else:
            vel = clamp(delta / Angle.degrees(30), 0, 1)
            p = Point.fromAngle(Angle.radians(a - ra))
            if p.x < 0:
                vl = vel * -1
                vr = vel
            else:
                vl = vel
                vr = vel * -1
            if p.y > 0:
                vl = vl * -1
                vr = vr * -1
        
        self.leftVelocity = vl * MAX_SPEED
        self.rightVelocity = vr * MAX_SPEED

    # Modifica la velocidad de los motores de forma que el robot gire para
    # "mirar" al punto especificado. Tiene en cuenta la simetría del robot
    def lookAtPoint(self, point):
        position = self.getPosition()
        rx = position.x
        ry = position.y
        px = point.x
        py = point.y
        self.lookAtAngle(Point(px - rx, py - ry).getAngle())

    # Modifica la velocidad de los motores de manera que el robot se acerque
    # al punto especificado. Tiene en cuenta la simetría del robot.
    def moveToPoint(self, point):
        position = self.getPosition()
        rx = position.x
        ry = position.y
        px = point.x
        py = point.y
        a = Point(px - rx, py - ry).getAngle()
        ra = self.getRotation()
        delta = min(Angle.diff(a, ra), Angle.diff(a, Angle.opposite(ra)))
        decrease = (Angle.r2d(delta) / 90) * 2
        p = Point.fromAngle(Angle.radians(a - ra))
        if p.x < 0:
            vl = 1 - decrease
            vr = 1
        else:
            vl = 1
            vr = 1 - decrease
        if p.y > 0:
            vl = vl * -1
            vr = vr * -1
        
        self.leftVelocity = vl * MAX_SPEED
        self.rightVelocity = vr * MAX_SPEED

    # Modifica la velocidad de los motores de forma que el robot se acerque a 
    # la pelota. Tiene en cuenta la simetría del robot.
    def moveToBall(self):
        self.moveToPoint(self.snapshot.ball.position)

    # El método "run" implementa la lógica de comportamiento del robot
    def run(self):
        # Si el robot detectó la señal de la pelota en este ciclo de simulación 
        # le comunica esta información a sus compañeros de forma que todos los
        # robots tengan información aproximada de la ubicación de la pelota
        if self.snapshot.isBallDetected():
            pos = self.snapshot.ball.position
            self.sendDataToTeam([pos.x, pos.y])

        # El comportamiento del robot depende del rol que tenga asignado
        self.role.applyOn(self, self.snapshot)