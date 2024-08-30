import React from 'react';

interface ChatMessageProps {
    sender: 'user' | 'lina';
    message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, message }) => {
    return (
        <div className={`chat-message ${sender}`}>
            <p><strong>{sender === 'user' ? 'You' : 'Lina'}:</strong> {message}</p>
        </div>
    );
};

export default ChatMessage;
