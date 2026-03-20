// Home.jsx - Updated with better error handling

import { useState } from "react";
import axios from "axios";
import Input from "../Input/Input";
import Result from "../Result/Result";
import "./Home.css";

function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async (resume, jd) => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await axios.post("http://127.0.0.1:8000/analyze", {
        resume,
        jd,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000 // 30 second timeout
      });

      if (!res.data) throw new Error("Invalid response from server");
      
      // Log the response for debugging
      console.log("API Response:", res.data);
      
      setResult(res.data);
    } catch (err) {
      console.error("Error details:", err);
      
      if (err.code === 'ECONNABORTED') {
        setError("Request timeout - analysis took too long");
      } else if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMsg = err.response.data?.detail || 
                        err.response.data?.message || 
                        `Server error: ${err.response.status}`;
        setError(errorMsg);
      } else if (err.request) {
        // The request was made but no response was received
        setError("Cannot connect to server. Is it running?");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-root">
      {/* Ambient background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="home-inner">
        {/* Header */}
        <header className="site-header">
          <div className="header-badge">AI-POWERED</div>
          <h1 className="site-title">
            Resume<span className="accent">IQ</span>
          </h1>
          <p className="site-subtitle">
            Intelligent resume screening — fast, unbiased, explainable.
          </p>
        </header>

        {/* Input form */}
        <Input onAnalyze={analyze} loading={loading} />

        {/* Loading state */}
        {loading && (
          <div className="loading-overlay">
            <div className="loading-card">
              <div className="loading-spinner">
                <div className="ring ring-1" />
                <div className="ring ring-2" />
                <div className="ring ring-3" />
              </div>
              <p className="loading-title">Analyzing Resume</p>
              <p className="loading-sub">
                Evaluating skills · experience · education · projects
              </p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="error-card" role="alert">
            <span className="error-icon">!</span>
            <div>
              <strong>Analysis Failed</strong>
              <p>{error}</p>
              <button 
                className="retry-btn"
                onClick={() => setError("")}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Result component */}
        {result && !loading && <Result data={result} />}
      </div>

      <footer className="site-footer">
        <p>ResumeIQ · AI Hiring Agent · Powered by RA</p>
      </footer>
    </div>
  );
}

export default Home;
