## Steps to Set Up the Frontend of the Project

To set up the frontend of the React project, follow these steps:

### 1. Clone the Repository
Clone the React project repository:

```bash
git clone https://github.com/anutkaborisenko87/apzcourceproject-front-react.git <project-name>
cd <project-name>
```
### 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```
### 3. Configure the Environment

- Create a .env file by copying the example:

```bash
cp .env.example .env
```
- Define environment variables for API connection, for example:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Start the Development Server
   For local development, start the development server:

```bash
npm run dev
```
### 5. Deployment to a Remote Server
   For a production environment, build the project:

```bash
npm run build
```

The entry point for deployment is the dist folder.
