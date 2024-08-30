import { render, screen, fireEvent } from '@testing-library/react';
import LinaChat from '../../components/LinaChat';

describe('LinaChat Component', () => {
    it('renders input and send button', () => {
        render(<LinaChat />);
        expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
        expect(screen.getByText('Send')).toBeInTheDocument();
    });

    it('sends a message when Enter key is pressed', () => {
        render(<LinaChat />);
        const input = screen.getByPlaceholderText('Type your message...');
        fireEvent.change(input, { target: { value: 'Hello' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
