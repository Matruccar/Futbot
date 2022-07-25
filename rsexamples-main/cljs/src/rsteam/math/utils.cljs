(ns rsteam.math.utils)

(defn close?
  ([a b] (close? a b (.-EPSILON js/Number)))
  ([a b tolerance] (< (Math/abs (- a b)) tolerance)))

(defn clamp 
  "Restringe el valor numérico n entre min y max"
  [n min' max']
  (max min' (min max' n)))

(defn sign 
  "Devuelve 1 si n es positivo, -1 si es negativo, y 0 si es cero"
  [n]
  (if (pos? n) 1
      (if (neg? n) -1 0)))