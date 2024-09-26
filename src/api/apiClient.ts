export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class APIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = "APIError";
  }
}

export const apiClient = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> => {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Something went wrong";
      throw new APIError(errorMessage, response.status);
    }

    return { success: true, data };
  } catch (error: any) {
    if (error instanceof APIError) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "Network error or something went wrong" };
    }
  }
};
