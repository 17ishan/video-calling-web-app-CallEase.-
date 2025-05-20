import React, { useEffect, useRef } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';


const VideoComp = () => {

    const { roomID } = useParams();
    console.log(roomID);
    const containerRef = useRef(null);

    useEffect(() => {
        let myMeeting = async (element) => {

            if (!roomID || !containerRef.current) return;


            // const appID = 2046966053;
            const appID = 266870978;
            const serverSecret = "67e31ca01317b34d8c5c15477500e0ae";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), "Anonymous");
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: 'Personal link',
                        url:
                            window.location.protocol + '//' +
                            window.location.host + window.location.pathname +
                            '?roomID=' +
                            roomID,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
            });
        };
        myMeeting();

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
        };
    }, [roomID]);

    return (
        <div
            className="myCallContainer"
            ref={containerRef}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );


};



export default VideoComp