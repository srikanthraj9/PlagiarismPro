# TF-IDF + cosine similarity vs a small local corpus folder (optional).
# If corpus is empty, returns 0.0.
import os, glob
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

CORPUS_DIR = os.getenv("CORPUS_DIR", "corpus")
os.makedirs(CORPUS_DIR, exist_ok=True)

def load_corpus_texts():
    texts = []
    for path in glob.glob(os.path.join(CORPUS_DIR, "**/*.txt"), recursive=True):
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                texts.append(f.read())
        except:
            pass
    return texts

def check_plagiarism(target_text: str) -> float:
    corpus = load_corpus_texts()
    if not corpus:
        return 0.0

    docs = corpus + [target_text]
    vectorizer = TfidfVectorizer(stop_words="english", lowercase=True, max_df=0.9)
    tfidf = vectorizer.fit_transform(docs)

    # Compare last doc (uploaded) vs all others
    sim = cosine_similarity(tfidf[-1], tfidf[:-1]).flatten()
    best = float(sim.max()) if len(sim) else 0.0
    return round(best * 100.0, 1)
