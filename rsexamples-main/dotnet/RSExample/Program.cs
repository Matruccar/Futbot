using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;

using RSProxy;

namespace RSExample
{
    class Program
    {
        // Declaramos una variable para contener a nuestros robots
        static Robot[] robots;

        // La función "setup" se ejecuta cuando comienza el partido
        static void Setup() 
        {
            // Creamos 3 robots y asignamos sus respectivos roles
            robots = new[]
            {
                new Robot(new Goalkeeper()),
                new Robot(new BallFollower()),
                new Robot(new BallFollower())
            };
        }

        // La función "loop" se ejecuta para cada iteración del partido.
        // En la variable "snapshot" tenemos la información de los sensores 
        // del robot, a partir de la cual tenemos que tomar la decisión de
        // qué velocidad asignar a cada motor.
        static ResponseData Loop(SnapshotData snapshot)
        {
            // Buscamos el robot correspondiente a la iteración actual y le
            // mandamos el mensaje "loop", pasando como parámetro la snapshot
            var robot = robots[snapshot.robot.index];
            return robot.Loop(snapshot);
        }

        static void Main(string[] args)
        {
            // Iniciamos el servidor usando como puerto el valor pasado como
            // parámetro al programa (si no se especifica un puerto, usamos "12345").
            int port = args.Length > 0 ? int.Parse(args[0]) : 12345;
            var server = new Server(Setup, Loop);
            server.Start(port);
        }
    }
}
