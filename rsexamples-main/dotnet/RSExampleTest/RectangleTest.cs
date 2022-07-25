using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

using RSExample.Math;

namespace RSExampleTest
{
    [TestClass]
    public class RectangleTest
    {
        public void AssertEqual(Rectangle rect1, Rectangle rect2)
        {
            Assert.IsTrue(rect1.Origin.X == rect2.Origin.X
                        && rect1.Origin.Y == rect2.Origin.Y
                        && rect1.Corner.X == rect2.Corner.X
                        && rect1.Corner.Y == rect2.Corner.Y);
        }

        [TestMethod]
        public void TestGrow1()
        {
            var rect = new Rectangle(new Point(0, 0), new Point(5, 5));
            var expected = new Rectangle(new Point(-1, -1), new Point(6, 6));
            var actual = rect.GrowBy(1, 1);
            AssertEqual(expected, actual);
        }

        [TestMethod]
        public void TestGrow2()
        {
            var rect = new Rectangle(new Point(-7, -6), new Point(5, 5));
            var expected = new Rectangle(new Point(-9, -9), new Point(7, 8));
            var actual = rect.GrowBy(2, 3);
            AssertEqual(expected, actual);
        }

        [TestMethod]
        public void TestShrink1()
        {
            var rect = new Rectangle(new Point(0, 0), new Point(5, 5));
            var expected = new Rectangle(new Point(1, 1), new Point(4, 4));
            var actual = rect.ShrinkBy(1, 1);
            AssertEqual(expected, actual);
        }

        [TestMethod]
        public void TestShrink2()
        {
            var rect = new Rectangle(new Point(-7, -6), new Point(5, 5));
            var expected = new Rectangle(new Point(-5, -3), new Point(3, 2));
            var actual = rect.ShrinkBy(2, 3);
            AssertEqual(expected, actual);
        }

        [TestMethod]
        public void TestContainsPoint()
        {
            var rect = new Rectangle(new Point(0, 0), new Point(1, 1));
            var points = new[] 
            {
                (new Point(0.5f, 0.5f), true),
                (new Point(0.25f, 0.75f), true),
                (new Point(0.75f, 0.25f), true),
                (new Point(-1f, 0.5f), false),
                (new Point(-1f, -0.5f), false),
                (new Point(1f, 0.5f), false),
                (new Point(1f, -0.5f), false),
                (new Point(-1f, 2f), false),
            };

            for (var i = 0; i < points.Length; i++)
            {
                var (p, b) = points[i];
                Assert.AreEqual(b, rect.ContainsPoint(p));
            }
        }
    }
}
