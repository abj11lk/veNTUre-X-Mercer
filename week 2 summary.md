

## Week 2 - Model Pipelines

We evaluated two major approaches for extracting structured information from user-uploaded insurance documents:

* **Pipeline 1**: Sequence Tagging (BiGRU, BiLSTM, RNN)
* **Pipeline 2**: Retrieval-Augmented Generation (RAG) using vector embeddings + LLMs

### OCR Evaluation & Preprocessing Insights - Abarna

Before finalizing the downstream pipelines, we explored the effectiveness of different OCR tools for processing user-uploaded PDFs. This evaluation informed our decision on which tool to integrate early on.

* **Azure OCR Evaluation** 
  * Assessed Azure's OCR accuracy across diverse insurance PDFs.
  * Found that Azure performs well in extracting both key-value pairs and structured table content.
  * Noted that Azure handles layout-heavy documents better than open-source alternatives.
  * Identified limitations such as the **2-page restriction** in the free tier and occasional formatting inconsistencies.

* **Decision Rationale**
  * Azure OCR was selected as the default preprocessing component for both pipelines due to its **high accuracy and stable API**.
  * Looking at alternatives for overcoming Azure's limitations.



### Pipeline 1: Sequence Tagging

```
User Uploads PDF → OCR Extraction (Azure) → Text Cleaning (spaCy) → 
Manual Token Labeling (BIO format) → 
Sequence Tagging Model (BiGRU / BiLSTM / RNN) → 
Entity Tag Prediction → Post-Processing → Final Extracted Answer
```

#### Model Variants

* **BiGRU (Jovina)**
  Bidirectional GRU architecture, captures left and right context. Best for moderate-length forms with structured token layout.

  * tried to label important information token-by-token
  * Example: Label "1 Jan 2023" as Effective Date or "John Doe" as Insured Person
  * idea was to train the BiGRU to recognize and tag such patterns in documents
  * needs a lot of labeled examples for each field (e.g., what’s a name, what’s a date)
  * A BiGRU pipeline is fixed: it only extracts what it’s trained on - not suited for this project which involves open ended user questions



* **BiLSTM (Mihir)**
  Similar to BiGRU but with LSTM units, offering better memory of longer sequences.
   * Both models learned to spot the labels you assigned perhaps “Class 0” or “Class 1” using only knowledge from our own PDF collection .
   * We made sure our word dictionary and word vectors perfectly matched your documents, so nothing “blind” is happening.
   * We stored all results for easy search later—not just the neural judgments, but also the text and its vector meaning—for chatbotting, Q&A, and more.
   * What we found: Both models scored near “perfect” accuracy pretty quickly—a sign our test was easy or our validation batch was tiny.
   * The difference between the two models (LSTM vs. GRU) was minimal on this task, at least for now.
   * Our models and pipeline “work”—but if we want more reliable results for the real world, we’ll need more labeled examples, not just a couple per class.


* **RNN (Shreya)**
  Basic recurrent network, processes tokens sequentially. Limited memory and prone to vanishing gradients.

##### Why Sequence Tagging Fails in This Context - jovina

We initially explored using sequence models like BiGRU, BiLSTM, and RNN to extract answers directly by labeling each token in the document (like saying "this word = effective date"). But we quickly found this wasn’t ideal for our use case:

* Insurance PDFs are **long, structured, and span multiple sections**
* Hard to label: these models need alot of manually labeled tokens, not feasible 
* Inflexible: cannot handle **dynamic questions** or **multi-section reasoning**
* RAG enables **answer generation using actual retrieved text**, avoiding label bottlenecks


### Pipeline 2: Retrieval-Augmented Generation (RAG) - Abhijeet

```
User Uploads PDF → OCR (Azure / Google) → 
Text Cleaning & Chunking → Embedding Creation → Vector Store → 
User Query → Similarity Search → Retrieved Chunks → 
LLM (Gemini) → Composed Answer
```

#### Advantages

* No manual token labeling
* Handles multi-section, long-form PDFs
* Modular and scalable - works across different document formats and layouts
* Enables contextual, open-ended answers - users can ask anything, and the model can reason over the retrieved content


### Next Week: Research Areas

| Focus Area                              | Owner(s)         | Resources                                                                                         |
| --------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| OCR alternative (no Azure 2-page limit) | All              | Google Vision, Tesseract                                                                          |
| AWS Multimodal RAG                      | Jovina + Shreya  | [AWS Demo](https://www.youtube.com/watch?v=jDFpEnJeSVg)                                           |
| Google Gemini Multimodal RAG            | Abarna           | [Gemini Demo](https://www.youtube.com/watch?v=LF7I6raAIL4)                                        |
| MongoDB Atlas Multimodal RAG            | Abhijeet + Mihir | [LangChain + MongoDB](https://python.langchain.com/docs/integrations/vectorstores/mongodb_atlas/) |

---
