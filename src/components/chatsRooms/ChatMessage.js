import React, { useContext, useEffect, useState } from "react";
import { requiredContextData } from "./ChatRoom";
import { io } from "socket.io-client";
import frnd_profile_dummy from "./images/frnd-profile.jpg";
import baseInstance from '../base/baseServer';
import axios from "axios";
export default function ChatMessage() {
    const style = {
        width: '100%',
        color: 'red'
    }
    const socket = io('https://login-backend-dph4.onrender.com', { transports: ['websocket'] });
    const { userInfo } = useContext(requiredContextData);
    const { roomContext } = useContext(requiredContextData);
    const { frndRoomContext } = useContext(requiredContextData);
    const { frndIDContext } = useContext(requiredContextData);
    const [roomName,] = roomContext;
    const [frndRoomName,] = frndRoomContext;
    const [frndID,] = frndIDContext;

    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState({
        chat_messages: []
        // my_messages: [],
        // frnd_mesages: []
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const data = [
        1, 2, 3, 4, 5
    ];
    const sendMessage = () => {
        const data = {
            message: message,
            username: userInfo.name
        }
        const room = roomName;
        socket.emit('message', { room, data });
        setAllMessages(prevState => ({
            ...prevState,
            chat_messages: [...prevState.chat_messages, [message, userInfo.name, userInfo.email]]
        }));
    }

    // ------------------ select file --------------------
    const selectFile = (e) => {
        console.log(selectedFile);
        setSelectedFile(e.target.files[0]);
    }

    // ------------------ upload image ------------------------
    const uploadFile = async () => {
        console.log(selectedFile)
        const send_data = {
            'image': selectedFile
        };
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('name', 'coder');
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const data = await baseInstance.post('/upload', formData, config);
        console.log(data);
    }

    useEffect(() => {
        socket.emit('join-room', frndRoomName);
        socket.on('message', (room, data) => {
            // console.log(data.message);
            // setAllMessages({
            //     frnd_mesages: data.message
            // });
            // setAllMessages(prevState => ({
            //     ...prevState,
            //     frnd_mesages: [...prevState.frnd_mesages, data.message]
            // }));
            setAllMessages(prevState => ({
                ...prevState,
                chat_messages: [...prevState.chat_messages, [data.message, frndID.name, frndID.email]]
            }));
        });
        return () => {
            socket.emit('leave-room', frndRoomName)
        };
    }, [frndRoomName]);
    return (
        <div className="flexDiv main-chat-message-div">
            <input type="file" onChange={selectFile} />
            <button onClick={uploadFile}>Upload</button>
            <div className="flexDiv frnd-chat-nav-div">
                <div className="flexDiv frnd-chat-nav-img-div">
                    <img src={frnd_profile_dummy} alt="" />
                </div>
                <div className="flexDiv frnd-chat-nav-name-div">
                    {
                        frndID ? (
                            <>
                                <p>{frndID.name}</p>
                                {/* <p>Software Developer</p> */}
                            </>
                        )
                            :
                            (
                                <p>No Connection</p>
                            )
                    }
                </div>
            </div>
            <div className="flexDiv main-frnd-chat-div">
                <div className="flexDiv frnd-chat-text-div">
                    {/* {data.map((number) => (
                        <p key={number}>{number}</p>
                    ))} */}
                    {
                        allMessages.chat_messages.map((messages, index) => (
                            <React.Fragment key={index}>
                                <div className="flexDiv main-frnd-msg" >
                                    <div className="flexDiv main-frnd-msg-div">
                                        <p className={`frnd-msg-name-para ${messages[2] === userInfo.email ? 'user-side-para' : ''}`}><span></span><span>{messages[1]}</span></p>
                                        <div className={`flexDiv frnd-msg-div ${messages[2] === userInfo.email ? 'user-side-div' : ''}`}>
                                            <p className={`frnd-msg-para ${messages[2] === userInfo.email ? 'user-side-para-1' : ''}`}>
                                                {console.log(messages[2])}
                                                {console.log(userInfo.email)}
                                                {messages[0]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
                <div className="flexDiv frnd-chat-send-div">
                    <div className="flexDiv frnd-chat-send-input-div">
                        <button className="frnd-chat-input-btn"><i className="fa-solid fa-paperclip"></i></button>
                        <input type="text" id="frnd-chat-input" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    {
                        frndRoomName ?
                            <button onClick={sendMessage} className="frnd-chat-input-btn" ><i className="fa-solid fa-paper-plane"></i></button>
                            : ""
                    }
                </div>
            </div>
            {/* {
                allMessages.frnd_mesages.map((msg, index) => (
                    <React.Fragment key={index}>
                        <p style={style} key={msg}>{msg}</p><br></br>
                    </React.Fragment>
                ))
            } */}

        </div >

    )
}
