import { useState } from "react";
import Login from "./components/Login";
import PdfUpload from "./components/PdfUpload";

function App() {
  
  const [user, setUser] = useState(null);

  const cardStyle = {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >

    <div style={{
  width: "100%",
  background: "#1e293b",
  color: "white",
  padding: "10px",
  textAlign: "center",
  marginBottom: "20px"
}}>
  <h1>Document Signature App</h1>

  {user && (
    <div>
      Welcome, {user.name}
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => setUser(null)}
      >
        Logout
      </button>
    </div>
  )}
</div>  
      
      {!user && (
        <div style={cardStyle}>
          <h2>Login</h2>
          <Login onLogin={(loggedUser) => setUser(loggedUser)} />
        </div>
      )}

      
      {user && (
        <div style={cardStyle}>
          <h2>Upload & Sign PDF</h2>
          <PdfUpload user={user} />
        </div>
      )}

      
      <div
        style={{
          background: "#1e293b",
          color: "white",
          textAlign: "center",
          padding: "10px",
          marginTop: "40px",
          width: "100%",
        }}
      >
        © 2026 Document Signature App
      </div>
    </div>
  );
}

export default App;
