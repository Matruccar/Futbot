(ns rsteam.angle-test
  (:require [cljs.test :refer-macros [deftest is testing]]
            [rsteam.math.angle :as a]
            [rsteam.math.utils :refer [close?]]))

(deftest degrees-to-radians
  (is (= Math/PI
         (a/degrees-to-radians 180))))

(deftest equality
  (is (= (a/degrees 0)
         (a/degrees 360)))
  (is (= (a/degrees 180)
         (a/degrees -180)))
  (is (= (a/degrees -90)
         (a/degrees 270))))

(deftest opposite
  (is (= (a/degrees -90)
         (a/opposite (a/degrees 90))))
  (is (= (a/degrees 270)
         (a/opposite (a/degrees 90)))))

(deftest diff
  (testing "diff"
    (is (close? (a/degrees 0)
                (a/diff (a/degrees 0)
                        (a/degrees 360))
                0.00001))
    (is (close? (a/degrees 90)
                (a/diff (a/degrees 45)
                        (a/degrees -45))
                0.00001))
    (is (close? (a/degrees 90)
                (a/diff (a/degrees -45)
                        (a/degrees 45))
                0.00001))
    (is (close? (a/degrees 90)
                (a/diff 11.780972450961723
                        -5.497787143782138)
                0.00001)))
  (testing "diff-clockwise"
    (is (close? (a/degrees 90)
                (a/diff-clockwise (a/degrees 45)
                                  (a/degrees -45))
                0.00001))
    (is (close? (a/degrees 90)
                (a/diff-clockwise (a/degrees 45)
                                  (a/degrees 315))
                0.00001))
    (is (close? (a/degrees 270)
                (a/diff-clockwise 11.780972450961723
                                  -5.497787143782138)
                0.00001)))
  (testing "diff-counterclockwise"
    (is (close? (a/degrees 270)
                (a/diff-counterclockwise (a/degrees 45)
                                         (a/degrees -45))
                0.00001))
    (is (close? (a/degrees 270)
                (a/diff-counterclockwise (a/degrees 45)
                                         (a/degrees 315))
                0.00001))
    (is (close? (a/degrees 90)
                (a/diff-counterclockwise 11.780972450961723
                                         -5.497787143782138)
                0.00001))))
