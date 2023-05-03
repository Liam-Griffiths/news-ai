import tensorflow as tf
from transformers import MobileBertForSequenceClassification, TFAutoModelForSequenceClassification, AutoTokenizer

# Open the fine-tuned model
output_dir = "mobilebert_headline_ranking"
model = MobileBertForSequenceClassification.from_pretrained(output_dir)

# Load the fine-tuned model as a TensorFlow model
tf_model = TFAutoModelForSequenceClassification.from_pretrained("mobilebert_headline_ranking", from_pt=True)
tokenizer = AutoTokenizer.from_pretrained("mobilebert_headline_ranking")

# Save the TensorFlow model
tf_model.save_pretrained("mobilebert_headline_ranking_tf")

# Then on to TensorFlow.js
# ---
# pip install tensorflowjs
# tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model --signature_name=serving_default --saved_model_tags=serve mobilebert_headline_ranking_tf mobilebert_headline_ranking_tfjs