import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import './Camera.css'
const videoConstraints = {
    width: 440,
    facingMode: "environment",
};

const Camera: React.FC = () => {
    const webcamRef = useRef<Webcam>(null); // Add type information for webcamRef
    const [url, setUrl] = useState<string | null>(null);

    const capturePhoto = useCallback(async () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl(imageSrc as string);
        }
    }, [webcamRef]);



    return (
        <>
            <div className="camera-container">
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/png" // Fix typo in prop name
                    videoConstraints={videoConstraints}
                    mirrored={true}
                />
                <div className="button-container">
                    <button className="camera-btn" onClick={capturePhoto}>Capture</button>
                    <button className="camera-btn" onClick={() => setUrl(null)}>Refresh</button>
                </div>
                {url && (
                    <div>
                        <img src={url} alt="Screenshot" className="camera-img" />
                    </div>
                )}
            </div>

        </>
    );
};

export default Camera;
