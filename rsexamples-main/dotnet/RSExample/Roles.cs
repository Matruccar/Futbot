using RSExample.Math;
using System;
using System.Collections.Generic;
using System.Text;

namespace RSExample
{
    public interface IRole
    {
        void ApplyOn(Robot robot, Snapshot snapshot);
    }


    // El rol "BallFollower" sigue ciegamente a la pelota.
    // ¡Ojo que podemos meter goles en contra! 
    public class BallFollower : IRole
    {
        public void ApplyOn(Robot robot, Snapshot snapshot)
        {
            // Si sabemos dónde está la pelota, nos movemos hacia ella.
            // Caso contrario, nos movemos al centro de la cancha
            if (snapshot.Ball != null)
            {
                robot.MoveToBall();
            }
            else
            {
                robot.MoveToPoint(Point.ORIGIN);
            }
        }
    }

    // El rol "Goalkeeper" implementa un arquero básico
    public class Goalkeeper : IRole
    {
        public void ApplyOn(Robot robot, Snapshot snapshot)
        {
            // Definimos un punto objetivo en el cual queremos ubicar el robot.
            // Este punto está dado por la coordenada X de la pelota y un valor
            // de Y fijo (este valor está definido de forma que esté cerca del 
            // arco pero fuera del área)
            var ball = snapshot.Ball != null ? snapshot.Ball.Position : Point.ORIGIN;
            var target = new Point(ball.X, -0.55f);

            // Si el robot está lo suficientemente cerca del punto objetivo, 
            // entonces giramos para mirar a los laterales. Sino, nos movemos
            // hacia el punto objetivo
            if (robot.Position.Dist(target) < 0.01)
            {
                robot.LookAtAngle(Angle.Degrees(90));
            }
            else
            {
                robot.MoveToPoint(target);
            }
        }
    }
}
