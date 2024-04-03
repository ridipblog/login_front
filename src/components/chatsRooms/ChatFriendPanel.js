import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import baseInstance from "../base/baseServer";
import frnd_profile_dummy from "./images/frnd-profile.jpg";

import { requiredContextData } from './ChatRoom';

export default function ChatFriendPanel() {
    const { roomContext } = useContext(requiredContextData);
    const { frndRoomContext } = useContext(requiredContextData);
    const { userInfo } = useContext(requiredContextData);
    const { frndIDContext } = useContext(requiredContextData);
    // socket connection with backend
    const socket = io('https://proven-porcelain-year-cycle.trycloudflare.com', { transports: ['websocket'] });
    const [inputState, setInputState] = useState({
        frnd_name: "",
    });
    const [userList, setUserList] = useState([]);
    const [selectedBtn, setSelectedBtn] = useState('');
    const [roomName, setRoomName] = roomContext;
    const [frndRoomName, setFrndRoomName] = frndRoomContext;
    const [frndID, setFrndID] = frndIDContext;
    const chanageInputValue = (e) => {
        setInputState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    const getAllUsers = async () => {
        try {
            var all_users = await baseInstance.get('/get-all-users');
            setUserList(all_users.data.users);
        } catch (error) {
            console.log(error);
        }
    }
    const connectFrnd = async (event, item) => {
        socket.emit('leave-room', frndRoomName);
        var room_name = item.email + userInfo.email;
        var frnd_room_name = userInfo.email + item.email;
        setRoomName(room_name);
        setFrndRoomName(frnd_room_name);
        setSelectedBtn(item.id);
        setFrndID(item);
    }
    useEffect(() => {
        getAllUsers();
    }, [])
    // useEffect(() => {
    //     socket.emit('join-room', roomName);
    //     console.log(roomName)
    // }, [roomName])
    return (
        <div className="flexDiv main-chat-frnd-div">
            <div className="flexDiv chat-frnd-search-div">
                <input type='text' value={inputState.frnd_name} onChange={chanageInputValue} name='frnd_name' placeholder='Friend name....' />
                <p><i className="fa-solid fa-arrows-rotate"></i></p>
            </div>
            <div className='flexDiv chat-frnd-list-div'>
                {userList.map((item) => (
                    userInfo.email !== item.email ?
                        <button key={item.id} onClick={(event) => connectFrnd(event, item)} className={`flexDiv chat-frnd-div ${selectedBtn === item.id ? 'frnd-btn-clicked' : ''}`} >
                            <div className='flexDiv chat-frnd-profile-div'>
                                <img src={frnd_profile_dummy} className='frnd_profile' alt='friend-profile' />
                                <span></span>
                            </div>
                            <div className='flexDiv chat-frnd-details-div'>
                                <p>{item.name}</p>
                                <p><span>Developer</span> <span>10:02</span></p>
                            </div>
                        </button>
                        : ''
                ))
                }
            </div>
        </div>
    )
}
