using System;
using System.Collections.Generic;
using System.Text;

namespace RSExample.Math
{
    public class Utils
    {
        // Operación módulo. Funciona correctamente con valores negativos de "n".
        // No confundir con el operador % (remainder) de C#. Ver:
        // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/arithmetic-operators#remainder-operator-
        public static float Mod(float n, float d)
        {
            return ((n % d) + d) % d;
        }

        // Restringe el valor numérico "n" entre "min" y "max"
        public static float Clamp(float n, float min, float max)
        {
            return MathF.Max(min, MathF.Min(max, n));
        }
    }
}
