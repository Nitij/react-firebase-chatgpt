import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

const ChatGpt = () => {
    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState('');
    const [fetching, setFetching] = useState(false)

    const handleSubmit = async () => {
        const functions = getFunctions();
        const chatCompletion = httpsCallable(functions, 'chatCompletion');
        try {

            let data = {
                prompt
            }
            setFetching(true)
            const result = await chatCompletion(data);
            setOutput(result.data.aiResponse)
        } catch (error) {
        } finally {
            setFetching(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 w-[600px]">
            <div className="bg-white border rounded-lg p-6 w-full">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt</label>
                <input
                    type="text"
                    name="prompt"
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border"
                />
                <button
                disabled={fetching}
                    onClick={handleSubmit}
                    className={`${fetching ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'} mt-4 px-4 py-2  text-white rounded-md `}
                >
                    {fetching ? 'Fetching AI Response' : 'Submit Prompt'}
                </button>
            </div>

            <div className="bg-white border shadow-lg rounded-lg p-6 w-full mt-8">
                <label className="block text-sm font-medium text-gray-700">AI Output</label>
                <div className="mt-1 block w-full rounded-md border-gray-300 p-4">
                    {output}
                </div>
            </div>
        </div>
    );
}

export default ChatGpt;
