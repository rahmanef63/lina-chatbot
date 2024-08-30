'use client';

import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';
import Link from 'next/link';

const LinaChat: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: 'user' | 'lina', text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const sendMessage = async () => {
        const trimmedInput = input.trim(); // Trimming input to remove extra spaces
        if (trimmedInput.length > 0) {  // Ensure input is not empty
            // Tambahkan pesan pengguna dan tampilkan loading
            setMessages([...messages, { sender: 'user', text: trimmedInput }]);
            setIsLoading(true);

            try {
            // Kirim query ke API backend
                const response = await fetch('/api/chatbot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: trimmedInput }), // Mengirim trimmedInput
                });

                const data = await response.json();

                // Tambahkan respons dari Lina ke dalam chat
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'lina', text: data.response },
                ]);
            } catch (error) {
                console.error('Error fetching response from Lina:', error);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'lina', text: 'Sorry, something went wrong.' },
                ]);
            } finally {
                setIsLoading(false);
            }

            setInput(''); // Reset input field
        } else {
            console.log('Empty or invalid input:', input);  // Logging for empty input
        }
    };

    // Fungsi autoscroll ke bawah saat ada pesan baru
    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Effect untuk autoscroll
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const renderResponse = (message: { sender: 'user' | 'lina', text: string }, index: number) => {
        if (message.sender === 'lina' && message.text.includes('Halaman:')) {
            const [text, link] = message.text.split('Halaman: ');
            return (
                <div key={index} className="lina-message">
                    {text}
                    <br />
                    <Link href={link}>
                        <a className="btn">Kunjungi Halaman</a>
                    </Link>
                </div>
            );
        } else if (message.sender === 'lina' && message.text.includes('Suggestions:')) {
            const [text, suggestion] = message.text.split('Suggestions: ');
            return (
                <div key={index} className="lina-message">
                    {text}
                    <br />
                    <button
                        className="btn"
                        onClick={() => setInput(suggestion)} // Isi input dengan suggestion untuk pertanyaan lanjutan
                    >
                        {suggestion}
                    </button>
                </div>
            );
        }
        return <ChatMessage key={index} sender={message.sender} message={message.text} />;
    };

    return (
        <div className="lina-chat">
            <div className="chat-history">
                {messages.map((msg, index) => (
                    renderResponse(msg, index)
                ))}
                {isLoading && <LoadingIndicator />}
                <div ref={chatEndRef} />
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
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <button onClick={sendMessage} className="send-button">Send</button>
            </div>
        </div>
    );
};

export default LinaChat;
