(ns rsteam.snapshot
  (:require [clojure.set :refer [rename-keys]]
            [rsteam.math.angle :as a]))

(def team-names {"Y" ["Y1" "Y2" "Y3"]
                 "B" ["B1" "B2" "B3"]})

(defn process-robot-sensors 
  "Procesa los sensores del robot (gps y compass) para obtener la 
   posición y rotación del robot"
  [snapshot]
  (update snapshot :robot
          (fn [{name :name
                idx :index
                [x y] :gps
                [cx cy] :compass}]
            {:name name
             :index idx
             :x x :y y
             :a (a/radians (+ (Math/atan2 cx cy) a/HALF_PI))})))

(defn process-ball-signal
  "Procesa la señal de la pelota (dirección e intensidad) para obtener 
   la posición de la misma. El cálculo requiere primero obtener la info 
   del robot porque la dirección e intensidad de la señal son relativas 
   a la posición y orientación del robot."
  [snapshot]
  (let [{ox :x oy :y oa :a} (snapshot :robot)]
    (update snapshot :ball
            (fn [{:keys [direction strength] :as ball}]
              (when ball
                (let [dist (Math/sqrt (/ 1 strength))
                      [x y] direction
                      da (a/radians (Math/atan2 y x))
                      a (a/radians (+ oa da))
                      dx (* (Math/sin a) dist)
                      dy (* (Math/cos a) -1 dist)]
                  {:x (+ ox dx)
                   :y (+ oy dy)}))))))

(defn open-space-for-multiple-robots 
  "Transforma la key :robot en :robots y la convierte en un vector de 
   3 elementos rellenando con nil los índices correspondientes a los
   otros robots del equipo"
  [snapshot color]
  (-> snapshot
      (rename-keys {:robot :robots})
      (update :robots (fn [{:keys [name] :as robot}]
                        (mapv {name robot} (team-names color))))))

(defn merge-team-data 
  "Incorpora la información enviada por el resto del equipo (si la hubiera)"
  [snapshot team-data]
  (assoc snapshot
         :ball (or (:ball snapshot)
                   (first team-data))))

(defn transform [snapshot]
  (let [color (-> snapshot :robot :color)]
    (-> snapshot
        (process-robot-sensors)
        (process-ball-signal)
        (open-space-for-multiple-robots color)
        (merge-team-data (:team snapshot))
        (assoc :robot (-> snapshot :robot :index))
        (assoc :color color)
        (rename-keys {:waiting_for_kickoff :kickoff?})
        (dissoc :team))))
