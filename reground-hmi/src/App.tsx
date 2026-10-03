import { useState } from "react";
import "./App.css";

type MaterialState = "PASS" | "HOLD";

function App() {
  const [demoMode, setDemoMode] = useState<MaterialState>("PASS");

  const measurements =
    demoMode === "PASS"
      ? {
          moisture: 18.4,
          fineFraction: 76.1,
          oversize: 2.3,
          flowRate: 13.8,
          processedMass: 126.4,
        }
      : {
          moisture: 26.1,
          fineFraction: 67.4,
          oversize: 7.2,
          flowRate: 11.5,
          processedMass: 147.2,
        };

  const limits = {
    moistureMin: 14,
    moistureMax: 22,
    fineFractionMin: 70,
    oversizeMax: 5,
  };

  const moisturePass =
    measurements.moisture >= limits.moistureMin &&
    measurements.moisture <= limits.moistureMax;

  const finesPass = measurements.fineFraction >= limits.fineFractionMin;
  const oversizePass = measurements.oversize <= limits.oversizeMax;

  const overallPass = moisturePass && finesPass && oversizePass;

  const outputs = {
    coarse: overallPass ? 18.1 : 25.4,
    medium: overallPass ? 5.8 : 7.2,
    fine: measurements.fineFraction,
  };

  const batchNumber = overallPass ? "037" : "038";

  return (
    <div className="hmi">
      <header className="topbar">
        <div className="brand">
          <span className="brand-re">Re</span>
          <span className="brand-ground">Ground</span>
          <span className="brand-subtitle">MATERIAL VERIFICATION SYSTEM</span>
        </div>

        <div className="machine-state">
          <span className="state-dot" />
          SYSTEM RUNNING
        </div>

        <div className="job-id">
          JOB <strong>WRK-014</strong>
        </div>
      </header>

      <main className="content">
        <section className="project-strip">
          <div>
            <span className="label">PROJECT</span>
            <strong>Warkworth Development · Zone B</strong>
          </div>

          <div>
            <span className="label">RECEIVER</span>
            <strong>Local Clay Receiver</strong>
          </div>

          <div>
            <span className="label">ROUTE</span>
            <strong>12.1 km</strong>
          </div>

          <div>
            <span className="label">BATCH</span>
            <strong>#{batchNumber}</strong>
          </div>
        </section>

        <section className="main-grid">
          <div className="panel sensor-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">LIVE DATA</span>
                <h2>Material Stream</h2>
              </div>
              <span className="live-badge">LIVE</span>
            </div>

            <SensorRow
              name="Moisture"
              value={`${measurements.moisture.toFixed(1)} %`}
              requirement={`${limits.moistureMin}–${limits.moistureMax} %`}
              pass={moisturePass}
            />

            <SensorRow
              name="Fine fraction"
              value={`${measurements.fineFraction.toFixed(1)} %`}
              requirement={`≥ ${limits.fineFractionMin} %`}
              pass={finesPass}
            />

            <SensorRow
              name="Oversize"
              value={`${measurements.oversize.toFixed(1)} %`}
              requirement={`≤ ${limits.oversizeMax} %`}
              pass={oversizePass}
            />

            <div className="secondary-grid">
              <Metric
                label="Flow rate"
                value={measurements.flowRate.toFixed(1)}
                unit="t/h"
              />
              <Metric
                label="Processed"
                value={measurements.processedMass.toFixed(1)}
                unit="t"
              />
            </div>
          </div>

          <div
            className={`panel status-panel ${
              overallPass ? "status-pass" : "status-hold"
            }`}
          >
            <span className="eyebrow">CONFORMANCE STATUS</span>

            <div className="status-symbol">{overallPass ? "✓" : "!"}</div>

            <h1>{overallPass ? "WITHIN PROFILE" : "HOLD BATCH"}</h1>

            <p>
              {overallPass
                ? "Material conforms to the loaded receiver profile."
                : "One or more measurements are outside the receiver profile."}
            </p>

            <div className="status-meta">
              <div>
                <span>Receiver profile</span>
                <strong>RCP-014</strong>
              </div>

              <div>
                <span>Pre-approval</span>
                <strong>CONDITIONAL</strong>
              </div>
            </div>

            <button
              className={overallPass ? "release-button" : "hold-button"}
            >
              {overallPass ? "RELEASE FOR HAULAGE" : "ISOLATE BATCH"}
            </button>
          </div>
        </section>

        <section className="panel output-panel">
          <div className="output-heading">
            <div>
              <span className="eyebrow">SEPARATION</span>
              <h2>Material Output</h2>
            </div>

            <span className="small-note">
              Current batch mass distribution
            </span>
          </div>

          <div className="fraction-grid">
            <FractionCard
              title="COARSE"
              percentage={outputs.coarse}
              description="Oversize / aggregate fraction"
            />
            <FractionCard
              title="MEDIUM"
              percentage={outputs.medium}
              description="Intermediate fraction"
            />
            <FractionCard
              title="FINES"
              percentage={outputs.fine}
              description="Clay-rich candidate stream"
              highlighted
            />
          </div>
        </section>

        <footer className="bottom-bar">
          <div className="notice">
            <span className="notice-dot" />
            Conformance check against pre-approved receiver profile · Not a
            contamination certification
          </div>

          <div className="demo-controls">
            <span>DEMO STATE</span>

            <button
              className={demoMode === "PASS" ? "active" : ""}
              onClick={() => setDemoMode("PASS")}
            >
              PASS
            </button>

            <button
              className={demoMode === "HOLD" ? "active warning" : ""}
              onClick={() => setDemoMode("HOLD")}
            >
              HOLD
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

function SensorRow({
  name,
  value,
  requirement,
  pass,
}: {
  name: string;
  value: string;
  requirement: string;
  pass: boolean;
}) {
  return (
    <div className="sensor-row">
      <div>
        <span className="sensor-name">{name}</span>
        <span className="sensor-requirement">Target {requirement}</span>
      </div>

      <strong className="sensor-value">{value}</strong>

      <span className={`pill ${pass ? "pass" : "fail"}`}>
        {pass ? "PASS" : "OUT OF RANGE"}
      </span>
    </div>
  );
}

function Metric({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>
        {value}
        <small>{unit}</small>
      </strong>
    </div>
  );
}

function FractionCard({
  title,
  percentage,
  description,
  highlighted = false,
}: {
  title: string;
  percentage: number;
  description: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`fraction-card ${highlighted ? "highlighted" : ""}`}>
      <div className="fraction-top">
        <span>{title}</span>
        <strong>{percentage.toFixed(1)}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <span className="fraction-description">{description}</span>
    </div>
  );
}

export default App;