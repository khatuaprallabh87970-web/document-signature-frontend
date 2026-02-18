import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import API from "../api";

export default function SignaturePad({ documentId, onSave }) {
  const sigRef = useRef(null);
  const [signatureData, setSignatureData] = useState(null);

  /* ---------- ACTIONS ---------- */

  const clear = () => {
    sigRef.current.clear();
    setSignatureData(null);
  };

  const save = () => {
    if (sigRef.current.isEmpty()) {
      alert("Please sign first");
      return;
    }

    const dataUrl = sigRef.current.toDataURL("image/png");
    setSignatureData(dataUrl);

    if (onSave) onSave(dataUrl);

    alert("Signature saved");
  };

  const signPdf = async () => {
    if (!signatureData) {
      alert("Save signature first");
      return;
    }

    try {
      const res = await API.post(`/sign/${documentId}/sign`, {
        signature: signatureData,
      });

      window.open(res.data.signedPdfUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("Signing failed");
    }
  };

  /* ---------- STYLES ---------- */

  const canvasStyle = {
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  const btnStyle = {
    marginRight: "10px",
    padding: "8px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div>
      <h3>Draw Signature</h3>

      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 500,
          height: 200,
          style: canvasStyle,
        }}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={clear} style={btnStyle}>
          Clear
        </button>

        <button onClick={save} style={btnStyle}>
          Save
        </button>

        <button onClick={signPdf} style={btnStyle}>
          Sign PDF
        </button>
      </div>
    </div>
  );
}
