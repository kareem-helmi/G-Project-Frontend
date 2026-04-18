
/**
 * Export all auth types
 */
export type {
  UserType,
  BusinessType,
  User,
  DoctorData,
  InstitutionData,
  AuthResponse,
  ApiError,
} from "./auth.types";

/**
* Export all business types
*/
export type {
  RiskLevel,
  Gender,
  FileStatus,
  VitalStatus,
  ImpactLevel,
  Patient,
  PatientDetails,
  PatientVitalSigns,
  PatientAnalyticsData,
  BusinessStats,
  DiseaseProgressionPoint,
  AnalyticsTrend,
  RiskFactor,
  AIExplanation,
  ModelInsights,
  Report,
  UploadedFile,
  Settings,
} from "./business.types";

/**
* Export all chat types (AI Explanations)
* Note: ModelInsights is imported from business.types to avoid duplication
*/
export type {
  MessageSender,
  MessageStatus,
  ChatMessage,
  FileAttachment,
  ChatInputState,
  AIResponseContext,
  ExamplePrompt,
  ChatContainerState,
} from "./chat.types";

/**
* Export all analytics types
*/
export type {
  TimeRange,
  PatientSelectorOption,
  AnalyticsFilters,
  HealthTrendDataPoint,
  RiskGaugeData,
  AnalyticsPageState,
} from "./analytics.types";
/**
 * Export all individual types
 */
export type {
  RiskLevel as IndividualRiskLevel,
  HealthStatus,
  ActivityStatus,
  TrendDirection,
  Patient as IndividualPatient,
  VitalSign,
  PredictionResult,
  AnalysisItem,
  ResultsPageData,
  HealthTrendPoint,
  RiskFactor as IndividualRiskFactor,
  ActivityItem,
  DashboardData as IndividualDashboardData,
} from "./individual.types";


// ==================================================================
// USAGE EXAMPLES:
// ==================================================================

/**
* في أي ملف تاني، تقدر تستورد Types كده:
* 
* // Import specific types
* import { User, Patient, BusinessStats, ChatMessage } from "@/types";
* 
* // Or import from specific file
* import { AuthResponse } from "@/types/auth.types";
* import { RiskLevel } from "@/types/business.types";
* import { ChatMessage } from "@/types/chat.types";
* 
* // Note: ModelInsights exists in both business.types and chat.types
* // Use ChatModelInsights for chat-specific model insights
*/