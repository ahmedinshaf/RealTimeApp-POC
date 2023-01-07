import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("ws://localhost:3000");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [text, setText] = useState(["one", "two", "three"]);

  useEffect(() => {
    socket.on("connect", (message) => {
      const arr = [...text,message]
      console.log("Connected :", message);
      setText(arr)
      setIsConnected(true);
    });

    socket.on("message", (message) => {
      const arr = [...text,message]
      console.log("Connected :", message);
      setText(ps=>[...ps,message])
      console.log("Subscribed to message", message);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  // const sendPing = () => {
  //   // console.log("clicked");
  //   // // socket.emit("ping");
  //   // socket.on("message", (text) => {
  //   //   console.log("send ping ", text);
  //   // });
  //   socket.on("message", (msg) => {
  //     console.log("Subscribed to message", msg);
  //   });

  // };

  const senMsg = () => {
    socket.emit("message", "test msg");

    // socket.on("message", (msg) => {
    //   console.log("Subscribed to message", msg);
    // });
  };

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      {/* <button onClick={sendPing}>Send ping</button> */}
      <button onClick={senMsg}>Send message</button>
      {text.map((item) => (
        <div>{item}</div>
      ))}
    </div>
  );
}

export default App;
