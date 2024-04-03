import React, { useContext, useEffect, useRef, useState } from "react";
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
    const socket = io('http://localhost:4000', { transports: ['websocket'] });
    const { userInfo } = useContext(requiredContextData);
    const { roomContext } = useContext(requiredContextData);
    const { frndRoomContext } = useContext(requiredContextData);
    const { frndIDContext } = useContext(requiredContextData);
    const [roomName,] = roomContext;
    const [frndRoomName,] = frndRoomContext;
    const [frndID,] = frndIDContext;

    const [message, setMessage] = useState('');
    const [documentComponent, setDocumentComponent] = useState(false);
    const imageDialogRef = useRef(null);
    const [allMessages, setAllMessages] = useState({
        chat_messages: []
        // my_messages: [],
        // frnd_mesages: []
    });
    // const [media, setMedia] = useState({
    //     state_1: true,
    //     state_2: {
    //         data_1: false
    //     }
    // });

    const [media, setMedia] = useState({
        documentComponent: false,
        selectedImage: '',
        selectedDocument: ''
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
        setMessage('');
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
    // --------------- image file dialoag --------------------
    const openImageDialog = () => {
        imageDialogRef.current.click();
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
            {/* <button onClick={() => { setMedia(prevState => ({ ...prevState, state_1: !prevState.state_1 })); console.log(media.state_1) }}>Click 1</button>
            <button onClick={() => { setMedia(prevState => ({ ...prevState, state_2: { ...prevState.state_2, data_1: !prevState.state_2.data_1 } })); console.log(media.state_2.data_1) }}>Click 2</button> */}
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
                {
                    media.documentComponent ?
                        <div className="flexDiv document-send-div">
                            <div className="flexDiv document-send-div-1">
                                <div className="flexDiv document-send-div-2">
                                    <input type="file" ref={imageDialogRef} onChange={(e) => setSelectedFile(e.target.files[0])} style={{ display: "none" }} />
                                    <button onClick={openImageDialog}><i className="fa-solid fa-image"></i></button>
                                    <button><i className="fa-solid fa-file"></i></button>
                                </div>
                            </div>
                        </div>
                        : ""}
                <div className="flexDiv frnd-chat-send-div">
                    <div className="flexDiv frnd-chat-send-input-div">
                        <button className="frnd-chat-input-btn" onClick={() => { setMedia(prevState => ({ ...prevState, documentComponent: !prevState.documentComponent })) }} ><i className="fa-solid fa-paperclip"></i></button>
                        <input type="text" id="frnd-chat-input" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    {
                        frndRoomName ?
                            <button onClick={sendMessage} className="frnd-chat-input-btn frnd-chat-input-btn-1" ><i className="fa-solid fa-paper-plane"></i></button>
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
