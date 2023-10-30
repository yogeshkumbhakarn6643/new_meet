import React, { useState, useEffect } from 'react';

function App() {
    const domain = 'meet.bharathealpoint.com';
    const [room] = useState('Consultation');
    const [user] = useState({ name: 'Yogesh' });
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);

    let api = null;

    const startMeet = () => {
        const options = {
            
            p2p: {
                enabled: true
            },
            roomName: room,
            width: '100%',
            height: 500,
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // Overwrite interface properties
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'participant-list',
                    'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                    'e2ee', 'participants-pane','caption',{
                        key: 'closedcaptions',
                        preventExecution: true
                    }, 
                ],
                // filmStripOnly: false,
                // SHOW_JITSI_WATERMARK: true,
                // DEFAULT_LOGO_URL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png', // Replace with your logo URL
                // SHOW_JITSI_WATERMARK: false,
                
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: user.name
            }
        };

        api = new window.JitsiMeetExternalAPI(domain, options);

        api.addEventListeners({
            readyToClose: handleClose,
            participantLeft: handleParticipantLeft,
            participantJoined: handleParticipantJoined,
            videoConferenceJoined: handleVideoConferenceJoined,
            videoConferenceLeft: handleVideoConferenceLeft,
            audioMuteStatusChanged: handleMuteStatus,
            videoMuteStatusChanged: handleVideoStatus
        });
    };

    const handleClose = () => {
        console.log("handleClose");
    };

    const handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant);
        // Handle participant left
    };

    const handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant);
        // Handle participant joined
    };

    const handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant);
        // Handle video conference joined
    };

    const handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        // Handle video conference left
    };

    const handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio);
        // Handle mute status
    };

    const handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video);
        // Handle video status
    };

    const getParticipants = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(api.getParticipantsInfo());
            }, 500);
        });
    };

    const executeCommand = (command) => {
        api.executeCommand(command);

        if (command === 'hangup') {
            // Handle hangup
        }

        if (command === 'toggleAudio') {
            setIsAudioMuted(!isAudioMuted);
        }

        if (command === 'toggleVideo') {
            setIsVideoMuted(!isVideoMuted);
        }
    };

    useEffect(() => {
        if (window.JitsiMeetExternalAPI) {
            startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }

        return () => {
            if (api) {
                api.dispose();
            }
        };
    }, []);

    return (
        <>
            <header className="nav-bar">
                <p className="item-left heading">Jitsi React</p>
            </header>
            <div id="jitsi-iframe"></div>
            <div className="item-center">
                <span>Custom Controls</span>
            </div>
            <div className="item-center">
                <span>  </span>
                <i
                    onClick={() => executeCommand('toggleAudio')}
                    className={`fas fa-2x grey-color ${isAudioMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}
                    aria-hidden="true"
                    title="Mute / Unmute"
                ></i>
                <i
                    onClick={() => executeCommand('hangup')}
                    className="fas fa-phone-slash fa-2x red-color"
                    aria-hidden="true"
                    title="Leave"
                ></i>
                <i
                    onClick={() => executeCommand('toggleVideo')}
                    className={`fas fa-2x grey-color ${isVideoMuted ? 'fa-video-slash' : 'fa-video'}`}
                    aria-hidden="true"
                    title="Start / Stop camera"
                ></i>
                <i
                    onClick={() => executeCommand('toggleShareScreen')}
                    className="fas fa-film fa-2x grey-color"
                    aria-hidden="true"
                    title="Share your screen"
                ></i>

            <div 
                    style={{
                        position: 'absolute',
                        top: 60,
                        left: 30,
                        height: '10em',
                        width: '20em',
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(https://testapi.bharathealpoint.com/assets/db77a9f5-20ed-46f7-a163-06294b54a409.png)', // Replace with your logo URL
                        backgroundRepeat: 'no-repeat',
                        // backgroundPosition: 'center',
                        backgroundSize: '160px 70px'
                    }}
                />
            </div>
        </>
    );
}

export default App;