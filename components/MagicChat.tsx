import React, { useState } from 'react';
import { I18n } from '../i18n/strings';
import { Loader } from './Loader';

interface MagicChatProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    t: I18n;
}

export const MagicChat: React.FC<MagicChatProps> = ({ onSendMessage, isLoading, t }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">{t.magicChatTitle}</h3>
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t.magicChatPlaceholder}
                        className="w-full p-3 pr-24 bg-gray-900 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition text-sm"
                        rows={2}
                        disabled={isLoading}
                        aria-label={t.magicChatTitle}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !message.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                    >
                        {isLoading ? <><Loader /> {t.magicChatIsRefining}</> : t.magicChatSend}
                    </button>
                </div>
            </form>
        </div>
    );
};
