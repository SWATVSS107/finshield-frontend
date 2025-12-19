const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://finshield-backend-2.onrender.com";

export default API_BASE;

/* ================= TYPES ================= */

export interface RiskSummary {
  total_transactions: number;
  fraud_rate: number;
  auto_blocked: number;
  manual_reviews: number;
  by_risk?: Record<string, number>;
  by_dataset?: Record<string, number>;
}

export interface RiskTrend {
  date: string;
  fraud_count: number;
}

export interface FraudByType {
  fraud_type: string;
  count: number;
}

export interface FraudByAmount {
  range: string;
  count: number;
}

export interface SOCAlert {
  id: number;
  transaction_id: string;
  entity_id: string;
  amount: number;
  fraud_type: string;
  risk: string;
  timestamp: string;
  dataset?: string;
  score?: number;
  label?: number;
}

export interface AlertDetail {
  id: number;
  transaction_id: string;
  dataset: string;
  risk_score: number;
  fraud_type: string;
  amount: number;
  timestamp: string;
  entity_id?: string;
  risk?: string;
  label?: number;
}

export interface InvestigationResponse {
  explanation: string;
}

export interface ActionResponse {
  alert_id: number;
  new_status: string;
  message: string;
}

export interface PredictRequest {
  dataset?: string;
  payload: Record<string, any>;
}

export interface PredictResponse {
  transaction_id: string;
  dataset: string;
  score: number;
  risk: string;
  label: number;
  fraud_type?: string;
  fraud_explanation?: string;
}

/* ================= ERROR HANDLING ================= */

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = "APIError";
  }
}

/* ================= GENERIC REQUEST HELPER ================= */

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${path}`;
  
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      let errorMessage = `API request failed: ${res.status} ${res.statusText}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch {
        const text = await res.text();
        errorMessage = text || errorMessage;
      }
      throw new APIError(errorMessage, res.status);
    }

    return res.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      error instanceof Error ? error.message : "Network error occurred",
      undefined,
      error
    );
  }
}

/* ================= RISK INTELLIGENCE ================= */

interface RiskSummaryResponse {
  total_predictions: number;
  fraud_count: number;
  fraud_rate: number;
  by_risk: Record<string, number>;
  by_dataset: Record<string, number>;
}

export async function getRiskSummary(): Promise<RiskSummary> {
  const data = await request<RiskSummaryResponse>("/risk/summary");
  
  return {
    total_transactions: data.total_predictions,
    fraud_rate: data.fraud_rate * 100, // Convert to percentage
    auto_blocked: data.by_risk?.auto_block || 0,
    manual_reviews: data.by_risk?.manual_review || 0,
    by_risk: data.by_risk,
    by_dataset: data.by_dataset,
  };
}

interface RiskTrendResponse {
  date: string;
  total: number;
  fraud: number;
}

export async function getRiskTrends(): Promise<RiskTrend[]> {
  const data = await request<RiskTrendResponse[]>("/risk/trends");
  
  return data.map((item) => ({
    date: item.date,
    fraud_count: item.fraud || 0,
  }));
}

export async function getRiskByType(): Promise<FraudByType[]> {
  const data = await request<Record<string, number>>("/risk/by-type");
  
  return Object.entries(data).map(([fraud_type, count]) => ({
    fraud_type,
    count,
  }));
}

interface RiskByAmountResponse {
  "0_100": number;
  "100_1000": number;
  "1000_10000": number;
  "10000_plus": number;
}

export async function getRiskByAmount(): Promise<FraudByAmount[]> {
  const data = await request<RiskByAmountResponse>("/risk/by-amount");
  
  return [
    { range: "$0 - $100", count: data["0_100"] || 0 },
    { range: "$100 - $1,000", count: data["100_1000"] || 0 },
    { range: "$1,000 - $10,000", count: data["1000_10000"] || 0 },
    { range: "$10,000+", count: data["10000_plus"] || 0 },
  ];
}

/* ================= TRANSACTIONS ================= */

export async function predictTransaction(
  payload: PredictRequest
): Promise<PredictResponse> {
  return request<PredictResponse>("/predict", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* ================= SOC ALERTS ================= */

interface SOCAlertResponse {
  id: number;
  transaction_id: string;
  entity_id: string;
  amount: number;
  fraud_type: string;
  risk: string;
  created_at: string;
  dataset?: string;
  score?: number;
  label?: number;
}

export async function getSocAlerts(): Promise<SOCAlert[]> {
  const data = await request<SOCAlertResponse[]>("/soc/alerts");
  
  return data.map((alert) => ({
    id: alert.id,
    transaction_id: alert.transaction_id,
    entity_id: alert.entity_id,
    amount: alert.amount,
    fraud_type: alert.fraud_type,
    risk: alert.risk,
    timestamp: alert.created_at,
    dataset: alert.dataset,
    score: alert.score,
    label: alert.label,
  }));
}

interface AlertDetailResponse {
  id: number;
  transaction_id: string;
  dataset: string;
  score: number;
  risk: string;
  label: number;
  fraud_type: string;
  amount: number;
  created_at: string;
  entity_id?: string;
  history?: Array<{
    id: number;
    amount: number;
    risk: string;
    fraud_type: string;
    created_at: string;
  }>;
}

export async function getSocAlertDetail(id: number): Promise<AlertDetail & { history?: any[] }> {
  const data = await request<AlertDetailResponse>(`/soc/alert/${id}`);
  
  return {
    id: data.id,
    transaction_id: data.transaction_id,
    dataset: data.dataset,
    risk_score: data.score,
    fraud_type: data.fraud_type,
    amount: data.amount,
    timestamp: data.created_at,
    entity_id: data.entity_id,
    risk: data.risk,
    label: data.label,
    history: data.history?.map((h) => ({
      ...h,
      timestamp: h.created_at,
    })),
  };
}

interface InvestigationResponseData {
  alert_id: number;
  investigation: string;
}

export async function investigateAlert(id: number): Promise<InvestigationResponse> {
  const data = await request<InvestigationResponseData>(`/soc/alert/${id}/investigate`, {
    method: "POST",
  });
  
  return {
    explanation: data.investigation,
  };
}

export async function takeAlertAction(
  id: number,
  action: "approve" | "block" | "escalate",
  comment?: string
): Promise<ActionResponse> {
  return request<ActionResponse>(`/soc/alert/${id}/action`, {
    method: "POST",
    body: JSON.stringify({ action, comment }),
  });
}
