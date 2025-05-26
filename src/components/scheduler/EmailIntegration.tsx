"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmailIntegrationComponent() {
  const [emailSetup, setEmailSetup] = useState({
    emailAddress: '',
    subject: '',
    body: '',
    participants: '',
    date: '',
    time: '',
    duration: '30',
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('compose');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailSetup(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Format participants as array
      const participantsList = emailSetup.participants
        .split(',')
        .map(email => email.trim())
        .filter(email => email);
      
      // Prepare preferred dates
      const preferredDate = emailSetup.date ? new Date(emailSetup.date) : new Date();
      if (emailSetup.time) {
        const [hours, minutes] = emailSetup.time.split(':');
        preferredDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      }
      
      const response = await fetch('/api/email-scheduler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: emailSetup.emailAddress,
          subject: emailSetup.subject,
          body: emailSetup.body,
          participants: participantsList,
          preferredDates: [preferredDate.toISOString()],
          duration: parseInt(emailSetup.duration, 10)
        }),
      });
      
      const data = await response.json();
      setResult(data);
      setActiveTab('result');
    } catch (error) {
      console.error('Error scheduling via email:', error);
      setResult({
        error: true,
        message: 'Failed to process email scheduling request'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">CosmicScheduler Email Integration</h1>
      <p className="text-gray-600 mb-8">
        Schedule meetings by email with AI-powered time suggestions and calendar integration.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="compose">Compose Email</TabsTrigger>
          <TabsTrigger value="result" disabled={!result}>View Result</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Meeting via Email</CardTitle>
              <CardDescription>
                Simulate sending an email to schedule a meeting. In a real implementation, 
                you would send an email to schedule@aliennova.com.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailAddress">Your Email</Label>
                    <Input 
                      id="emailAddress"
                      name="emailAddress"
                      placeholder="your.email@example.com"
                      value={emailSetup.emailAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="participants">Participants (comma separated)</Label>
                    <Input 
                      id="participants"
                      name="participants"
                      placeholder="participant1@example.com, participant2@example.com"
                      value={emailSetup.participants}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject"
                    name="subject"
                    placeholder="Meeting about project status"
                    value={emailSetup.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="body">Email Body</Label>
                  <Textarea 
                    id="body"
                    name="body"
                    placeholder="I'd like to schedule a meeting to discuss our project status. I'm available on Monday at 2pm or Tuesday morning."
                    value={emailSetup.body}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input 
                      id="date"
                      name="date"
                      type="date"
                      value={emailSetup.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input 
                      id="time"
                      name="time"
                      type="time"
                      value={emailSetup.time}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input 
                      id="duration"
                      name="duration"
                      type="number"
                      min="15"
                      step="15"
                      value={emailSetup.duration}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Processing...' : 'Send Email Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="result">
          {result && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {result.error ? 'Error Processing Request' : 'Meeting Request Processed'}
                </CardTitle>
                <CardDescription>
                  {result.error ? 'There was an error processing your request.' : 'Your email has been processed and meeting invitations will be sent.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result.error ? (
                  <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-red-800">{result.message}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Meeting Details</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p><span className="font-medium">Meeting ID:</span> {result.meetingId}</p>
                        <p><span className="font-medium">Title:</span> {result.meetingDetails?.title}</p>
                        <p><span className="font-medium">Description:</span> {result.meetingDetails?.description}</p>
                        <p><span className="font-medium">Type:</span> {result.meetingDetails?.isVirtual ? 'Virtual Meeting' : 'In-person Meeting'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Suggested Time Slots</h3>
                      <div className="space-y-2">
                        {result.suggestedTimeSlots?.map((slot, index) => (
                          <div key={slot.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                            <div>
                              <p className="font-medium">Option {index + 1}</p>
                              <p>{new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleTimeString()}</p>
                            </div>
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                              {slot.score}% match
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Participants</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <ul className="list-disc list-inside">
                          {result.participants?.map((participant, index) => (
                            <li key={index}>{participant}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={() => setActiveTab('compose')} variant="outline" className="mr-2">
                  Back to Email Form
                </Button>
                {!result.error && (
                  <Button>View in Calendar</Button>
                )}
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How Email Scheduling Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="text-blue-600 font-bold text-lg mb-2">1. Send Email</div>
            <p>Send an email to schedule@aliennova.com with your meeting details, participants, and preferred times.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="text-blue-600 font-bold text-lg mb-2">2. AI Processing</div>
            <p>Our AI analyzes calendars and suggests optimal meeting times based on everyone's availability.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="text-blue-600 font-bold text-lg mb-2">3. Automatic Scheduling</div>
            <p>Participants select preferences, and the system finalizes the meeting and adds it to everyone's calendars.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
