using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

using RSExample.Math;

namespace RSExampleTest
{
    [TestClass]
    public class AngleTest
    {
        void AssertEqual(float a, float b)
        {
            Assert.AreEqual(a, b, 0.00001f);
        }

        [TestMethod]
        public void TestDegreesToRadians()
        {
            AssertEqual(MathF.PI, Angle.DegreesToRadians(180));
        }

        [TestMethod]
        public void TestEquality()
        {
            AssertEqual(Angle.Degrees(0), Angle.Degrees(360));
            AssertEqual(Angle.Degrees(180), Angle.Degrees(-180));
            AssertEqual(Angle.Degrees(-90), Angle.Degrees(270));
        }


        [TestMethod]
        public void TestOpposite()
        {
            AssertEqual(Angle.Degrees(-90), Angle.Opposite(Angle.Degrees(90)));
            AssertEqual(Angle.Degrees(270), Angle.Opposite(Angle.Degrees(90)));
        }

        [TestMethod]
        public void TestDiff()
        {
            AssertEqual(Angle.Degrees(0), Angle.Diff(Angle.Degrees(0), Angle.Degrees(360)));
            AssertEqual(Angle.Degrees(90), Angle.Diff(Angle.Degrees(45), Angle.Degrees(-45)));
            AssertEqual(Angle.Degrees(90), Angle.Diff(Angle.Degrees(-45), Angle.Degrees(45)));
            AssertEqual(Angle.Degrees(90), Angle.Diff(11.780972450961723f, -5.497787143782138f));
        }

        [TestMethod]
        public void TestDiffClockwise()
        {
            AssertEqual(Angle.Degrees(90), Angle.DiffClockwise(Angle.Degrees(45), Angle.Degrees(-45)));
            AssertEqual(Angle.Degrees(90), Angle.DiffClockwise(Angle.Degrees(45), Angle.Degrees(315)));
            AssertEqual(Angle.Degrees(270), Angle.DiffClockwise(11.780972450961723f, -5.497787143782138f));
        }

        [TestMethod]
        public void TestDiffCounterclockwise()
        {
            AssertEqual(Angle.Degrees(270), Angle.DiffCounterclockwise(Angle.Degrees(45), Angle.Degrees(-45)));
            AssertEqual(Angle.Degrees(270), Angle.DiffCounterclockwise(Angle.Degrees(45), Angle.Degrees(315)));
            AssertEqual(Angle.Degrees(90), Angle.DiffCounterclockwise(11.780972450961723f, -5.497787143782138f));
        }
    }
}
