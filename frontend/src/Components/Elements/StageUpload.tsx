import React from "react";
import { Stage, Label, Text } from "../../Styles/Example";

interface StageUploadProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StageUpload = ({ handleFileUpload }: StageUploadProps) => (
  <Stage>
    <Label htmlFor="upload">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="92"
        height="80"
        viewBox="0 0 92 80"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.4355 11.4286C8.40264 11.4286 5.49397 12.6326 3.34939 14.7759C1.20481 16.9192 0 19.8261 0 22.8571V68.5714C0 71.6025 1.20481 74.5094 3.34939 76.6526C5.49397 78.7959 8.40264 80 11.4355 80H80.0487C83.0816 80 85.9903 78.7959 88.1349 76.6526C90.2794 74.5094 91.4842 71.6025 91.4842 68.5714V22.8571C91.4842 19.8261 90.2794 16.9192 88.1349 14.7759C85.9903 12.6326 83.0816 11.4286 80.0487 11.4286H70.9803C69.464 11.4282 68.0099 10.826 66.9379 9.75428L60.5283 3.34857C58.3842 1.20515 55.476 0.000647285 52.4433 0H39.0409C36.0083 0.000647285 33.1001 1.20515 30.956 3.34857L24.5464 9.75428C23.4743 10.826 22.0202 11.4282 20.5039 11.4286H11.4355ZM45.7421 62.8571C47.9947 62.8571 50.2253 62.4137 52.3064 61.5522C54.3875 60.6907 56.2785 59.428 57.8713 57.8361C59.4642 56.2443 60.7277 54.3544 61.5897 52.2746C62.4517 50.1947 62.8954 47.9655 62.8954 45.7143C62.8954 43.4631 62.4517 41.2339 61.5897 39.154C60.7277 37.0741 59.4642 35.1843 57.8713 33.5925C56.2785 32.0006 54.3875 30.7379 52.3064 29.8764C50.2253 29.0148 47.9947 28.5714 45.7421 28.5714C41.1928 28.5714 36.8298 30.3775 33.6129 33.5925C30.396 36.8074 28.5888 41.1677 28.5888 45.7143C28.5888 50.2609 30.396 54.6212 33.6129 57.8361C36.8298 61.051 41.1928 62.8571 45.7421 62.8571Z"
          fill="#595959"
        />
      </svg>
      <Text>교재의 사진을 올려주세요</Text>
    </Label>
    <input
      id="upload"
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleFileUpload}
    />
  </Stage>
);

export default StageUpload;
