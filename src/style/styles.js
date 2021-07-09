import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

export const Camera = styled.video`
height: 100%;
width: 100%;
autoplay 

`;

export const LivenessContainer = styled.div`
  margin: auto;
  padding: 50px 300px;
`;

export const LiveCapture = styled.canvas`
  display: none;
  width: 1920px;
  height: 1080px;
`;

export const KtpContainer = styled.img`
  height: 200px;
  width: 320px;
  display: block;
  margin: 20px 0 20px 0;
  border: none;
`;

export const ButtonContainer = styled.div`
  margin: 10px;
`;

export const DataInput = styled(TextField)`
  margin: 10px !important;
  display: block;
`;

export const CameraContainer = styled.div`
  
  border: 1px solid black;
  width: 400px;
  padding:50px;
  autoplay 
`;

export const CapturedImage = styled.canvas`
  width: 100%;
  height: 300px;
`;
