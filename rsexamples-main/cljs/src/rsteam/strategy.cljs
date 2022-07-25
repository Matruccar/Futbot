(ns rsteam.strategy
  (:require [rsteam.robot :as r]
            [rsteam.math.angle :as a]
            [rsteam.math.point :as p]))

; El rol "BallFollower" sigue ciegamente a la pelota.
; ¡Ojo que podemos meter goles en contra! 
(def ball-follower {:name ::ball-follower})

; El rol "Goalkeeper" implementa un arquero básico
(def goalkeeper {:name ::goalkeeper})

(defmulti choose-action (fn [robot _snapshot] (-> robot :role :name)))

(defmethod choose-action :default [_ _] nil)

(defmethod choose-action ::goalkeeper [robot {:keys [ball]}]
  ; Definimos un punto objetivo en el cual queremos ubicar el robot.
  ; Este punto está dado por la coordenada X de la pelota y un valor
  ; de Y fijo (este valor está definido de forma que esté cerca del 
  ; arco pero fuera del área)
  (let [target (p/point :y -0.55 
                        :x (:x ball))]
    ; Si el robot está lo suficientemente cerca del punto objetivo, 
    ; entonces giramos para mirar a los laterales. Sino, nos movemos
    ; hacia el punto objetivo
    (if (< (p/dist robot target) 0.01)
      (r/look-at-angle robot (a/degrees 90))
      (r/move-to-point robot target))))

(defmethod choose-action ::ball-follower [robot {:keys [ball]}]
  ; Si sabemos dónde está la pelota, nos movemos hacia ella.
  ; Caso contrario, nos movemos al centro de la cancha
  (r/move-to-point robot ball))

(defn update-role [snapshot robot-idx]
  ; Definimos el rol del robot
  (update-in snapshot [:robots robot-idx]
             assoc :role
             (if (zero? robot-idx)
               goalkeeper
               ball-follower)))

(defn update-action [snapshot robot-idx]
  ; Actualizamos la velocidad de las ruedas del robot
  (update-in snapshot [:robots robot-idx]
             (fn [robot] (assoc robot :wheels 
                                (choose-action robot snapshot)))))

(defn run [snapshot robot-idx]
  (-> snapshot
      (update-role robot-idx)
      (update-action robot-idx)))
