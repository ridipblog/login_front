import { NavLink } from 'react-router-dom';
// import { useContext } from 'react';
// import { InfoContext } from '../Profile';

const ProfileDetails = () => {
    const dummy = require('../../images/background.jpg');
    return (
        <div className="flexDiv main_profile_details">
            <div className="flexDiv main_profile_social">
                <div className="flexDiv profile_social_div">
                    <NavLink className="profile-social-btn" to="/chat-room">Connect</NavLink>
                    <img src={dummy} alt="sasas" />
                    <NavLink className="profile-social-btn" to="/chat-room">Message</NavLink>
                </div>
                <div className='flexDiv profile_social_data'>
                    <p>
                        <span>22</span><br />
                        <span>Friends</span>
                    </p>
                    <p>
                        <span>10</span><br />
                        <span>Photos</span>
                    </p>
                    <p>
                        <span>89</span><br />
                        <span>Comments</span>
                    </p>
                </div>
                <p className='profile_social_name'>Ridip Goswami</p>
            </div>
            <div className='flexDiv main_profile_info'>
                <div className='flexDiv profile_info_setting'>
                    <p>My Account</p>
                    <button>Settings</button>
                </div>
                <div className='flexDiv profile_info_data'>
                    <div className='flexDiv profile_info_data_1'>
                        <p>User Name</p>
                        <p>Ridip Goswami</p>
                    </div>
                    <div className='flexDiv profile_info_data_1'>
                        <p>Email ID</p>
                        <p>memorytemp5@gmail.com</p>
                    </div>
                    <div className='flexDiv profile_info_data_1'>
                        <p>About Me</p>
                        <p>I Just A Programmer And I Find My Code .</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileDetails;
