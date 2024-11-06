class APIError(Exception):
    """Base exception for API errors"""
    def __init__(self, message="An error occurred", status_code=400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        return {
            'error': self.message,
            'status_code': self.status_code
        }

class AuthenticationError(APIError):
    """Exception raised for authentication related errors"""
    def __init__(self, message="Authentication failed", status_code=401):
        super().__init__(message=message, status_code=status_code)

class ValidationError(APIError):
    """Exception raised for validation errors"""
    def __init__(self, message="Validation error", status_code=400):
        super().__init__(message=message, status_code=status_code)

class NotFoundError(APIError):
    """Exception raised when a resource is not found"""
    def __init__(self, message="Resource not found", status_code=404):
        super().__init__(message=message, status_code=status_code) 