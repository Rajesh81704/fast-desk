import sys
import os

# Ensure project root is in sys.path for Vercel serverless environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app
