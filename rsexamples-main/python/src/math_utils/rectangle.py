# -*- coding: utf-8 -*-
from math_utils.point import Point

# Representa un rectángulo alineado al eje. Está compuesto por dos 
# puntos: "origin" y "corner".
class Rectangle:
    def __init__(self, origin, corner):
        self.origin = origin
        self.corner = corner

    # Devuelve un nuevo rectángulo "agrandado" por las dimensiones 
    # especificadas para el eje X e Y
    def growBy(self, x, y):
        ox = self.origin.x - x
        oy = self.origin.y - y
        cx = self.corner.x + x
        cy = self.corner.y + y
        return Rectangle(Point(ox, oy), Point(cx, cy))

    # Devuelve un nuevo rectángulo "achicado" por las dimensiones 
    # especificadas para el eje X e Y
    def shrinkBy(self, x, y):
        ox = self.origin.x + x
        oy = self.origin.y + y
        cx = self.corner.x - x
        cy = self.corner.y - y
        return Rectangle(Point(ox, oy), Point(cx, cy))

    # Devuelve true si el punto dado como parámetro está contenido dentro
    # de los límites del rectángulo
    def containsPoint(self, point):
        x = point.x
        y = point.y
        x0 = self.origin.x
        y0 = self.origin.y
        x1 = self.corner.x
        y1 = self.corner.y
        return (x0 < x) and (y0 < y) \
            and (x1 > x) and (y1 > y)