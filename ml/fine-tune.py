import torch
from torch.utils.data import Dataset, DataLoader
from transformers import MobileBertForSequenceClassification, MobileBertTokenizer, AdamW

data = [
    ("Major earthquake hits the city", 120, "Celebrity spotted at a local restaurant", 300, 1),
    ("New breakthrough in cancer research", 150, "Live: High-speed car chase on highway", 50, 0),
    # Add more headline pairs and labels (0 or 1) here
]

# Load the pre-trained MobileBERT model and tokenizer
model_name = "google/mobilebert-uncased"
model = MobileBertForSequenceClassification.from_pretrained(model_name, num_labels=1)
tokenizer = MobileBertTokenizer.from_pretrained(model_name)

# Prepare your labeled data
class HeadlineDataset(Dataset):
    def __init__(self, data, tokenizer):
        self.data = data
        self.tokenizer = tokenizer

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        h1, age1, h2, age2, label = self.data[idx]
        h1_with_age = f"{h1} [SEP] {age1} seconds ago"
        h2_with_age = f"{h2} [SEP] {age2} seconds ago"
        inputs = self.tokenizer(h1_with_age, h2_with_age, return_tensors="pt", padding=True, truncation=True)
        inputs["labels"] = torch.tensor([label], dtype=torch.long)
        return inputs

dataset = HeadlineDataset(data, tokenizer)
dataloader = DataLoader(dataset, batch_size=8, shuffle=True)

# Fine-tune the model
num_epochs = 3
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
optimizer = AdamW(model.parameters(), lr=5e-5)

for epoch in range(num_epochs):
    for batch in dataloader:
        model.train()
        optimizer.zero_grad()
        inputs = {k: v.to(device) for k, v in batch.items() if k != "labels"}
        labels = batch["labels"].to(device)
        outputs = model(**inputs, labels=labels)
        loss = outputs.loss
        loss.backward()
        optimizer.step()

# Save the fine-tuned model
output_dir = "mobilebert_headline_ranking"
model.save_pretrained(output_dir)
tokenizer.save_pretrained(output_dir)