# -*- coding: utf-8 -*-
Server = None
try:
    from rsproxy.webots_server import WebotsServer
    Server = WebotsServer
except:
    from rsproxy.udp_server import UDPServer
    Server = UDPServer

