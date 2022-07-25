(ns rsteam.rectangle-test
(:require [cljs.test :refer-macros [deftest is testing]]
          [rsteam.math.point :as p]
          [rsteam.math.rectangle :as r]))

(deftest grow-1
  (let [rect (r/rectangle :origin (p/vec->point [0 0])
                          :corner (p/vec->point [5 5]))
        expected (r/rectangle :origin (p/vec->point [-1 -1])
                              :corner (p/vec->point [6 6]))
        actual (r/grow-by rect 1)]
    (is (= expected actual))))

(deftest grow-2
  (let [rect (r/rectangle :origin (p/vec->point [-7 -6])
                          :corner (p/vec->point [5 5]))
        expected (r/rectangle :origin (p/vec->point [-9 -9])
                              :corner (p/vec->point [7 8]))
        actual (r/grow-by rect 2 3)]
    (is (= expected actual))))

(deftest shrink-1
  (let [rect (r/rectangle :origin (p/vec->point [0 0])
                          :corner (p/vec->point [5 5]))
        expected (r/rectangle :origin (p/vec->point [1 1])
                              :corner (p/vec->point [4 4]))
        actual (r/shrink-by rect 1)]
    (is (= expected actual))))

(deftest shrink-2
  (let [rect (r/rectangle :origin (p/vec->point [-7 -6])
                          :corner (p/vec->point [5 5]))
        expected (r/rectangle :origin (p/vec->point [-5 -3])
                              :corner (p/vec->point [3 2]))
        actual (r/shrink-by rect 2 3)]
    (is (= expected actual))))

(deftest contains-point?
  (let [rect (r/rectangle :origin (p/vec->point [0 0])
                          :corner (p/vec->point [1 1]))]
    (is (r/contains-point? rect (p/vec->point [0.5 0.5])))
    (is (r/contains-point? rect (p/vec->point [0.25 0.75])))
    (is (r/contains-point? rect (p/vec->point [0.75 0.25])))
    (is (not (r/contains-point? rect (p/vec->point [-1 0.5]))))
    (is (not (r/contains-point? rect (p/vec->point [-1 -0.5]))))
    (is (not (r/contains-point? rect (p/vec->point [1 0.5]))))
    (is (not (r/contains-point? rect (p/vec->point [1 -0.5]))))
    (is (not (r/contains-point? rect (p/vec->point [-1 2]))))))