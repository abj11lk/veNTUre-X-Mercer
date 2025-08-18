# MERCER-TEAM 2


## Mercer Insurance Document Chatbot

This is an internal tool we’re building for Mercer, an AI-powered chatbot that allows staff to ask questions about scanned insurance documents (PDFs), such as:

> “What is the effective date?”  
> “Who is covered?”  
> “What are the policy details?”

The goal is to extract answers automatically from the uploaded documents using OCR (optical character recognition) and AI.


## Project Objectives

Allow internal users to upload **scanned PDF insurance documents**  
Automatically extract key fields (effective date, premium, coverage, etc.)  
Let users **ask questions in natural language** and get relevant answers  

## start to end pipeline
User Uploads PDF → OCR Extraction → Text Cleaning & Preprocessing (spaCy) → Text Chunking (LangChain, Haystack, or manual chunking)→ Embedding Creation for Document Chunks (OpenAI, HuggingFace Transformers, SentenceTransformers, etc.) → Store Embeddings in Vector Database (Weaviate) → User Asks a Question via Chat Interface (Tailwind alr done) → Embed User Question (using same embedding model as document chunks) → Similarity Search in Vector Database (find most relevant document chunks) → Pass Relevant Chunks + Question to LLM (Gemini) → LLM Synthesizes & Generates Answer → Answer Displayed in User Chat Interface


## Current Focus (MVP Phase)

### 1. Extract Text from PDF
- Use **OCR** to read scanned PDFs and pull out text
  - Options to explore: `Tesseract` (open-source), `Google Vision API`, `AWS` and  `Azure`
- Clean the text output for consistency
- challenge is extracting usable text from images (via OCR) regardless of format variability

### 2. Preprocess the Text
- Use tools like `spaCy` to:
  - Split the text into words/sentences
  - Tag parts of speech
  - Handle typos or weird formatting from OCR

### User Interface
- Create a simple web interface using `Tailwind CSS` 
- Allow file upload + a chatbox to ask questions



## What We Might Explore

### Pre-trained Language Models (e.g. BERT, RoBERTa, DistilBERT)

- We **only have 5 documents** now, so fine-tuning these models may not be effective yet
- might explore **prompt-based use** 

### Layout-Aware Models (e.g. LayoutLM)

> read documents by understanding both the text **and layout/structure** (like tables, headers, etc.)

- Might be more useful for scanned PDFs where layout matters
- Good alternative if traditional text models don’t work well



## Suggestions from the Team (Future Ideas)

- Explore multiple models (e.g. BiLSTM, GRU, Transformers) and use **voting or confidence scoring** to increase accuracy
- Use **Keras Tuner** or **Optuna** to automatically find the best model settings
- Add **padding, pooling, and regularization** to prevent overfitting if we train deep models
- Use `spaCy` more deeply for tokenization, tagging, and handling rare or misspelled words


