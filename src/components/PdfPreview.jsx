import SignaturePad from "./SignaturePad";

export default function PdfPreview({ pdfUrl, documentId }) {
  if (!pdfUrl || !documentId) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>PDF Preview</h3>

      <iframe
        src={pdfUrl}
        width="100%"
        height="500px"
        title="PDF Preview"
        style={{ border: "1px solid #ccc" }}
      />

      <SignaturePad documentId={documentId} />
      <PdfPreview pdfUrl={pdfUrl} documentId={documentId} />
    </div>
  );
}
