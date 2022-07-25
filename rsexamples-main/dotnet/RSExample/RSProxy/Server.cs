using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace RSProxy
{
    public class Server
    {
        Action setup;
        Func<SnapshotData, ResponseData> loop;
        float? previousTime;

        public Server(Action setup, Func<SnapshotData, ResponseData> loop)
        {
            this.setup = setup;
            this.loop = loop;
        }

        private byte[] ProcessMessage(string message)
        {
            var snapshot = JsonConvert.DeserializeObject<SnapshotData>(message);
            if (previousTime == null || snapshot.time < previousTime)
            {
                setup();
            }
            previousTime = snapshot.time;

            var response = loop(snapshot);
            return Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(response));
        }

        public void Start(int port)
        {
            var socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
            socket.Bind(new IPEndPoint(IPAddress.Any, port));
            Console.WriteLine($"Server listening on port {port}");
                        
            var buffer = new byte[1024];
            while (true)
            {
                EndPoint rinfo = new IPEndPoint(IPAddress.Any, 0);
                int bytes = socket.ReceiveFrom(buffer, ref rinfo);
                var message = Encoding.UTF8.GetString(buffer, 0, bytes);
                var response = ProcessMessage(message);
                socket.SendTo(response, rinfo);
            }
        }
    }
}
