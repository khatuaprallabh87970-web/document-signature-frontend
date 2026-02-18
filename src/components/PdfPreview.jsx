import SignaturePad from "./SignaturePad";

export default function PdfPreview({ pdfUrl, documentId }) {
  if (!pdfUrl || !documentId) return null;

  const backendUrl = import.meta.env.VITE_API_URL;
  const fullPdfUrl = `${backendUrl}${pdfUrl}`;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>PDF Preview</h3>

      <iframe
        src={fullPdfUrl}
        width="100%"
        height="500px"
        title="PDF Preview"
        style={{ border: "1px solid #ccc" }}
      />

      <SignaturePad documentId={documentId} />
    </div>
  );
}
