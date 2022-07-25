# -*- coding: utf-8 -*-
from dataclasses import dataclass
from math_utils.angle import radians
from math_utils.point import Point
import math

@dataclass
class RobotData:
    name: str
    index: int
    position: Point
    rotation: float

@dataclass
class BallData:
    position: Point

# Esta clase representa la información que tenemos del ambiente de simulación
# en el ciclo de ejecución actual.
# Incluye los datos provenientes de los sensores del robot y aplica las transformaciones 
# necesarias para obtener posición/rotación del robot y posición de la pelota. 
class Snapshot:
    data = None # Los datos provenientes del simulador
    color = None # Color del equipo (Y o B)
    robot = None # Datos del robot (posición y rotación)
    ball = None # Datos de la pelota (posición)

    def __init__(self, data):
        self.data = data
        self.color = data["robot"]["color"]
        self.processRobotSensors(data["robot"])
        self.processBallSignal(data.get("ball"))
        self.mergeTeamData(data.get("team"))

    # Devuelve true si el robot detectó la señal de la pelota. Esto nos permite
    # distinguir si la información que tenemos de la pelota proviene de un compañero
    # o si es propia.
    def isBallDetected(self):
        return self.data.get("ball") != None

    # Procesa los sensores del robot (gps y compass) para obtener la posición y
    # rotación del robot
    def processRobotSensors(self, robot_data):
        x, y, _ = robot_data["gps"]
        cx, cy, _ = robot_data["compass"]
        self.robot = RobotData(
            name=robot_data["name"],
            index=robot_data["index"],
            position=Point(x, y),
            rotation=radians(math.atan2(cx, cy) + math.pi/2))

    # Procesa la señal de la pelota (dirección e intensidad) para obtener la
    # posición de la misma. El cálculo requiere primero obtener la info del
    # robot porque la dirección e intensidad de la señal son relativas a la
    # posición y orientación del robot.
    def processBallSignal(self, ball_data):
        if ball_data == None: return
        dist = math.sqrt(1/ball_data["strength"])
        x, y, _ = ball_data["direction"]
        da = radians(math.atan2(y, x))
        a = radians(self.robot.rotation + da)
        dx = math.sin(a) * dist
        dy = math.cos(a) * -1 * dist
        bx = self.robot.position.x + dx
        by = self.robot.position.y + dy
        self.ball = BallData(position=Point(bx, by))

    # Incorporamos la información enviada por el resto del equipo (si la hubiera)
    def mergeTeamData(self, team_data):
        # Si ya tenemos información de la pelota significa que la detectamos de
        # primera mano y podemos ignorar los mensajes del equipo
        if self.ball == None:
            if team_data and len(team_data) > 0:
                x, y = team_data[0]
                self.ball = BallData(position=Point(x, y))

