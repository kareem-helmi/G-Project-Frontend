import { AuthResponse, ApiError } from "@/types/auth.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const MOCK_DELAY = 1000;

class AuthService {
    private async mockApiCall<T>(data: T, delay = MOCK_DELAY): Promise<T> {
        await new Promise(resolve => setTimeout(resolve, delay));
        return data;
    }

    async login(email: string, password: string, userType: string): Promise<AuthResponse> {
        try {
            //  Replace with actual API call when backend is ready
            /*
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password, userType }),
            });
            if (!response.ok) throw new Error("Login failed");
            return await response.json();
            */

            const mockResponse: AuthResponse = {
                success: true,
                token: `mock_token_${Date.now()}`,
                user: {
                    id: `user_${Date.now()}`,
                    email: email.trim(),
                    username: email.split("@")[0],
                    userType: userType as "individual" | "business",
                },
            };
            return await this.mockApiCall(mockResponse);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async register(userData: any): Promise<AuthResponse> {
        try {
            // Replace with actual API call
            const mockResponse: AuthResponse = {
                success: true,
                token: `mock_token_${Date.now()}`,
                user: {
                    id: `user_${Date.now()}`,
                    email: userData.email,
                    username: userData.username,
                    userType: userData.userType,
                    businessData: userData.businessData,
                },
            };
            return await this.mockApiCall(mockResponse);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async sendVerificationCode(email: string): Promise<{ success: boolean }> {
        try {
            //  Replace with actual API call
            return await this.mockApiCall({ success: true });
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async verifyCode(email: string, code: string): Promise<{ success: boolean; token?: string }> {
        try {
            //  Replace with actual API call
            return await this.mockApiCall({ success: true, token: `reset_token_${Date.now()}` });
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async resetPassword(token: string, newPassword: string): Promise<{ success: boolean }> {
        try {
            //  Replace with actual API call
            return await this.mockApiCall({ success: true });
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: unknown): ApiError {
        if (error instanceof Error) return { message: error.message };
        return { message: "An unexpected error occurred" };
    }
}

export const authService = new AuthService();