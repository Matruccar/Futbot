(ns rsteam.robot
  (:require [rsteam.math.point :as p]
            [rsteam.math.angle :as a]
            [rsteam.math.utils :refer [clamp]]))

(def ^:const MAX_SPEED 10)

(defn move-to-point
  "Modifica la velocidad de los motores de manera que el robot se acerque
   al punto especificado. Tiene en cuenta la simetría del robot."
  [{rx :x ry :y ra :a} {px :x py :y}]
  (mapv (partial * MAX_SPEED)
        (let [angle (p/angle (p/point :x (- px rx)
                                      :y (- py ry)))
              diff (min (a/diff angle ra)
                        (a/diff angle (a/opposite ra)))
              decrease (* 2 (/ (a/radians-to-degrees diff) 90))
              {:keys [x y]} (p/angle->point (a/radians (- angle ra)))
              wheels (if (neg? x)
                       [(- 1 decrease) 1]
                       [1 (- 1 decrease)])]
          (if (neg? y)
            wheels
            (mapv (partial * -1) wheels)))))

(defn look-at-angle 
  "Modifica la velocidad de los motores de forma que el robot gire hacia 
   el ángulo especificado. Tiene en cuenta la simetría del robot"
  [{ra :a} angle]
  (mapv (partial * MAX_SPEED)
        (let [delta (min (a/diff angle ra)
                         (a/diff angle (a/opposite ra)))
              threshold (a/degrees 1)]
          (if (< delta threshold)
            [0 0]
            (let [vel (clamp (/ delta (a/degrees 30)) 0 1)
                  {:keys [x y]} (p/angle->point (a/radians (- angle ra)))
                  wheels (if (neg? x)
                           [(* vel -1) vel]
                           [vel (* vel -1)])]
              (if (neg? y)
                wheels
                (mapv (partial * -1) wheels)))))))

(defn look-at-point 
  "Modifica la velocidad de los motores de forma que el robot gire para
   'mirar' al punto especificado. Tiene en cuenta la simetría del robot"
  [{rx :x ry :y, :as robot} {px :x py :y}]
  (let [angle (p/angle (p/point :x (- px rx)
                                :y (- py ry)))]
    (look-at-angle robot angle)))