import unittest
from src.math_utils.point import Point
from src.math_utils.rectangle import Rectangle

def equal(rect1, rect2):
  return rect1.origin.x == rect2.origin.x \
    and rect1.origin.y == rect2.origin.y \
    and rect1.corner.x == rect2.corner.x \
    and rect1.corner.y == rect2.corner.y

class TestRectangle(unittest.TestCase):
  def test_grow_1(self):
    rect = Rectangle(Point(0, 0), Point(5, 5))
    expected = Rectangle(Point(-1, -1), Point(6, 6))
    actual = rect.growBy(1, 1)
    self.assertTrue(equal(expected, actual))
    
  def test_grow_2(self):
    rect = Rectangle(Point(-7, -6), Point(5, 5))
    expected = Rectangle(Point(-9, -9), Point(7, 8))
    actual = rect.growBy(2, 3)
    self.assertTrue(equal(expected, actual))
    
  def test_shrink_1(self):
    rect = Rectangle(Point(0, 0), Point(5, 5))
    expected = Rectangle(Point(1, 1), Point(4, 4))
    actual = rect.shrinkBy(1, 1)
    self.assertTrue(equal(expected, actual))
    
  def test_shrink_2(self):
    rect = Rectangle(Point(-7, -6), Point(5, 5))
    expected = Rectangle(Point(-5, -3), Point(3, 2))
    actual = rect.shrinkBy(2, 3)
    self.assertTrue(equal(expected, actual))

  def test_containsPoint(self):
    rect = Rectangle(Point(0, 0), Point(1, 1))
    self.assertTrue(rect.containsPoint(Point(0.5, 0.5)))
    self.assertTrue(rect.containsPoint(Point(0.25, 0.75)))
    self.assertTrue(rect.containsPoint(Point(0.75, 0.25)))
    self.assertFalse(rect.containsPoint(Point(-1, 0.5)))
    self.assertFalse(rect.containsPoint(Point(-1, -0.5)))
    self.assertFalse(rect.containsPoint(Point(1, 0.5)))
    self.assertFalse(rect.containsPoint(Point(1, -0.5)))
    self.assertFalse(rect.containsPoint(Point(-1, 2)))