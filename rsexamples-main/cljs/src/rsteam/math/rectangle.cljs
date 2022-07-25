(ns rsteam.math.rectangle)

(defn rectangle 
  "Representa un rectángulo alineado al eje. Está compuesto por dos 
   puntos: origin y corner"
  [& {:keys [origin corner]}]
  {:origin origin
   :corner corner})

(defn grow-by
  "Devuelve un nuevo rectángulo 'agrandado' por las dimensiones 
   especificadas para el eje X e Y"
  ([rect n] (grow-by rect n n))
  ([rect x y]
   (-> rect
       (update-in [:origin :x] - x)
       (update-in [:origin :y] - y)
       (update-in [:corner :x] + x)
       (update-in [:corner :y] + y))))

(defn shrink-by 
  "Devuelve un nuevo rectángulo 'achicado' por las dimensiones 
   especificadas para el eje X e Y"
  ([rect n] (shrink-by rect n n))
  ([rect x y]
   (-> rect
       (update-in [:origin :x] + x)
       (update-in [:origin :y] + y)
       (update-in [:corner :x] - x)
       (update-in [:corner :y] - y))))

(defn contains-point? 
  "Devuelve true si el punto dado como parámetro está contenido
   dentro de los límites del rectángulo"
  [rect point]
  (let [{:keys [x y]} point
        {x0 :x y0 :y} (:origin rect)
        {x1 :x y1 :y} (:corner rect)]
    (and (< x0 x) (< y0 y)
         (> x1 x) (> y1 y))))