import { API_BASE_URL } from "./config";

export interface CustomerInput {
  age: number;
  annual_income: number;
  spending_score: number;
}

export interface PredictionResponse {
  cluster_id: number;
  segment_name: string;
  segment_description: string;
  marketing_strategy: string;
  confidence: number;
  timestamp: string;
}

export interface SegmentProfile {
  cluster_id: number;
  name: string;
  description: string;
  strategy: string;
  characteristics: {
    income_level?: string;
    spending_pattern?: string;
    price_sensitivity?: string;
    loyalty_potential?: string;
    [key: string]: any;
  };
}

export interface BatchPredictionResponse {
  predictions: PredictionResponse[];
  total_processed: number;
  processing_time_ms: number;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  scaler_loaded: boolean;
  version: string;
  uptime_seconds: number;
}

export interface MetricsResponse {
  uptime_seconds: number;
  model_status: string;
  model_load_time: string | null;
  version: string;
}

export async function checkHealth(): Promise<HealthResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchSegments(): Promise<SegmentProfile[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/segments`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load segments");
    return await res.json();
  } catch (err) {
    // Fallback default cluster profiles matching backend
    return [
      {
        cluster_id: 0,
        name: "Budget Conscious",
        description: "Price-sensitive customers seeking value and deals",
        strategy: "Discount campaigns, loyalty rewards, bundle offers",
        characteristics: {
          income_level: "Low to Moderate",
          spending_pattern: "Conservative",
          price_sensitivity: "High",
          loyalty_potential: "Medium",
        },
      },
      {
        cluster_id: 1,
        name: "High Value",
        description: "High-value customers with strong purchasing power",
        strategy: "VIP programs, exclusive products, premium services",
        characteristics: {
          income_level: "High",
          spending_pattern: "Generous",
          price_sensitivity: "Low",
          loyalty_potential: "High",
        },
      },
      {
        cluster_id: 2,
        name: "Potential Growth",
        description: "High-income customers with untapped spending potential",
        strategy: "Personalized engagement, product discovery, incentives",
        characteristics: {
          income_level: "High",
          spending_pattern: "Conservative",
          price_sensitivity: "Medium",
          loyalty_potential: "High",
        },
      },
      {
        cluster_id: 3,
        name: "Average Customers",
        description: "Balanced customers with moderate income and spending",
        strategy: "Regular promotions, cross-selling, retention programs",
        characteristics: {
          income_level: "Moderate",
          spending_pattern: "Balanced",
          price_sensitivity: "Medium",
          loyalty_potential: "Medium",
        },
      },
      {
        cluster_id: 4,
        name: "Young Savers",
        description: "Young customers building their purchasing habits",
        strategy: "Digital engagement, trend-focused campaigns, growth nurturing",
        characteristics: {
          income_level: "Low to Moderate",
          spending_pattern: "Selective",
          price_sensitivity: "Medium",
          loyalty_potential: "High",
        },
      },
    ];
  }
}

export async function predictCustomer(input: CustomerInput): Promise<PredictionResponse> {
  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Prediction failed");
  }
  return await res.json();
}

export async function batchPredictCustomers(customers: CustomerInput[]): Promise<BatchPredictionResponse> {
  const res = await fetch(`${API_BASE_URL}/batch-predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customers }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Batch prediction failed");
  }
  return await res.json();
}

export async function fetchMetrics(): Promise<MetricsResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/metrics`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
