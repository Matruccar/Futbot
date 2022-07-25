using System;
using System.Collections.Generic;
using System.Text;

namespace RSExample.Math
{
    public class Angle
    {
        const float RADIANS_PER_DEGREE = MathF.PI / 180;

        // Convierte un valor en grados a radianes
        public static float DegreesToRadians(float deg) { return deg * RADIANS_PER_DEGREE; }

        // Convierte un valor en radianes a grados
        public static float RadiansToDegrees(float rad) { return rad / RADIANS_PER_DEGREE; }

        // Normaliza un valor en radianes para mantenerlo entre 0 y 2*PI
        public static float Normalize(float rad)
        {
            return Utils.Mod(rad, MathF.PI * 2);
        }

        // Devuelve un ángulo en radianes
        public static float Radians(float rad)
        {
            return Normalize(rad);
        }

        // Devuelve un ángulo en grados
        public static float Degrees(float deg)
        {
            return Normalize(DegreesToRadians(deg));
        }

        // Devuelve el ángulo opuesto al especificado
        public static float Opposite(float rad)
        {
            return Normalize(rad + MathF.PI);
        }

        // Calcula la diferencia entre 2 ángulos, yendo en sentido horario
        // desde el ángulo "a" hasta el ángulo "b" 
        public static float DiffClockwise(float a, float b)
        {
            return Normalize(a - b);
        }

        // Calcula la diferencia entre 2 ángulos, yendo en sentido antihorario
        // desde el ángulo "a" hasta el ángulo "b"
        public static float DiffCounterclockwise(float a, float b)
        {
            return Normalize(b - a);
        }

        // Calcula la diferencia mínima entre 2 ángulos, independiente del sentido
        public static float Diff(float a, float b)
        {
            return MathF.Min(DiffClockwise(a, b), DiffCounterclockwise(a, b));
        }
    }
}
