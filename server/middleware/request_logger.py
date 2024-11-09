from flask import request
import logging
import time

logger = logging.getLogger(__name__)

def log_request():
    # Start timer
    start_time = time.time()
    
    # Log request details
    logger.info(f"Request: {request.method} {request.url}")
    logger.debug(f"Headers: {dict(request.headers)}")
    
    if request.is_json:
        logger.debug(f"Body: {request.get_json()}")
        
    # Return function to log response
    def log_response(response):
        duration = time.time() - start_time
        logger.info(f"Response: {response.status} (took {duration:.2f}s)")
        return response
        
    return log_response 