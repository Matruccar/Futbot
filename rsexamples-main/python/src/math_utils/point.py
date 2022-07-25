# -*- coding: utf-8 -*-
import math
from math_utils.angle import radians
from math_utils.utils import clamp

# Representa un vector de 2 dimensiones (x, y)
class Point():

    # Devuelve el punto con el ángulo y la magnitud especificada
    @classmethod
    def fromAngle(cls, angle, magnitude=1):
        x = magnitude * -1 * math.sin(angle)
        y = magnitude * math.cos(angle)
        return cls(x, y)

    # Devuelve el promedio de los puntos dados como parámetro 
    @classmethod
    def average(cls, points):
        x = 0
        y = 0
        for p in points:
            x = x + p.x
            y = y + p.y
        c = len(points)
        return cls(x/c, y/c)

    def __init__(self, x, y):
        self.x = x
        self.y = y

    # Calcula la distancia entre 2 puntos
    def dist(self, point):
        dx = point.x - self.x
        dy = point.y - self.y
        return math.sqrt(dx*dx + dy*dy)

    # Devuelve la magnitud del vector
    def getMagnitude(self):
        return self.dist(Point.ORIGIN)

    # Devuelve el ángulo del vector
    def getAngle(self):
        if self.x == 0 and self.y == 0:
            return radians(0)
        return radians(math.atan2(self.x * -1, self.y))

    # Devuelve el punto más cercano cuyas coordenadas estén dentro
    # del rectángulo pasado como parámetro.
    def keepInsideRectangle(self, rect):
        x = clamp(self.x, rect.origin.x, rect.corner.x)
        y = clamp(self.y, rect.origin.y, rect.corner.y)
        return Point(x, y)

Point.ORIGIN = Point(0, 0)
