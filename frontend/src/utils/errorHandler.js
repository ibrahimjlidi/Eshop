/**
 * API Error Utility
 * Standardized error responses
 */

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      status: error.response.status,
      message: error.response.data?.message || 'An error occurred',
      data: error.response.data,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      status: 0,
      message: 'No response from server',
      data: null,
    };
  } else {
    // Error in request setup
    return {
      status: 0,
      message: error.message || 'An error occurred',
      data: null,
    };
  }
};

export const isSuccessResponse = (response) => {
  return response?.success === true;
};

export const getErrorMessage = (error) => {
  return error?.response?.data?.message || error?.message || 'An unknown error occurred';
};
