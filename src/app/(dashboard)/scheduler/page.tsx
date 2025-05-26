"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailIntegration from '@/components/scheduler/EmailIntegration';

export default function SchedulerPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">CosmicScheduler</h1>
      <p className="text-gray-600 mb-8">
        AI-powered calendar and scheduling assistant that helps you manage your time efficiently.
      </p>
      
      <Tabs defaultValue="schedule">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="schedule">Schedule Creator</TabsTrigger>
          <TabsTrigger value="email">Email Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Create Your Schedule</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule Template
                </label>
                <select
                  id="template"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="work">Work Day</option>
                  <option value="study">Study Session</option>
                  <option value="project">Project Planning</option>
                  <option value="wellness">Wellness Day</option>
                  <option value="family">Family Day</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                  Scheduling Request
                </label>
                <textarea
                  id="prompt"
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe your scheduling needs, e.g., 'I need to work on my project for 3 hours, have a team meeting at 2pm, and find time for a 30-minute workout.'"
                ></textarea>
              </div>
              
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Schedule
              </button>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">No Schedule Generated Yet</h3>
              <p className="text-gray-500">Fill out the form to create your optimized schedule</p>
            </div>
          </div>
          
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">About CosmicScheduler</h2>
            <p className="mb-4">
              CosmicScheduler uses advanced AI to help you organize your time effectively. Whether you're planning a workday, study session, or family activities, our tool creates optimized schedules tailored to your needs.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Smart scheduling with AI that understands natural language inputs</li>
              <li>Conflict detection and resolution suggestions</li>
              <li>Priority-based task organization</li>
              <li>Time blocking recommendations based on productivity patterns</li>
              <li>Multiple templates for different scheduling needs</li>
            </ul>
            
            <p className="mt-4 text-gray-600">
              Get started by selecting a template and describing your scheduling needs in natural language.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="email">
          <EmailIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
}
