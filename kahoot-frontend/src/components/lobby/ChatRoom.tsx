"use client"
import { ChatMessage, LiveUser, MessageType } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useActivePlayers } from "./active-players";

export default function ChatRoom({ roomNumber }: { roomNumber: string }) {
  const removeActivePlayer = useActivePlayers((s) => s.removePlayer);
  // const activeUsers = useActivePlayers((s) => s.getActivePlayers());
  const addActivePlayer = useActivePlayers((s) => s.addPlayer);
  const setActiveUsers = useActivePlayers((s) => s.setPlayers);
  const updateActivePlayer = useActivePlayers((s) => s.updatePlayer);

  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    // Establish the WebSocket connection
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    setStompClient(client);
    client.connect(
      {},
      () => {
        console.log("Connected");
        setConnected(true); // Update connected status
        client.subscribe(`/room/${roomNumber}/activeUsers`, onPageLoad);
        client.subscribe(`/room/${roomNumber}`, onConnect);
        client.send(
          `/app/chat/${roomNumber}/getUsers`,
          {},
          JSON.stringify({ type: "GET" })
        );
        setStompClient(client);
      },
      (error) => {
        console.error("Error connecting:", error);
      }
    );

    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomNumber]); // Reconnect if roomNumber changes

  const onConnect = (message: Stomp.Message) => {
    const msg: ChatMessage = JSON.parse(message.body);
    console.log(msg);
    switch (msg.type) {
      case MessageType.JOIN:
        toast.remove();
        toast.success(`${msg.sender.username} joined the room`);
        addActivePlayer(msg.sender);

        break;
      case MessageType.LEAVE:
        toast.remove();
        console.log(`${msg.sender.username} left the room`);
        toast.success(`${msg.sender.username} left the room`);
        removeActivePlayer(msg.sender.username);
        break;
      case MessageType.UPDATE:
        // Update the active users list
        updateActivePlayer(msg.sender);
        break;
      default:
        break;
    }
  };

  const onPageLoad = (message: Stomp.Message) => {
    const users: LiveUser[] = JSON.parse(message.body) || [];
    console.log(users);
    setActiveUsers(users || []); // Update the active users list
    // alert("Active users" + message.body);
    console.log("Active users", users);
  };
  const removeUser = (user: LiveUser) => {
    // Remove the user from the active users list in server session
    if (stompClient) {
      stompClient.send(
        `/app/chat/${roomNumber}/removeUser`,
        {},
        JSON.stringify(user)
      );
    } else {
    }
  };

  const disconnect = () => {
    if (stompClient && connected) {
      stompClient.disconnect(() => {
        toast.success("Disconnected successfully");
        console.log("Disconnected");
        // setConnected(false);
      });
    }
  };
  if (!connected) {
    return (
      <div className="players !rounded-sm !py-5">
        <p>Connecting...</p>
      </div>
    );
  }

  return <ActiveUsersList removeUser={removeUser} />;
}

function ActiveUsersList({
  removeUser,
}: {
  removeUser: (user: LiveUser) => void;
}) {
  const activeUsers = useActivePlayers((s) => s.getActivePlayers());
  if (!activeUsers || activeUsers.length == 0)
    return (
      <div className="players !rounded-sm !py-5">
        <p>Waiting for Players...</p>
      </div>
    );
  return (
    <div className="playersss">
      {activeUsers.map((user) => (
        <div
          className="player hover:bg-red-600"
          key={user.username}
          onClick={() => removeUser(user)}
        >
          <img src={user.imageUrl} alt={user.username} />
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  );
}
