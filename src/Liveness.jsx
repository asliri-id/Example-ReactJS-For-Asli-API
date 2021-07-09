import React, { useRef, useState, useEffect } from "react";
import { Camera, LivenessContainer, LiveCapture } from "./style/styles";
import axios from "axios";

const Liveness = () => {
  const videoRef = useRef();
  const captureRef = useRef();
  const liveImageRef = useRef([]);

  const startVideo = useRef();
  startVideo.current = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendData = () => {
    const formData = new FormData();
    liveImageRef.current.forEach((element) => {
      formData.append("file", element);
    });

    formData.append("gesture_set", 5);
    axios
      .post("http://localhost:5000/liveness", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startLiveness = () => {
    liveImageRef.current = [];
    capture();
  };

  const capture = (counter = 0) => {
    setTimeout(() => {
      if (counter < 7) {
        getImage();
        capture(counter + 1);
      } else {
        sendData();
      }
    }, 500);
  };

  const getImage = () => {
    const context = captureRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      captureRef.current.width,
      captureRef.current.height
    );

    captureRef.current.toBlob((blob) => {
      liveImageRef.current.push(blob);
    });

    // const capturedUrl = captureRef.current.toDataURL("image/png");
    // liveImageRef.current.push(capturedUrl);

    // window.location.href = capturedUrl;
  };

  useEffect(() => {
    startVideo.current();
  }, []);

  return (
    <div>
      <LivenessContainer>
        <Camera ref={videoRef} className="video"></Camera>
      </LivenessContainer>
      <LiveCapture ref={captureRef}></LiveCapture>
      <button onClick={startLiveness}>take</button>
    </div>
  );
};

export default Liveness;
