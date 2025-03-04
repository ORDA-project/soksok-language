import React, { useState, useRef, ChangeEvent } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import StageUpload from "../Elements/StageUpload";
import StageCrop from "../Elements/StageCrop";
import StageLoading from "../Elements/StageLoading";
import StageResult from "../Elements/StageResult";
import { Example } from "../types"; // Example type definition
import styled from "styled-components";
import NavBar from "../Templates/Navbar";

const App = () => {
  const [stage, setStage] = useState<number>(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [examples, setExamples] = useState<Example[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const cropperRef = useRef<any>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUploadedImage(imageURL);
      setStage(2); // Move to crop screen
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedDataURL = croppedCanvas.toDataURL("image/png");
        setCroppedImage(croppedDataURL);
        setStage(3); // Move to OCR stage
        handleGenerateExamples(croppedDataURL); // Generate examples and perform OCR
      }
    }
  };

  const handleBackToUpload = () => {
    setUploadedImage(null); // Clear uploaded image
    setStage(1); // Go back to the upload stage
  };

  const handleGenerateExamples = async (imageData: string) => {
    try {
      const formData = new FormData();
      formData.append("image", dataURItoBlob(imageData));

      const response = await axios.post(
        "http://localhost:8000/example",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log(response.data);
      const { generatedExample, audioContent } = response.data;
      setDescription(generatedExample.description);
      setExamples(generatedExample.examples);
      setStage(4); // Show result
    } catch (error) {
      setErrorMessage("Failed to generate examples.");
      console.error("Error generating examples:", error);
      setStage(1); // Reset to initial state
    }
  };

  const dataURItoBlob = (dataURI: string): Blob => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <ExampleContainer>
    <ExampleDiv>
      {stage === 1 && <StageUpload handleFileUpload={handleFileUpload} />}
      {stage === 2 && uploadedImage && (
        <StageCrop uploadedImage={uploadedImage} cropperRef={cropperRef} handleCrop={handleCrop} handleBackToUpload={handleBackToUpload} />
      )}
      {stage === 3 && <StageLoading />}
      {stage === 4 && (
        <StageResult
          description={description}
          examples={examples}
          errorMessage={errorMessage}
          setStage={setStage}
        />
      )}
    </ExampleDiv>
    <NavBar currentPage={"Example"} />
    </ExampleContainer>
  );
};

export default App;

const ExampleContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
`;

const ExampleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;