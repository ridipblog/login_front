// import io from 'socket.io-client';
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import authFunction from '../UsedMethods/authFunction';
import ChatSideBar from "./ChatSideBar";
import ChatFriendPanel from "./ChatFriendPanel";
import ChatMessage from "./ChatMessage";
import "../class.css";
// Import Main Css File For This File
import "./chatroom.css";
// Import Chat Side Bar Css
import "./ChatSideBar.css";
// Import Chat Friend Panel Css
import "./ChatFriendPanel.css";
// Import Chat Message Panel Css
import "./ChatMessage.css";
import { createContext, useEffect, useState } from "react";
export const FrndDataContext = createContext();
export const requiredContextData = createContext();
export default function ChatRoom() {
    const [cookies, , removeCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState('');
    const [roomName, setRoomName] = useState('');
    const [frndRoomName, setFrndRoomName] = useState('');
    const [frndID, setFrndID] = useState();
    const getUserData = async () => {
        const info = await authFunction(cookies.token, navigate, removeCookie);
        setUserInfo(info);
    }
    const [frndData, setFrndData] = useState({
        // frnd_details: null,
    });
    const contextData = {
        userInfo,
        roomContext: [roomName, setRoomName],
        frndRoomContext: [frndRoomName, setFrndRoomName],
        frndIDContext: [frndID, setFrndID]
    }
    useEffect(() => {
        getUserData();
    }, [])
    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    // const [personName, setPersonName] = useState('');
    // const [roomName, setRoomName] = useState('');
    // const socket = io('http://localhost:4000', { transports: ['websocket'] });
    // useEffect(() => {
    //     socket.emit('join-room', roomName);
    //     socket.on('message', (room, data) => {
    //         const text = data.message + data.username;
    //         setMessages((prev_messages) => [...prev_messages, text]);
    //     });
    //     return () => {
    //         // socket.disconnect();
    //         socket.emit('leave-room', roomName);
    //     };
    // }, [roomName, messages, message]);
    // const sendMessage = () => {
    //     const data = {
    //         message: message,
    //         username: 'coder'
    //     };
    //     const room = roomName;
    //     socket.emit('message', { room, data });
    // }
    // // Set Person Name
    // const addPersonName = async () => {
    //     setRoomName(personName);
    // }
    return (
        <>
            {/* <div className="">
                <div>
                    {
                        messages.map((msg, index) => (
                            <div key={index} >{msg}</div>
                        ))
                    }
                    <p>Person Name</p>
                    <input type="text" value={personName} onChange={(e) => setPersonName(e.target.value)} />
                    <button onClick={addPersonName}>Set Name</button>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div> */}
            <requiredContextData.Provider value={contextData}>
                <FrndDataContext.Provider value={[frndData, setFrndData]}>
                    <div className="flexDiv main-chat-div">
                        {/* Chat Side Bar Component */}
                        <ChatSideBar />
                        {/* Chat Friend Panel  */}
                        <ChatFriendPanel />
                        {/* Chat Message Panel  */}
                        <ChatMessage />
                    </div>
                </FrndDataContext.Provider>
            </requiredContextData.Provider>
        </>
    );
}
