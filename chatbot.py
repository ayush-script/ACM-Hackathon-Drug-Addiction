from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

# Initialize the chatbot
chatbot = ChatBot('MentalHealthBot')

# Train with sample conversations
trainer = ListTrainer(chatbot)

trainer.train([
    "Hello",
    "Hi! I'm here to help with communication and mental health. How can I assist you today?",
    
    "How can I improve my communication skills?",
    "Great question! Try active listening: focus on the speaker, nod, and paraphrase what they say. Practice empathy by acknowledging feelings. For more tips, check out resources from MindTools.com.",
    
    "What is anxiety?",
    "Anxiety is a normal response to stress, but when excessive, it can affect daily life. Symptoms include worry, restlessness, or panic. If you're struggling, consider talking to a therapist. Resources: Anxiety.org.",
    
    "I'm feeling stressed",
    "I'm sorry you're feeling that way. Stress is common—try deep breathing or a short walk. If it persists, reach out to a professional. Here's a helpline: 1-800-950-NAMI (in the US).",
    
    "I have suicidal thoughts",
    "I'm really concerned. Please reach out immediately to the National Suicide Prevention Lifeline at 988 (US) or a local emergency service. You're not alone—help is available.",
    
    "Goodbye",
    "Take care! Remember, I'm here if you need more info. Prioritize your well-being."
])

# Function to get response
def get_response(user_input):
    response = chatbot.get_response(user_input)
    return str(response)

# Example usage (integrate into web app)
if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'quit':
            break
        print("Bot:", get_response(user_input))