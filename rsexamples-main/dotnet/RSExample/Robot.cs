using RSExample.Math;
using RSProxy;
using System;
using System.Collections.Generic;
using System.Text;

namespace RSExample
{
    // Esta clase representa un robot. Incluye funciones primitivas de navegación
    // que permiten mover al robot en la cancha. Estas funciones de navegación no 
    // tienen un efecto inmediato en el simulador sino que recién se aplican en el 
    // siguiente ciclo de simulación.
    public class Robot
    {
        const float MAX_SPEED = 10;

        IRole role; // El rol define el comportamiento del robot
        Snapshot snapshot; // La snapshot contiene la información actualizada del mundo
        float leftVelocity = 0;  // Velocidad del motor izquierdo
        float rightVelocity = 0;  // Velocidad del motor derecho
        List<object> teamMessages = new List<object>(); // Mensajes a enviar al resto del equipo

        public Robot(IRole role)
        {
            this.role = role;
        }

        // La posición y rotación del robot las obtenemos de la snapshot
        public Point Position { get { return snapshot.Robot.Position; } }
        public float Rotation { get { return snapshot.Robot.Rotation; } }

        // La función "loop" se ejecuta en cada iteración. Recibe la información
        // del mundo y devuelve el mensaje a enviar al simulador, el cual contiene
        // las velocidades a aplicar a cada motor y los mensajes para el resto
        // del equipo. 
        // El comportamiento del robot se define en el método "run" (ver más abajo)
        public ResponseData Loop(SnapshotData data)
        {
            snapshot = new Snapshot(data);
            Run();
            var teamMessages = this.teamMessages.ToArray();
            this.teamMessages.Clear();
            return new ResponseData()
            {
                team = teamMessages,
                L = leftVelocity,
                R = rightVelocity,
            };
        }

        // Encola un mensaje para el resto del equipo
        public void SendDataToTeam(object data)
        {
            teamMessages.Add(data);
        }

        // Modifica la velocidad de los motores de forma que el robot gire hacia 
        // el ángulo especificado. Tiene en cuenta la simetría del robot.
        public void LookAtAngle(float a)
        {
            float vl, vr;
            var ra = Rotation;
            var delta = MathF.Min(Angle.Diff(a, ra), Angle.Diff(a, Angle.Opposite(ra)));
            var threshold = Angle.Degrees(1);

            if (delta < threshold)
            {
                vl = vr = 0;
            }
            else
            {
                var vel = Utils.Clamp(delta / Angle.Degrees(30), 0, 1);
                var p = Point.FromAngle(Angle.Radians(a - ra));
                if (p.X < 0)
                {
                    vl = vel * -1;
                    vr = vel;
                }
                else
                {
                    vl = vel;
                    vr = vel * -1;
                }
                if (p.Y > 0)
                {
                    vl *= -1;
                    vr *= -1;
                }
            }

            leftVelocity = vl * MAX_SPEED;
            rightVelocity = vr * MAX_SPEED;
        }

        // Modifica la velocidad de los motores de forma que el robot gire para
        // "mirar" al punto especificado. Tiene en cuenta la simetría del robot
        public void LookAtPoint(Point point)
        {
            var rx = Position.X;
            var ry = Position.Y;
            var px = point.X;
            var py = point.Y;
            LookAtAngle(new Point(px - rx, py - ry).Angle);
        }

        // Modifica la velocidad de los motores de manera que el robot se acerque
        // al punto especificado. Tiene en cuenta la simetría del robot.
        public void MoveToPoint(Point point)
        {
            float vl, vr;
            var rx = Position.X;
            var ry = Position.Y;
            var px = point.X;
            var py = point.Y;
            var a = new Point(px - rx, py - ry).Angle;
            var ra = Rotation;
            var delta = MathF.Min(Angle.Diff(a, ra), Angle.Diff(a, Angle.Opposite(ra)));
            var decrease = (Angle.RadiansToDegrees(delta) / 90) * 2;
            var p = Point.FromAngle(Angle.Radians(a - ra));
            if (p.X < 0)
            {
                vl = 1 - decrease;
                vr = 1;
            }
            else
            {
                vl = 1;
                vr = 1 - decrease;
            }
            if (p.Y > 0)
            {
                vl *= -1;
                vr *= -1;
            }

            leftVelocity = vl * MAX_SPEED;
            rightVelocity = vr * MAX_SPEED;
        }

        // Modifica la velocidad de los motores de forma que el robot se acerque a 
        // la pelota. Tiene en cuenta la simetría del robot.
        public void MoveToBall()
        {
            MoveToPoint(snapshot.Ball.Position);
        }

        // El método "run" implementa la lógica de comportamiento del robot
        private void Run()
        {
            // Si el robot detectó la señal de la pelota en este ciclo de simulación 
            // le comunica esta información a sus compañeros de forma que todos los
            // robots tengan información aproximada de la ubicación de la pelota
            if (snapshot.IsBallDetected)
            {
                SendDataToTeam(snapshot.Ball.Position);
            }

            // El comportamiento del robot depende del rol que tenga asignado
            role.ApplyOn(this, snapshot);
        }
    }
}
