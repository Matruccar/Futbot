(ns rsteam.math.angle)

(def ^:const PI Math/PI)
(def ^:const HALF_PI (/ PI 2))
(def ^:const TAU (* 2 PI))
(def ^:const RADIANS_PER_DEGREE (/ PI 180))

(defn degrees-to-radians 
  "Convierte un valor en grados a radianes"
  [degrees]
  (* degrees RADIANS_PER_DEGREE))

(defn radians-to-degrees
  "Convierte un valor en radianes a grados"
  [radians]
  (/ radians RADIANS_PER_DEGREE))

(defn- normalize 
  "Normaliza un valor en radianes para mantenerlo entre 0 y 2*PI"
  [radians] (mod radians TAU))

(defn degrees 
  "Devuelve un ángulo en grados"
  [d]
  (normalize (degrees-to-radians d)))

(defn radians 
  "Devuelve un ángulo en radianes"
  [r]
  (normalize r))

(defn opposite 
  "Devuelve el ángulo opuesto al especificado"
  [r]
  (normalize (+ r PI)))

(defn diff-clockwise 
  "Calcula la diferencia entre 2 ángulos, yendo en sentido horario 
   desde el ángulo 'a' hasta el ángulo 'b'"
  [a b] (normalize (- a b)))

(defn diff-counterclockwise 
  "Calcula la diferencia entre 2 ángulos, yendo en sentido antihorario 
   desde el ángulo 'a' hasta el ángulo 'b'"
  [a b] (normalize (- b a)))

(defn diff
  "Calcula la diferencia mínima entre 2 ángulos, independiente del sentido"
  [a b]
  (min (diff-clockwise a b)
       (diff-counterclockwise a b)))
