import React, { forwardRef } from 'react';
import "video-react/dist/video-react.css";
import { Player, BigPlayButton } from "video-react";

const VideoPlayer = forwardRef(({ children, ...props }, ref) => {
    return (
        <Player ref={ref} {...props}>
            <BigPlayButton position="center" />
            {children}
        </Player>
    );
});

// Set a display name for debugging since it's a forwardRef component
VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
