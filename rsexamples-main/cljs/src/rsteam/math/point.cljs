(ns rsteam.math.point
  (:require [rsteam.math.angle :as a]
            [rsteam.math.utils :as m]))

(def ^:const ORIGIN {:x 0 :y 0})

(defn point 
  "Representa un punto en 2 dimensiones a partir de los valores :x e :y"
  [& {:keys [x y] :or {x 0 y 0}}]
  {:x x :y y})

(defn vec->point 
  "Construye un punto a partir de un vector de 2 elementos"
  [[x y]]
  {:x x :y y})

(defn angle->point
  "Devuelve el punto con el ángulo y la magnitud especificada"
  ([angle] (angle->point angle 1))
  ([angle magnitude]
   (point :x (* -1 magnitude (Math/sin angle))
          :y (* magnitude (Math/cos angle)))))

(defn dist 
  "Calcula la distancia entre 2 puntos"
  [{x :x y :y} {x' :x y' :y}]
  (let [dx (- x' x)
        dy (- y' y)]
    (Math/sqrt (+ (* dx dx) (* dy dy)))))

(defn magnitude 
  "Devuelve la magnitud del punto (distancia respecto del origen)"
  [p]
  (dist ORIGIN p))

(defn angle 
  "Devuelve el ángulo del punto (relativo al origen)"
  [{:keys [x y]}]
  (if (and (zero? x)
           (zero? y))
    (a/radians 0)
    (a/radians (Math/atan2 (* x -1) y))))

(defn average 
  "Devuelve el promedio de los puntos dados como parámetro"
  [points]
  (when (seq points)
    (let [x (/ (reduce + (map :x points))
               (count points))
          y (/ (reduce + (map :y points))
               (count points))]
      (point :x x :y y))))

(defn keep-inside-rectangle
  "Devuelve el punto más cercano cuyas coordenadas estén dentro 
   del rectángulo pasado como parámetro"
  [{:keys [x y] :as point} {:keys [origin corner]}]
  (assoc point
         :x (m/clamp x (:x origin) (:x corner))
         :y (m/clamp y (:y origin) (:y corner))))