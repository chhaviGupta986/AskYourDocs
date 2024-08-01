# AskYourDocs 📄💬
## Overview

AskYourDocs is an intelligent document chatbot that leverages Retrieval-Augmented Generation (RAG) to help you interact with your documents effortlessly. Whether you need a summary, answers to specific questions, or graphical insights from your documents, AskYourDocs has you covered.

## Key Features
- **Text & Graph Responses**: Receive answers in clear text and captivating visual formats.
- **RAG-Powered Document Preprocessing**: Utilizes retrieval-augmented generation to ensure accurate, hallucination-free responses.
- **Cited References**: Access precise references for further reading, directly from the sourced pages or slides.
- **Sleek User Interface**: Enjoy an intuitive and visually appealing user experience.
- **Batch Uploads**: Effortlessly upload multiple files at once.
- **Flexible File Types**: Supports a variety of document formats including Word, PDF, PowerPoint, and text files.
- **Fast Performance**: Experience lightning-fast uploads and responses.

## Tech Stack
- **Frontend**: React, Bootstrap
- **Backend**: Flask
- **Models**: Gemini 1.5 Flash, Hugging Face’s all - MiniLM- L6 -v2

## Setup Instructions

### Obtain API Keys

#### Hugging Face API:
1. Visit [Hugging Face](https://huggingface.co/)
2. Log in or sign up for a new account
3. Navigate to your account settings and locate the "Access Tokens" section
4. Create a new token with 'write' permissions and copy the generated key

#### Google Gemini API:
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Log in to your account
3. Create a new API key or use an existing one, and copy the generated key

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/chhaviGupta986/AskYourDocs.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd NLP_Backend
   ```
3. Create a .env file:
   ```bash
   echo "HUGGING_FACE_API_TOKEN='your_hugging_face_api_token'" > .env
   echo "GEMINI_API_KEY='your_gemini_api_key'" >> .env
   ```
4. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the Flask backend:
   ```bash
   python -m flask --app app run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Run the frontend application:
   ```bash
   npm run dev
   ```

## Usage
1. Navigate to the application in your web browser
2. Upload the files you want to process
3. Use the chat interface to ask questions related to the uploaded files
4. Enjoy AI-powered insights and visualizations based on your documents

