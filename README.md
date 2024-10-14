# QuizProject

## Overview
The **Quiz App** is an interactive web application designed to test users' knowledge on various topics. The app presents multiple-choice questions, evaluates user responses, and provides feedback on performance.

## Features
- **Multiple Categories**: Choose from different quiz categories (e.g., Science, History, General Knowledge).
- **Score Tracking**: Tracks the user’s score and provides final feedback based on performance.
- **Responsive Design**: Mobile-friendly and works across devices.
- **Custom Questions**: Add your own set of quiz questions (optional).
  
## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Database** FireBase

## Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/quiz-app.git
    cd quiz-app
    ```

2. **Install Dependencies** (if backend is used):
    ```bash
    npm install
    ```

3. **Run the Application**:
    - **Frontend only**: Open the `index.html` file in a browser.
    - **With Backend**: Start the Node.js server.
    ```bash
    node server.js
    ```

4. **Access the App**:
    - Visit `http://localhost:3000` if using backend.

## Usage

1. Select a category.
2. Answer the multiple-choice questions within the time limit.
3. Submit your answers and view your score.

## Customizing Questions

To add custom questions, modify the `questions.js` file or update the database if using a backend. Each question object should follow this structure:
```javascript
{
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
}
