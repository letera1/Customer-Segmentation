"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "@/components/LayoutV2";
import { API_BASE_URL } from "@/lib/config";
import { checkHealth, HealthResponse } from "@/lib/api";

export default function Settings() {
  const [endpoint, setEndpoint] = useState(API_BASE_URL);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<HealthResponse | null>(null);
  const [testError, setTestError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Check health on mount
    checkHealth().then(setTestResult);
  }, []);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestError(null);
    try {
      const res = await checkHealth();
      if (res) {
        setTestResult(res);
      } else {
        setTestError("Received non-200 or invalid response from /health.");
      }
    } catch (err: any) {
      setTestError(err?.message || "Failed to reach endpoint.");
    } finally {
      setTesting(false);
    }
  };

  const handleSavePreferences = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <LayoutV2>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-subtle">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-main">
              Platform & Inference Settings
            </h1>
            <p className="text-xs text-sub mt-0.5">
              Backend gateway connectivity, ML model specification, and environment parameters
            </p>
          </div>

          <button
            onClick={handleSavePreferences}
            className="btn-primary"
          >
            {saved ? "Saved" : "Save Changes"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* API Gateway Configuration */}
          <div className="panel p-5 space-y-4">
            <div className="pb-3 border-b border-subtle">
              <h2 className="text-sm font-semibold tracking-tight text-main">
                Inference Gateway
              </h2>
              <p className="text-xs text-sub">
                Target endpoint for FastAPI model prediction service
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-sub block mb-1">
                  API Base Endpoint
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    className="flex-1 h-8 rounded-md border border-subtle bg-surface px-3 text-xs font-mono text-main focus:outline-none"
                  />
                  <button
                    onClick={handleTestConnection}
                    disabled={testing}
                    className="btn-secondary"
                  >
                    {testing ? "Testing..." : "Test Health"}
                  </button>
                </div>
              </div>

              {testResult && (
                <div className="p-3 rounded-lg bg-surface border border-subtle space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted">Status:</span>
                    <span className="text-main font-semibold">{testResult.status} (200 OK)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Model Loaded:</span>
                    <span className="text-main">{testResult.model_loaded ? "Yes (K-Means)" : "No"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Scaler Loaded:</span>
                    <span className="text-main">{testResult.scaler_loaded ? "Yes (StandardScaler)" : "No"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">API Release:</span>
                    <span className="text-main">v{testResult.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Uptime:</span>
                    <span className="text-main">{Math.round(testResult.uptime_seconds)} seconds</span>
                  </div>
                </div>
              )}

              {testError && (
                <div className="p-3 rounded-lg border border-subtle bg-surface text-xs text-sub">
                  <span className="font-semibold text-main">Connection Error:</span> {testError}
                </div>
              )}
            </div>
          </div>

          {/* Model Specification & Architecture */}
          <div className="panel p-5 space-y-4">
            <div className="pb-3 border-b border-subtle">
              <h2 className="text-sm font-semibold tracking-tight text-main">
                Model Architecture
              </h2>
              <p className="text-xs text-sub">
                Calibrated machine learning artifacts and feature boundaries
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-2 rounded bg-surface border border-subtle">
                <span className="text-sub">Algorithm</span>
                <span className="font-mono text-main font-medium">Scikit-Learn K-Means (k=5)</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-surface border border-subtle">
                <span className="text-sub">Preprocessing</span>
                <span className="font-mono text-main font-medium">StandardScaler (Z-Score Normalization)</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-surface border border-subtle">
                <span className="text-sub">Feature Vector</span>
                <span className="font-mono text-main font-medium">[Age, Annual_Income, Spending_Score]</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-surface border border-subtle">
                <span className="text-sub">Model File</span>
                <span className="font-mono text-main text-[11px]">data/outputs/segmentation_model.pkl</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-surface border border-subtle">
                <span className="text-sub">Scaler File</span>
                <span className="font-mono text-main text-[11px]">data/outputs/scaler.pkl</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-surface border border-subtle">
                <span className="text-sub">Typography Font</span>
                <span className="font-mono text-main font-medium">Lato (Google Fonts)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutV2>
  );
}
