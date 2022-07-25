# -*- coding: utf-8 -*-
import math

RADIANS_PER_DEGREE = math.pi/180

# Convierte un valor en grados a radianes
def d2r(deg):
    return deg*RADIANS_PER_DEGREE

# Convierte un valor en radianes a grados
def r2d(rad):
    return rad/RADIANS_PER_DEGREE

# Normaliza un valor en radianes para mantenerlo entre 0 y 2*PI
def normalize(rad): 
    return rad % (math.pi*2)

# Devuelve un ángulo en radianes
def radians(rad):
    return normalize(rad)

# Devuelve un ángulo en grados
def degrees(deg):
    return normalize(d2r(deg))

# Devuelve el ángulo opuesto al especificado
def opposite(rad):
    return normalize(rad + math.pi)

# Calcula la diferencia entre 2 ángulos, yendo en sentido horario
# desde el ángulo "a" hasta el ángulo "b" 
def diffClockwise(a, b):
    return normalize(a - b)

# Calcula la diferencia entre 2 ángulos, yendo en sentido antihorario
# desde el ángulo "a" hasta el ángulo "b"
def diffCounterclockwise(a, b):
    return normalize(b - a)

# Calcula la diferencia mínima entre 2 ángulos, independiente del sentido
def diff(a, b):
    dc = diffClockwise(a, b)
    dcc = diffCounterclockwise(a, b)
    return min(dc, dcc)
            