import React, { useRef, useState } from "react";
import { Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import {
  DataInput,
  ButtonContainer,
  CameraContainer,
  Camera,
  CapturedImage,
} from "../style/styles";
import axios from "axios";

const Form = ({ data = {} }) => {
  const videoRef = useRef("");
  const captureRef = useRef();
  const [takeSelfie, setTakeSelfie] = useState(false);
  const [retake, setRetake] = useState(true);
  const [showPic, setShowPic] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("testing");

  const { register, handleSubmit, control } = useForm({
    defaultValues: { ...data },
  });
  const onSubmit = (info) => {
    axios
      .post("http://localhost:5000/profesional", {
        ...info,
        name: info.nama,
        birthdate: info.tanggal_lahir,
        birthplace: info.tempat_lahir,
        selfie_photo: pictureUrl,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startVideo = () => {
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

  const capture = () => {
    const context = captureRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      captureRef.current.width,
      captureRef.current.height
    );

    const capturedUrl = captureRef.current.toDataURL();

    setPictureUrl(capturedUrl.substring(22, capturedUrl.length));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(data).map((key) => (
          <Controller
            render={({ field }) => (
              <DataInput
                {...field}
                label={key.toUpperCase()}
                variant="outlined"
              />
            )}
            name={key}
            control={control}
          />
        ))}

        {/* <input
          id="inputUrl"
          {...register("selfie_photo")}
          onChange={(e) => setPictureUrl(e.target.value)}
          value={pictureUrl}
        /> */}

        <ButtonContainer>
          <Button
            variant="contained"
            onClick={() => {
              setTakeSelfie(true);
              startVideo();
            }}
          >
            Take A Selfie
          </Button>
        </ButtonContainer>
        <Button variant="contained" type="submit">
          submit
        </Button>
      </form>

      {takeSelfie && (
        <CameraContainer>
          {retake && <Camera ref={videoRef} className="video"></Camera>}
          {showPic && <CapturedImage ref={captureRef}></CapturedImage>}
          {retake && (
            <Button
              variant="contained"
              onClick={() => {
                setTimeout(() => {
                  setRetake(false);
                }, 101);

                setShowPic(true);
                setTimeout(() => {
                  capture();
                }, 100);
              }}
            >
              capture
            </Button>
          )}
          {showPic && (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  setRetake(true);
                  setShowPic(false);
                  startVideo();
                }}
              >
                Retake
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setTakeSelfie(false);
                  console.log(pictureUrl);
                }}
              >
                OK
              </Button>
            </>
          )}
        </CameraContainer>
      )}
    </div>
  );
};

export default Form;
