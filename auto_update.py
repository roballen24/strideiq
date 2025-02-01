import os
import subprocess
import time

def update_code():
    """Pulls the latest updates from GitHub"""
    print("\n🔄 Checking for code updates...\n")
    os.system("git pull origin main")

def update_dependencies():
    """Updates Python dependencies"""
    print("\n🔄 Updating dependencies...\n")
    os.system("pip install --upgrade -r requirements.txt")

def restart_server():
    """Restarts the FastAPI server"""
    print("\n🔄 Restarting StrideIQ server...\n")
    os.system("pkill -f 'uvicorn app.main:app'")  # Kills existing server
    os.system("nohup uvicorn app.main:app --reload > strideiq.log 2>&1 &")  # Starts server in background

if __name__ == "__main__":
    while True:
        update_code()
        update_dependencies()
        restart_server()
        print("\n✅ Update check complete. Next check in 5 minutes...\n")
        time.sleep(300)  # Wait for 5 minutes before checking again
