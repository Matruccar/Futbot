using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

using RSExample.Math;
using System.Collections.Generic;

namespace RSExampleTest
{
    [TestClass]
    public class PointTest
    {
        [TestMethod]
        public void TestMagnitude()
        {
            Assert.AreEqual(5, new Point(3, 4).Magnitude);
            Assert.AreEqual(5, new Point(0, 5).Magnitude);
            Assert.AreEqual(5, new Point(5, 0).Magnitude);
        }

        [TestMethod]
        public void TestAngle()
        {
            var testCases = new Dictionary<Point, float>();
            testCases[new Point(0, 0)] = 0;
            testCases[new Point(0, 5)] = 0;
            testCases[new Point(0, -5)] = 180;
            testCases[new Point(5, 0)] = -90;
            testCases[new Point(-5, 0)] = 90;
            testCases[new Point(5, 5)] = -45;
            testCases[new Point(-5, 5)] = 45;
            testCases[new Point(5, -5)] = -135;
            testCases[new Point(-5, -5)] = 135;
            foreach (var t in testCases)
            {
                var p = t.Key;
                var a = t.Value;
                Assert.AreEqual(Angle.Degrees(a), p.Angle, 0.000001,
                    $"Point: {p}, Expected: {a} deg, Actual: {Angle.RadiansToDegrees(p.Angle)} deg");
            }
        }

        [TestMethod]
        public void TestDist()
        {
            Assert.AreEqual(5, new Point(6, 7).Dist(new Point(9, 11)));
        }

        [TestMethod]
        public void TestPointFromAngleWithDefaultMagnitude()
        {
            var angles = new[] { 0, 45, -45, 90, -90, 135, -135, 210, 330, 180, -180, 360 };
            foreach (var deg in angles)
            {
                var angle = Angle.Degrees(deg);
                var point = Point.FromAngle(angle);
                Assert.AreEqual(1, point.Magnitude, 0.000001,
                    $"Wrong magnitude ({deg} deg)");
                Assert.AreEqual(angle, point.Angle, 0.000001,
                    $"Wrong angle ({deg} deg)");
            }
        }

        [TestMethod]
        public void TestPointFromAngleWithCustomMagnitude()
        {
            var angles = new[] { 0, 45, -45, 90, -90, 135, -135, 210, 330, 180, -180, 360 };
            foreach (var deg in angles)
            {
                var angle = Angle.Degrees(deg);
                var point = Point.FromAngle(angle, 3);
                Assert.AreEqual(3, point.Magnitude, 0.000001,
                    $"Wrong magnitude ({deg} deg)");
                Assert.AreEqual(angle, point.Angle, 0.000001,
                    $"Wrong angle ({deg} deg)");
            }
        }
    }
}
