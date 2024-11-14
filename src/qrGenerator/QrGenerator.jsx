import { useState } from "react";
import QRCode from "react-qr-code";

const QrGenerator = () => {
  const [text, setText] = useState("");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          fontSize: "50px",
          marginBottom: "20px",
          maxWidth: "50%",
          width: "50%",
        }}
      />
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "50%", width: "50%" }}
        value={text}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};

export default QrGenerator;
