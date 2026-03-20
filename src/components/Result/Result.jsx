import "./Result.css";

function Result({ data }) {
  const {
    decision = "Unknown",
    score = 0,
    matched_skills = [],
    missing_skills = [],
    similarity_score = 0,
    explanation = "No explanation provided",
    detailed_analysis = {},
    session_id = "",
  } = data || {};

  const isShortlisted = decision === "Shortlisted";

  const scoreColor =
    score >= 70 ? "high" : score >= 50 ? "medium" : "low";

  const scoreBreakdown = detailed_analysis?.score_breakdown || {};

  const dimensions = [
    { key: "skills", label: "Skills", value: scoreBreakdown.skills || 0 },
    { key: "experience", label: "Experience", value: scoreBreakdown.experience || 0 },
    { key: "education", label: "Education", value: scoreBreakdown.education || 0 },
    { key: "projects", label: "Projects", value: scoreBreakdown.projects || 0 },
  ];

  return (
    <div className="result-container">
      {/* Header */}
      <div className={`header-card ${isShortlisted ? "success" : "fail"}`}>
        <div>
          <h2>{isShortlisted ? "✅ Shortlisted" : "❌ Rejected"}</h2>
          <p className="sub-text">AI Evaluation Result</p>
        </div>
        <div className={`score-box ${scoreColor}`}>
          <h1>{score}%</h1>
          <p>Match Score</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid-layout">

        {/* Left Panel */}
        <div className="left-panel">
          <div className="card">
            <h3>Summary</h3>
            <p>{explanation}</p>
          </div>

          <div className="card">
            <h3>Score Breakdown</h3>
            {dimensions.map((item) => (
              <div key={item.key} className="progress-item">
                <div className="progress-header">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${scoreColor}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="card">
            <h3>Matched Skills</h3>
            <div className="tag-container">
              {matched_skills.length > 0 ? (
                matched_skills.map((s, i) => (
                  <span key={i} className="tag green">{s}</span>
                ))
              ) : (
                <p>No matched skills</p>
              )}
            </div>
          </div>

          <div className="card">
            <h3>Missing Skills</h3>
            <div className="tag-container">
              {missing_skills.length > 0 ? (
                missing_skills.map((s, i) => (
                  <span key={i} className="tag red">{s}</span>
                ))
              ) : (
                <p>No missing skills</p>
              )}
            </div>
          </div>

          {similarity_score > 0 && (
            <div className="card">
              <h3>Similarity Score</h3>
              <p>{(similarity_score * 100).toFixed(1)}%</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {session_id && (
        <div className="footer">
          <span>Session ID:</span>
          <code>{session_id}</code>
        </div>
      )}
    </div>
  );
}

export default Result;
