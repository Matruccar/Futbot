import unittest
import src.math_utils.angle as Angle
from src.math_utils.point import Point
from test.utils import close


class TestPoint(unittest.TestCase):
    def test_magnitude(self):
        self.assertEqual(5, Point(3, 4).getMagnitude())
        self.assertEqual(5, Point(0, 5).getMagnitude())
        self.assertEqual(5, Point(5, 0).getMagnitude())

    def test_angle(self):
        test_cases = {}
        test_cases[(0, 0)] = 0
        test_cases[(0, 5)] = 0
        test_cases[(0, -5)] = 180
        test_cases[(5, 0)] = -90
        test_cases[(-5, 0)] = 90
        test_cases[(5, 5)] = -45
        test_cases[(-5, 5)] = 45
        test_cases[(5, -5)] = -135
        test_cases[(-5, -5)] = 135
        for (x, y), a in test_cases.items():
            p = Point(x, y)
            self.assertTrue(close(Angle.degrees(a), p.getAngle(), 0.000001))

    def test_dist(self):
        self.assertEqual(5, Point(6, 7).dist(Point(9, 11)))

    def test_fromAngle_default_magnitude(self):
        angles = [0, 45, -45, 90, -90, 135, -135, 210, 330, 180, -180, 360]
        for deg in angles:
            angle = Angle.degrees(deg)
            point = Point.fromAngle(angle)
            self.assertTrue(close(point.getMagnitude(), 1, 0.000001))
            self.assertTrue(close(point.getAngle(), angle, 0.000001))
    
    def test_fromAngle_custom_magnitude(self):
        angles = [0, 45, -45, 90, -90, 135, -135, 210, 330, 180, -180, 360]
        for deg in angles:
            angle = Angle.degrees(deg)
            point = Point.fromAngle(angle, 3)
            self.assertTrue(close(point.getMagnitude(), 3, 0.000001))
            self.assertTrue(close(point.getAngle(), angle, 0.000001))