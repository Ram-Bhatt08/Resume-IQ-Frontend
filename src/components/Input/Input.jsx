import { useState } from "react";
import "./Input.css";

const Input = ({ onAnalyze, loading }) => {
  const [resume, setResume] = useState("");
  const [jd, setJD] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!resume.trim() || !jd.trim()) {
      setError("Both resume and job description are required.");
      return;
    }
    setError("");
    onAnalyze(resume, jd);
  };

  const handleClear = () => {
    setResume("");
  };

  const resumeWords = resume.trim() ? resume.trim().split(/\s+/).length : 0;
  const jdWords = jd.trim() ? jd.trim().split(/\s+/).length : 0;

  return (
    <div className="input-card">
      {/* Card header */}
      <div className="input-card-header">
        <div>
          <h2 className="input-card-title">Screening Analysis</h2>
          <p className="input-card-sub">
            Provide the resume and job description to begin evaluation
          </p>
        </div>
        <div className="evaluation-dims">
          {["Skills", "Experience", "Education", "Projects"].map((d) => (
            <span key={d} className="dim-chip">{d}</span>
          ))}
        </div>
      </div>

      <div className="input-grid">
        {/* ── Resume column ── */}
        <div className="input-col">
          <div className="col-label">
            <span className="col-icon">①</span>
            <span>Candidate Resume</span>
          </div>

          <textarea
            className="text-area"
            placeholder="Paste resume content here…"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows={14}
            disabled={loading}
          />

          <div className="col-footer">
            <span className="word-count">{resumeWords} words</span>
            {resume && (
              <button className="clear-link" onClick={handleClear} type="button">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="col-divider">
          <div className="divider-line" />
          <span className="vs-badge">vs</span>
          <div className="divider-line" />
        </div>

        {/* ── JD column ── */}
        <div className="input-col">
          <div className="col-label">
            <span className="col-icon">②</span>
            <span>Job Description</span>
          </div>
          <textarea
            className="text-area"
            placeholder="Paste job description here…"
            value={jd}
            onChange={(e) => setJD(e.target.value)}
            rows={14}
            disabled={loading}
          />
          <div className="col-footer">
            <span className="word-count">{jdWords} words</span>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="input-error" role="alert">
          ⚠ {error}
        </p>
      )}

      {/* Submit row */}
      <div className="submit-row">
        <p className="submit-note">
          Evaluated against a <strong>70% match threshold</strong> across skills,
          experience, education &amp; projects.
        </p>
        <button
          className="analyze-btn"
          onClick={handleSubmit}
          disabled={loading || !resume.trim() || !jd.trim()}
          type="button"
        >
          {loading ? (
            <>
              <span className="btn-spinner" />
              Analyzing…
            </>
          ) : (
            <>
              <span className="btn-icon">▶</span>
              Analyze Resume
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Input;
