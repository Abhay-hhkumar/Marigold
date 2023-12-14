import React from "react";
import ReactPlayer from "react-player/youtube";
import "./style.scss";

const VideoPopup = ( { show, setShow, videoId, setVideoId } ) => {

    const hidePopup = () => {

        setShow(false);
        setVideoId(null);
      };

     return (      
        
        // "visible" class will be added if show is true it help to show the popup and hide the popup of video play
        <div className = {`videoPopup ${show ? "visible" : ""}`}>
             <div className = "opacityLayer" onClick = {hidePopup}> </div>
             <div className = "videoPlayer">
                <span className = "closeBtn" onClick = {hidePopup}>
                    Close
                </span> 
                <ReactPlayer
                                                     // 'v' means watch
                    url = {`https://www.youtube.com/watch?v=${videoId}`}
                    // 'controls' means paople can play the video or pause according to him
                    controls
                    width = "100%"
                    height = "100%"
                    // if we "playing={true}" means when we open the video then it will we automatically get play
                    // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;