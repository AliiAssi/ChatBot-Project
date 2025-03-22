# BONDO2: RAG-based University Chatbot

## Overview
BONDO2 is a retrieval-augmented generation (RAG) based chatbot designed specifically for universities. It allows you to upload your own data sources (CSV, TXT, or JSON files, PDFs) and create an interactive chatbot that can enhance administrative and academic support through Intelligent Information Retrieval.


## How to Use

### Prerequisites
- Your own data source (CSV, TXT, or JSON files, PDFs)
- Hugging Face account
- Ngrok account
- Google Colab account (for server-side hosting)

## Client Side
To run the client side of the project:

1. Navigate to the `/chatbot-client-side` folder.
2. Follow the README documentation in that folder for detailed setup instructions.

## Server Side
To set up and run the server side:

1. Create a new notebook or import the server-side notebook into Google Colab.
2. **Important**: Make sure to set the runtime type to T4 GPU, not just CPU.
3. Upload your data files to the Colab environment.
4. Create a token on Hugging Face:
   - Sign up/in at: https://huggingface.co/
   - Generate a new access token from your account settings.
5. Create a token on Ngrok:
   - Sign up/in at: https://dashboard.ngrok.com/login
   - Generate a new authtoken from your dashboard.
6. Run all cells in the notebook.

## Connection
The server-side notebook will provide a public URL via Ngrok that you can use to connect your client application to the RAG backend.

## Data Format
BONDO2 supports various data formats:
- CSV files (structured data)
- TXT files (unstructured text)
- JSON files (structured data)
- other formats

## Additional Information
For more detailed instructions and troubleshooting, refer to the documentation in both the client and server directories.
