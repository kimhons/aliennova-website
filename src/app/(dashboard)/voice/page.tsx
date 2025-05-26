"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { voiceOptions, audioFeatures, transcriptionFormats, voiceCommandCategories } from '@/config/voice-config';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('transcribe');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('en-US-female-1');
  const [speed, setSpeed] = useState('1.0');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const handleFeatureToggle = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Define request data interface
      interface RequestData {
        action: string;
        data?: {
          audioUrl?: string;
          format?: string;
          speakerIdentification?: boolean;
          text?: string;
          voice?: string;
          speed?: string;
          features?: string[];
          command?: string;
          context?: string;
        };
      }
      
      // Initialize request data with action
      let requestData: RequestData = { action };
      
      switch (action) {
        case 'transcribe':
          requestData.data = {
            audioUrl: 'simulated-audio-url',
            format: 'detailed',
            speakerIdentification: true
          };
          break;
          
        case 'synthesize':
          requestData.data = {
            text,
            voice,
            speed,
            features: selectedFeatures
          };
          break;
          
        case 'command':
          requestData.data = {
            command: text,
            context: 'home',
            features: selectedFeatures
          };
          break;
      }
      
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to process voice request');
      }
    } catch (err) {
      setError('An error occurred during voice processing');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRecording = () => {
    // In a real implementation, this would start/stop audio recording
    setIsRecording(!isRecording);
    
    if (isRecording) {
      // Simulate stopping recording and getting a URL
      setAudioUrl('simulated-recording.mp3');
    } else {
      // Clear previous recording when starting a new one
      setAudioUrl('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">GalaxyVoice</h1>
      <p className="mb-8 text-gray-600">
        Voice-to-text and text-to-voice conversion tool with additional audio editing capabilities.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Voice Tools</h2>
            <div className="space-y-2">
              <button
                onClick={() => setAction('transcribe')}
                className={`w-full py-2 px-4 rounded-md text-left ${
                  action === 'transcribe' 
                    ? 'bg-indigo-100 border-l-4 border-indigo-500 text-indigo-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Speech to Text
              </button>
              <button
                onClick={() => setAction('text_to_speech')}
                className={`w-full py-2 px-4 rounded-md text-left ${
                  action === 'text_to_speech' 
                    ? 'bg-indigo-100 border-l-4 border-indigo-500 text-indigo-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Text to Speech
              </button>
              <button
                onClick={() => setAction('enhance_audio')}
                className={`w-full py-2 px-4 rounded-md text-left ${
                  action === 'enhance_audio' 
                    ? 'bg-indigo-100 border-l-4 border-indigo-500 text-indigo-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Audio Enhancement
              </button>
              <button
                onClick={() => setAction('process_command')}
                className={`w-full py-2 px-4 rounded-md text-left ${
                  action === 'process_command' 
                    ? 'bg-indigo-100 border-l-4 border-indigo-500 text-indigo-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Voice Commands
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            {action === 'transcribe' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Speech to Text</h2>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-md text-center">
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                  
                  {isRecording && (
                    <div className="mt-2 text-sm text-gray-500">
                      Recording in progress...
                    </div>
                  )}
                  
                  {audioUrl && !isRecording && (
                    <div className="mt-2 text-sm text-gray-500">
                      Recording complete. Ready to transcribe.
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Audio File
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        MP3, WAV, M4A up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
                      Transcription Format
                    </label>
                    <select
                      id="format"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {transcriptionFormats.map((format) => (
                        <option key={format.id} value={format.id}>
                          {format.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="speaker-identification"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="speaker-identification" className="ml-2 block text-sm text-gray-900">
                      Enable speaker identification
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {action === 'text_to_speech' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Text to Speech</h2>
                
                <div className="mb-4">
                  <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                    Text to Convert
                  </label>
                  <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to convert to speech..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="voice" className="block text-sm font-medium text-gray-700 mb-1">
                      Voice
                    </label>
                    <select
                      id="voice"
                      value={voice}
                      onChange={(e) => setVoice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {voiceOptions.map((voiceOption) => (
                        <option key={voiceOption.id} value={voiceOption.id}>
                          {voiceOption.name} ({voiceOption.language})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="speed" className="block text-sm font-medium text-gray-700 mb-1">
                      Speech Rate
                    </label>
                    <select
                      id="speed"
                      value={speed}
                      onChange={(e) => setSpeed(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="0.75">Slow (0.75x)</option>
                      <option value="1.0">Normal (1.0x)</option>
                      <option value="1.25">Fast (1.25x)</option>
                      <option value="1.5">Very Fast (1.5x)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {action === 'enhance_audio' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Audio Enhancement</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Audio File
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload-enhance" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <input id="file-upload-enhance" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        MP3, WAV, M4A up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enhancement Features
                  </label>
                  <div className="space-y-2">
                    {audioFeatures.map((feature) => (
                      <div key={feature.id} className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={feature.id}
                            type="checkbox"
                            checked={selectedFeatures.includes(feature.id)}
                            onChange={() => handleFeatureToggle(feature.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor={feature.id} className="font-medium text-gray-700">
                            {feature.name}
                          </label>
                          <p className="text-gray-500">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {action === 'process_command' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Voice Commands</h2>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-md text-center">
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {isRecording ? 'Stop Listening' : 'Start Listening'}
                  </button>
                  
                  {isRecording && (
                    <div className="mt-2 text-sm text-gray-500">
                      Listening for commands...
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="command" className="block text-sm font-medium text-gray-700 mb-1">
                    Command Text
                  </label>
                  <input
                    type="text"
                    id="command"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a command or use voice input..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Available Commands</h3>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {voiceCommandCategories.slice(0, 2).map((category) => (
                        <div key={category.id}>
                          <h4 className="font-medium text-gray-900 mb-1">{category.name}</h4>
                          <ul className="text-gray-500 space-y-1">
                            {category.commands.slice(0, 3).map((cmd, index) => (
                              <li key={index}>"{cmd.trigger}"</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Process'}
            </button>
          </form>
        </div>
      </div>
      
      {(result || error) && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          {result && action === 'transcribe' && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Transcription</h3>
              <p className="whitespace-pre-wrap">{result.transcription}</p>
            </div>
          )}
          
          {result && action === 'text_to_speech' && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Audio Generated</h3>
              <div className="mt-2">
                <audio controls className="w-full">
                  <source src={result.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
          
          {result && action === 'enhance_audio' && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Enhanced Audio</h3>
              <div className="mt-2">
                <audio controls className="w-full">
                  <source src={result.enhancedAudioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Applied features: {result.appliedFeatures?.join(', ')}
              </div>
            </div>
          )}
          
          {result && action === 'process_command' && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Command Interpretation</h3>
              <p className="whitespace-pre-wrap">{result.interpretation}</p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">About GalaxyVoice</h2>
        <p className="mb-4">
          GalaxyVoice uses advanced AI to convert between speech and text, enhance audio quality, and process voice commands.
          Whether you need to transcribe meetings, create voiceovers, or clean up audio recordings, our tool has you covered.
        </p>
        
        <h3 className="text-lg font-medium mb-2">Features:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>High-accuracy speech recognition in multiple languages</li>
          <li>Natural-sounding text-to-speech with multiple voices</li>
          <li>Audio cleanup and background noise reduction</li>
          <li>Voice command recognition for hands-free operation</li>
          <li>Meeting transcription with speaker identification</li>
        </ul>
        
        <p>
          Get started by selecting a voice tool and uploading your audio or entering text.
        </p>
      </div>
    </div>
  );
}
