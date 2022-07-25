(ns rsproxy.server
  (:require ["dgram" :as dgram]
            [oops.core :refer [oget]]
            [clojure.core.async :as a :refer [go <!]]))

(defn make-server []
  {:socket nil
   :port nil
   :setup! nil
   :loop! nil
   :previous-time nil})

(defn process-msg [server msg]
  (let [snapshot (js->clj (js/JSON.parse (str msg))
                          :keywordize-keys true)
        {:keys [previous-time setup! loop!]} @server]
    (when (or (nil? previous-time)
              (< (snapshot :time) previous-time))
      (setup!))
    (swap! server assoc :previous-time (snapshot :time))
    (js/JSON.stringify (clj->js (loop! snapshot)))))

(defn stop! [server]
  (let [wait (a/chan)
        [old _] (swap-vals! server assoc :socket nil)]
    (if-let [socket (old :socket)]
      (.close socket #(a/close! wait))
      (a/close! wait))
    wait))

(defn start!
  ([server]
   (let [{:keys [port setup! loop!]} @server]
     (start! server port setup! loop!)))
  ([server port setup! loop!]
   (go (<! (stop! server))
       (let [wait (a/chan)
             socket (dgram/createSocket "udp4")]
         (swap! server assoc
                :socket socket
                :port port
                :setup! setup!
                :loop! loop!)
         (doto socket
           (.on "error" (fn [err]
                          (stop! server)
                          (println "Server error:" err)
                          (a/close! wait)))
           (.on "message" (fn [msg rinfo]
                            (.send socket
                                   (process-msg server msg)
                                   (oget rinfo :port)
                                   (oget rinfo :address))))
           (.bind port #(do (println "UDP server listening on port" port)
                            (a/close! wait))))
         (<! wait)))))