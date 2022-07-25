import unittest
import math
import src.math_utils.angle as Angle
from test.utils import close

class TestAngle(unittest.TestCase):
    def test_d2r(self):
        self.assertEqual(math.pi, Angle.d2r(180))

    def test_equality(self):
        self.assertEqual(Angle.degrees(0), Angle.degrees(360))
        self.assertEqual(Angle.degrees(180), Angle.degrees(-180))
        self.assertEqual(Angle.degrees(-90), Angle.degrees(270))

    def test_opposite(self):
        self.assertEqual(Angle.opposite(Angle.degrees(90)), Angle.degrees(-90))
        self.assertEqual(Angle.opposite(Angle.degrees(90)), Angle.degrees(270))

    def test_diff(self):
        self.assertTrue(close(Angle.degrees(0),
                              Angle.diff(Angle.degrees(0),
                                         Angle.degrees(360)),
                              0.00001))
        self.assertTrue(close(Angle.degrees(90),
                              Angle.diff(Angle.degrees(45),
                                         Angle.degrees(-45)),
                              0.00001))
        self.assertTrue(close(Angle.degrees(90),
                              Angle.diff(Angle.degrees(-45),
                                         Angle.degrees(45)),
                              0.00001))
        self.assertTrue(close(Angle.degrees(90),
                              Angle.diff(11.780972450961723,
                                         -5.497787143782138),
                              0.00001))
                              
    def test_diffClockwise(self):
        self.assertTrue(close(Angle.degrees(90),
                              Angle.diffClockwise(Angle.degrees(45),
                                                  Angle.degrees(-45)),
                              0.00001))
        self.assertTrue(close(Angle.degrees(90),
                              Angle.diffClockwise(Angle.degrees(45),
                                                  Angle.degrees(315)),
                              0.00001))
        self.assertTrue(close(Angle.degrees(270),
                              Angle.diffClockwise(11.780972450961723,
                                                  -5.497787143782138),
                              0.00001))
                              
    def test_diffCounterclockwise(self):
        self.assertTrue(close(Angle.degrees(270),
                              Angle.diffCounterclockwise(Angle.degrees(45),
                                                         Angle.degrees(-45)),
                              0.00001))
        self.assertTrue(close(Angle.degrees(270),
                              Angle.diffCounterclockwise(Angle.degrees(45),
                                                         Angle.degrees(315)),
                              0.00001))
        self.assertTrue(close(Angle.degrees(90),
                              Angle.diffCounterclockwise(11.780972450961723,
                                                         -5.497787143782138),
                              0.00001))