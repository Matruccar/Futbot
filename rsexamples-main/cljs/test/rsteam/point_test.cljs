(ns rsteam.point-test
  (:require [cljs.test :refer-macros [deftest is testing]]
            [rsteam.math.point :as pt]
            [rsteam.math.angle :as a]
            [rsteam.math.utils :refer [close?]]))

(deftest magnitude
  (is (= 5 (pt/magnitude (pt/point :x 3 :y 4))))
  (is (= 5 (pt/magnitude (pt/point :x 0 :y 5))))
  (is (= 5 (pt/magnitude (pt/point :x 5 :y 0)))))

(deftest angle
  (let [test-cases {[ 0  0]    0
                    [ 0  5]    0
                    [ 0 -5]  180
                    [ 5  0]  -90
                    [-5  0]   90
                    [ 5  5]  -45
                    [-5  5]   45
                    [ 5 -5] -135
                    [-5 -5]  135}]
    (doseq [[[x y] a] test-cases]
      (let [p (pt/point :x x :y y)]
        (is (close? (a/degrees a)
                    (pt/angle p)
                    0.000001)
            (str "Point: " p ", Expected: " a " deg, Actual: "
                 (a/radians-to-degrees (pt/angle p)) " deg"))))))

(deftest dist
  (is (= 5 (pt/dist (pt/vec->point [6 7]) 
                    (pt/vec->point [9 11])))))

(deftest angle->point-with-default-magnitude
  (doseq [degrees [0 45 -45 90 -90 135 -135 210 330 180 -180 360]]
    (let [angle (a/degrees degrees)
          point (pt/angle->point angle)]
      (is (close? 1 (pt/magnitude point)
                  0.000001)
          (str "Wrong magnitude (" degrees "deg)"))
      (is (close? angle (pt/angle point)
                  0.000001)
          (str "Wrong angle (" degrees "deg)")))))

(deftest angle->point-with-custom-magnitude
  (doseq [degrees [0 45 -45 90 -90 135 -135 210 330 180 -180 360]]
    (let [angle (a/degrees degrees)
          point (pt/angle->point angle 3)]
      (is (close? 3 (pt/magnitude point)
                  0.000001)
          (str "Wrong magnitude (" degrees "deg)"))
      (is (close? angle (pt/angle point)
                  0.000001)
          (str "Wrong angle (" degrees "deg)")))))