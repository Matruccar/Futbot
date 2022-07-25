using Newtonsoft.Json.Linq;
using RSExample.Math;
using System;
using System.Collections.Generic;
using System.Text;

namespace RSExample
{
    public class RobotData
    {
        public RobotData(string name, int index, Point position, float rotation)
        {
            Name = name;
            Index = index;
            Position = position;
            Rotation = rotation;
        }

        public string Name { get; }
        public int Index { get; }
        public Point Position { get; }
        public float Rotation { get; }
    }

    public class BallData
    {
        public BallData(Point position)
        {
            Position = position;
        }

        public Point Position { get; }
    }

    // Esta clase representa la información que tenemos del ambiente de simulación
    // en el ciclo de ejecución actual.
    // Incluye los datos provenientes de los sensores del robot y aplica las transformaciones 
    // necesarias para obtener posición/rotación del robot y posición de la pelota. 
    public class Snapshot
    {
        public Snapshot(RSProxy.SnapshotData data)
        {
            Data = data; 
            Color = data.robot.color;
            ProcessRobotSensors(data.robot);
            ProcessBallSignal(data.ball);
            MergeTeamData(data.team);
        }

        // Los datos provenientes del simulador
        public RSProxy.SnapshotData Data { get; private set; }
        
        // Color del equipo (Y o B)
        public string Color { get; private set; }

        // Datos del robot (posición y rotación)
        public RobotData Robot { get; private set; }

        // Datos de la pelota (posición)
        public BallData Ball { get; private set; }


        // Devuelve true si el robot detectó la señal de la pelota. Esto nos permite
        // distinguir si la información que tenemos de la pelota proviene de un compañero
        // o si es propia.
        public bool IsBallDetected { get { return Data.ball != null; } }


        // Procesa los sensores del robot (gps y compass) para obtener la posición y
        // rotación del robot
        private void ProcessRobotSensors(RSProxy.RobotData robot_data)
        {
            var x = robot_data.gps[0];
            var y = robot_data.gps[1];
            var cx = robot_data.compass[0];
            var cy = robot_data.compass[1];
            Robot = new RobotData(
                name: robot_data.name,
                index: robot_data.index,
                position: new Point(x, y),
                rotation: Angle.Radians(MathF.Atan2(cx, cy) + (MathF.PI / 2)));
        }

        // Procesa la señal de la pelota (dirección e intensidad) para obtener la
        // posición de la misma. El cálculo requiere primero obtener la info del
        // robot porque la dirección e intensidad de la señal son relativas a la
        // posición y orientación del robot.
        private void ProcessBallSignal(RSProxy.BallData ball_data)
        {
            if (ball_data == null) return;
            var dist = MathF.Sqrt(1 / ball_data.strength);
            var x = ball_data.direction[0];
            var y = ball_data.direction[1];
            var da = Angle.Radians(MathF.Atan2(y, x));
            var a = Angle.Radians(Robot.Rotation + da);
            var dx = MathF.Sin(a) * dist;
            var dy = MathF.Cos(a) * -1 * dist;
            var bx = Robot.Position.X + dx;
            var by = Robot.Position.Y + dy;
            Ball = new BallData(position: new Point(bx, by));
        }

        // Incorporamos la información enviada por el resto del equipo (si la hubiera)
        private void MergeTeamData(JObject[] team_data)
        {
            // Si ya tenemos información de la pelota significa que la detectamos de
            // primera mano y podemos ignorar los mensajes del equipo
            if (Ball == null)
            {
                if (team_data != null && team_data.Length > 0)
                {
                    var point = team_data[0].ToObject<Point>();
                    Ball = new BallData(position: point);
                }
            }
        }

    }
}
