# -*- coding: utf-8 -*-
from rsproxy.server import Server
from robot import Robot
from roles import (BallFollower, Goalkeeper)

# La función "setup" se ejecuta cuando comienza el partido
def setup():
    # Creamos 3 robots y asignamos sus respectivos roles
    global robots
    robots = [Robot(Goalkeeper()),
            Robot(BallFollower()),
            Robot(BallFollower())]

# La función "loop" se ejecuta para cada iteración del partido.
# En la variable "snapshot" tenemos la información de los sensores
# del robot, a partir de la cual tenemos que tomar la decisión de
# qué velocidad asignar a cada motor
def loop(snapshot):
    # Buscamos el robot correspondiente a la iteración actual y le
    # mandamos el mensaje "loop", pasando como parámetro la snapshot
    robot = robots[snapshot["robot"]["index"]]
    return robot.loop(snapshot)

# Instanciamos e iniciamos el servidor. Si estamos corriendo el 
# controlador dentro del contexto de webots, el servidor se va a
# comunicar directamente con webots. Si lo estamos corriendo por
# afuera, el servidor va a levantar un socket UDP en el puerto
# pasado como parámetro al programa.
server = Server(setup, loop)
server.start()
