

import { tempStorage } from "./storage";
import { RiskLevel, HealthStatus } from "@/types/individual.types";

// ==========================================
// COLOR UTILITIES
// ==========================================

export const getRiskColor = (riskLevel: RiskLevel) => {
    const colors = {
        High: {
            bg: 'bg-red-500/10',
            text: 'text-red-500',
            border: 'border-red-500/30',
            gradient: 'from-red-500/20 to-red-600/10'
        },
        Medium: {
            bg: 'bg-yellow-500/10',
            text: 'text-yellow-500',
            border: 'border-yellow-500/30',
            gradient: 'from-yellow-500/20 to-yellow-600/10'
        },
        Low: {
            bg: 'bg-green-500/10',
            text: 'text-green-500',
            border: 'border-green-500/30',
            gradient: 'from-green-500/20 to-green-600/10'
        }
    };

    return colors[riskLevel] || {
        bg: 'bg-gray-500/10',
        text: 'text-gray-500',
        border: 'border-gray-500/30',
        gradient: 'from-gray-500/20 to-gray-600/10'
    };
};

export const getStatusColor = (status: HealthStatus): string => {
    const colors: Record<HealthStatus, string> = {
        high: 'text-red-500',
        low: 'text-yellow-500',
        normal: 'text-green-500'
    };
    return colors[status] || 'text-gray-500';
};

export const getStatusBadge = (status: HealthStatus) => {
    const badges: Record<HealthStatus, { text: string; color: string }> = {
        high: { text: 'High', color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' },
        low: { text: 'Low', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' },
        normal: { text: 'Normal', color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' }
    };

    return badges[status] || {
        text: 'Unknown',
        color: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
    };
};

// ==========================================
// FORMATTING UTILITIES
// ==========================================

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
};

export const formatVitalValue = (vital: {
    value: string | number;
    unit: string
}): string => {
    return `${vital.value} ${vital.unit}`;
};

// ==========================================
// VALIDATION UTILITIES
// ==========================================

export const isValidPatientData = (data: any): boolean => {
    return !!(data && data.id && data.name && data.age && data.risk);
};

export const isValidVitalSign = (vital: any): boolean => {
    return !!(
        vital &&
        vital.id &&
        vital.name &&
        vital.value !== undefined &&
        vital.unit &&
        vital.status
    );
};

// ==========================================
// STORAGE UTILITIES (Using tempStorage)
// ==========================================

export const storage = {
    set: (key: string, value: any): void => {
        try {
            tempStorage.set(key, value);
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    },

    get: <T = any>(key: string): T | null => {
        try {
            return tempStorage.get<T>(key);
        } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
        }
    },

    remove: (key: string): void => {
        try {
            tempStorage.remove(key);
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    },

    clear: (): void => {
        try {
            tempStorage.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    }
};

// ==========================================
// CHART CONFIGURATION
// ==========================================

export const CHART_CONFIG = {
    colors: ['#0EB2B1', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#10B981'],
    cartesianGrid: {
        strokeDasharray: '3 3',
        stroke: '#0EB2B1',
        opacity: 0.3,
    },
    axis: {
        stroke: '#0EB2B1',
        fontSize: 12,
        fill: '#0EB2B1',
    },
    tooltip: {
        contentStyle: {
            backgroundColor: 'rgba(14, 178, 177, 0.95)',
            border: '1px solid #0EB2B1',
            borderRadius: '8px',
            color: 'white',
            backdropFilter: 'blur(10px)',
        },
    },
};

// ==========================================
// APP CONSTANTS
// ==========================================

export const APP_CONFIG = {
    colors: {
        primary: '#0EB2B1',
        secondary: '#4A90E2',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6'
    },
    thresholds: {
        highRisk: 70,
        mediumRisk: 40,
        lowRisk: 0
    }
};