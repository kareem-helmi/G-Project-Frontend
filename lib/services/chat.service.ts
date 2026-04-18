
import { ChatMessage, AIResponseContext } from "@/types/chat.types";
import { ModelInsights, RiskFactor } from "@/types/business.types";

/**
 * Simulates API delay (remove in production)
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate AI response based on query
 * TODO: Replace with real API call to backend
 */
export async function generateAIResponse(
    context: AIResponseContext
): Promise<string> {
    await delay(1500);

    const { query } = context;
    const queryLower = query.toLowerCase();

    // Diabetes queries
    if (queryLower.includes("diabetes") || queryLower.includes("sugar")) {
        return `🔬 **Diabetes Risk Analysis**

**Normal Levels**:
• **Fasting Blood Sugar**: < 100 mg/dL
• **HbA1c**: < 5.7%
• **Post-meal**: < 140 mg/dL

**Main Risk Factors**:
1. BMI > 30
2. Family history
3. Sedentary lifestyle
4. Age above 45

**Recommendations**:
✓ Regular checkups every 6 months
✓ Balanced diet
✓ 30 mins daily exercise
✓ Weight management

Do you have specific values for analysis?`;
    }

    // Blood pressure queries
    if (queryLower.includes("blood pressure") || queryLower.includes("bp")) {
        return `❤️ **Blood Pressure Guide**

**Classification**:
• Normal: < 120/80
• Elevated: 120-129/<80
• Stage 1: 130-139/80-89
• Stage 2: ≥ 140/≥ 90

**Management Tips**:
✓ Reduce salt (<1500mg/day)
✓ Regular aerobic exercise
✓ Stress management
✓ Avoid smoking
✓ Healthy weight

Need analysis of specific readings?`;
    }

    // Patient analysis queries
    if (queryLower.includes("patient") || queryLower.includes("analysis")) {
        return `📊 **Patient Data Analysis**

For comprehensive analysis, I need:
1. **Patient ID** or medical record
2. **Lab Results**: sugar, cholesterol, enzymes
3. **Vitals**: BP, weight, height
4. **Medical History**: medications, past conditions

**Upload Options**:
• Excel/CSV file
• Manual entry
• Connect to medical system

How would you prefer to provide data?`;
    }

    // Default response
    return `🤖 **AI Health Assistant**

I can help with:
• Disease risk analysis
• Medical test interpretation
• Treatment recommendations
• Personalized health guidance

**Suggested Questions**:
• "Analyze diabetes risk for age 50"
• "Explain blood pressure reading 135/85"
• "Best diet for heart patients"
• "Cholesterol test interpretation"

Ask your specific question for the best answer!`;
}

/**
 * Get model insights
 * TODO: Replace with real API call
 */
export async function getModelInsights(): Promise<ModelInsights> {
    await delay(500);

    const features: RiskFactor[] = [
        { name: "Blood Glucose Levels", value: 35, category: "Metabolic" },
        { name: "BMI (Body Mass Index)", value: 25, category: "Physical" },
        { name: "Blood Pressure", value: 20, category: "Cardiovascular" },
        { name: "Age Factor", value: 20, category: "Demographic" },
    ];

    return {
        accuracy: 87,
        modelVersion: "2.1",
        lastUpdated: new Date().toISOString(),
        features
    };
}

/**
 * Send chat message
 * TODO: Replace with real API call to save chat history
 */
export async function sendChatMessage(
    message: ChatMessage
): Promise<{ success: boolean; error?: string }> {
    await delay(300);

    // Simulate saving to backend
    return { success: true };
}

/**
 * Get chat history
 * TODO: Replace with real API call
 */
export async function getChatHistory(
    userId: string
): Promise<ChatMessage[]> {
    await delay(500);

    // Return initial greeting message
    return [
        {
            id: "1",
            content: "Hello! I'm your AI Health Assistant. I can help you analyze patient data, explain medical insights, and answer health-related questions. How can I assist you today?",
            sender: "ai",
            timestamp: new Date(Date.now() - 60000),
        }
    ];
}

/**
 * Validate file attachment
 */
export function validateFileAttachment(
    file: File
): { valid: boolean; error?: string } {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = [
        'application/pdf',
        'text/plain',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg',
        'image/png',
    ];

    if (file.size > MAX_SIZE) {
        return { valid: false, error: "File size must be less than 10MB" };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return { valid: false, error: "File type not supported" };
    }

    return { valid: true };
}