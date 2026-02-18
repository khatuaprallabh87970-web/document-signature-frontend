import { useState } from "react";
import API from "../api";
import SignaturePad from "./SignaturePad";

export default function PdfUpload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [signature, setSignature] = useState(null);
  const [documentId, setDocumentId] = useState(null);

  const uploadPdf = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await API.post("/pdf/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("PDF uploaded successfully");
      setPdfUrl(res.data.fileUrl);
      setDocumentId(res.data.documentId);
    } catch (err) {
      console.error(err);
      setMsg("Upload failed");
    }
  };

  /* ---------- STYLES ---------- */
  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  };

  const btnStyle = {
    marginLeft: "10px",
    padding: "8px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      
      {/* Upload Card */}
      <div style={cardStyle}>
        <h2>Upload PDF</h2>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={uploadPdf} style={btnStyle}>
          Upload
        </button>

        <p>{msg}</p>
      </div>

      {/* Signature Card */}
      {documentId && (
        <div style={cardStyle}>
          <h2>Add Signature</h2>
          <SignaturePad documentId={documentId} onSave={setSignature} />
        </div>
      )}

      {/* Signature Preview */}
      {signature && (
        <div style={cardStyle}>
          <h3>Signature Preview</h3>
          <img src={signature} alt="signature" />
        </div>
      )}

      {/* PDF Preview */}
      {pdfUrl && (
        <div style={cardStyle}>
          <h3>PDF Preview</h3>
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="500px"
          />
        </div>
      )}
    </div>
  );
}
