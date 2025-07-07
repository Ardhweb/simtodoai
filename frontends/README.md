Sure, here's a step-by-step guide on how to run your full-stack project manually with the Docker configuration included.

---

## **Full-Stack Project Setup Guide**

### **Prerequisites:**

1. Make sure you have **Python**, **Node.js**, and **Docker** installed on your machine.
2. Ensure you have **pip** for Python dependencies and **npm** for frontend dependencies installed.

### **Steps to Run the Project Manually:**

---

### **Step 1: Clone the Repository**

1. **Clone the repo** to your local machine using Git.
   Open your terminal and run:

   ```bash
   git clone <repo-url>
   ```

   Replace `<repo-url>` with the actual URL of your repository.

---

### **Step 2: Set Up the Backend**

1. Navigate to the **backend** directory. Assuming your project structure looks like this:

   ```bash
   cd <project-directory>/backend
   ```

2. **Create and activate a Python virtual environment** (if not already done):

   * For **Linux/macOS**:

     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   * For **Windows**:

     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```

3. **Install dependencies** by running the following command inside the **backend** folder:

   ```bash
   pip install -r requirements.txt
   ```

4. **Check if Docker is required**:

   * If Docker is included for backend services (e.g., databases), make sure to build and run the Docker containers:

     ```bash
     docker-compose up --build
     ```

---

### **Step 3: Set Up the Frontend**

1. Open another **terminal shell** and navigate to the **frontend** directory:

   ```bash
   cd <project-directory>/frontend
   ```

2. **Install frontend dependencies** using npm:

   ```bash
   npm install
   ```

3. **Run the frontend app**:

   ```bash
   npm run dev
   ```

   This will start the development server. Open your browser and go to `http://localhost:3000` (or the specified port).

---

### **Step 4: Running Both Services**

* If both backend and frontend are set up correctly, your backend should be running on its own port (e.g., `http://localhost:5000`), and the frontend will be served via `http://localhost:3000`.

* If you are using Docker to manage both backend and database services, ensure all containers are running by checking:

  ```bash
  docker ps
  ```

---

### **Step 5: Optional - Running the Full Stack with Docker**

If you'd prefer to use Docker for the full stack (frontend + backend + database), you can use `docker-compose` to manage the containers. This method is typically more convenient for production-like environments or if you need isolated dependencies.

1. **Ensure `docker-compose.yml`** is correctly configured for both frontend and backend services.

2. **Run Docker Compose** to start everything:

   ```bash
   docker-compose up --build
   ```

3. **Access the app**:

   * Backend: `http://127.0.0.1:8000:`
   * Frontend: `http://localhost:3000`

---

### **Troubleshooting Tips:**

* **Backend not starting**:

  * Ensure all required environment variables (e.g., DB credentials) are set in `.env` files or Docker environment variables.
  * Check if the database services are running correctly via Docker.

* **Frontend not running**:

  * Verify the `npm run dev` command does not have any missing dependencies or errors in your code.
  * Ensure the frontend is pointing to the correct backend API endpoint.

---

### **Conclusion**

Once all the steps are followed correctly, both the frontend and backend should be up and running. Docker can simplify managing the project by bundling dependencies and services into containers, making it easier to run the project across different environments.

The UI Glimpse are here:


