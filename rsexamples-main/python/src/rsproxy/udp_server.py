# -*- coding: utf-8 -*-
import sys
import socket
import json

port = int(sys.argv[1])

class UDPServer:
    def __init__(self, setup, loop):
        self.setup = setup
        self.loop = loop

    def start(self):
        self.server_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.server_sock.bind(("", port))
        self.server_sock.settimeout(0.1)
        print("UDP Server listening on port " + str(port))

        self.previous_time = None

        while True:
            try:
                msg, addr = self.server_sock.recvfrom(1024)
                response = self.process_message(msg)
                self.server_sock.sendto(response, addr)
            except socket.timeout:
                pass

    def stop(self):
        self.server_sock.close()

    def process_message(self, msg):
        snapshot = json.loads(msg)
        if self.previous_time is None or snapshot["time"] < self.previous_time:
            self.setup()

        self.previous_time = snapshot["time"]
        response = self.loop(snapshot)
        return json.dumps(response).encode("utf8")
