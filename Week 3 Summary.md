# Week 3 Summary


## Google Gemini Multimodal RAG — Abarna

- Implemented RAG pipeline using:
  - Gemini via LangChain
  - Extraction using `PyPDF2`
  - Embeddings via FAISS vector database
- Successfully tested with Client A’s document
- Observed that:
  - Since `PyPDF2` only extracts raw text, structured content like tables is not well parsed
  - Gemini handles missing data gracefully (e.g., replies that no info is found instead of hallucinating)
- Plan to explore better PDF parsers for cleaner table extraction


## AWS Multimodal RAG — Jovina + Shreya

- Attempted to follow AWS pipeline using Bedrock services but all Titan embedding models and other embedding models under Bedrock are paid
- Jovina:
  - Used `unstructured` library to parse documents
  - Embedded parsed data using `sentence-transformers`
  - Stored in a `FAISS` vector database
  - Queried with Gemini for RAG, but responses were not very accurate
  - Observed poor handling of tables and planned to try alternative extraction and embedding techniques due to limitations observed


- Shreya:
  - Used `PyMuPDF` to extract content from PDFs
  - - Using `ChromaDB` as the vector database
- Initially used `Instructor XL` embedding model, but it was too heavy for local GPU
- Attempted to fix it by:
  - Splitting data into smaller chunks 
- Switched to `Instructor Base`
  - still very slow

  

## MongoDB Atlas Multimodal RAG — Mihir + Abhijeet

**Mihir:**
- Followed existing RAG pipeline until storing output in MongoDB
- Used `doctr` for layout-aware OCR
- Found the OCR quality from `doctr` to be quite decent

**Abhijeet:**
- Experimented extensively with Nomic embedding models
- Found the model quality quite good
- Faced challenges building the full RAG pipeline
- Not reliant on OCR in his current pipeline
