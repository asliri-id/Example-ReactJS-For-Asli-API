import React, { useRef, useState } from "react";
import { KtpContainer } from "./style/styles";
import Form from "./component/Form";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Liveness from "./Liveness";

const axios = require("axios");

function App() {
  const [uploaded, setuploaded] = useState(false);
  const [data, setData] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrDone, setOcrDone] = useState(false);
  const base64String = useRef("");
  const ktpRef = useRef();

  const imageUpload = (event) => {
    setuploaded(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    console.log("next");
    reader.onload = (e) => {
      base64String.current = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      ktpRef.current.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const getOcr = () => {
    setIsProcessing(true);
    axios
      .post("http://localhost:5000/ocr", { image: base64String.current })
      .then((res) => {
        setData(res.data);
        setOcrDone(true);
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/liveness">
            <Liveness />
          </Route>

          <Route path="/">
            <h1>OCR</h1>
            <p>upload ktp</p>
            <input type="file" name="" id="input" onChange={imageUpload} />
            {uploaded && (
              <>
                <KtpContainer ref={ktpRef} />
                <Button
                  variant="contained"
                  onClick={getOcr}
                  disabled={isProcessing}
                >
                  Run
                </Button>
              </>
            )}
            {ocrDone && <Form data={data} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
