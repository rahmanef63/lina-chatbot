'use client';
'use client';

import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';

const LinaChat: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: 'user' | 'lina', text: string }[]>([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (input.trim()) {
            setMessages([...messages, { sender: 'user', text: input }, { sender: 'lina', text: 'Loading...' }]);
            setInput('');

            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input }),
            });

            const data = await response.json();

            setMessages(prevMessages => [
                ...prevMessages.slice(0, prevMessages.length - 1),
                { sender: 'lina', text: data.response }
            ]);
        }
    };

    return (
        <div className="lina-chat">
            <div className="chat-history">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} sender={msg.sender} message={msg.text} />
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="text-input"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();  // Mencegah default behavior dari Enter
                            sendMessage();  // Panggil fungsi sendMessage
                        }
                    }}
                />

                <button onClick={sendMessage} className="send-button">Send</button>
            </div>
        </div>
    );
};

export default LinaChat;
