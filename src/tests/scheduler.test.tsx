"use client";

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SchedulerPage from '../app/(dashboard)/scheduler/page';

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/scheduler',
  }),
}));

// Mock the fetch function
global.fetch = vi.fn();

describe('CosmicScheduler Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    
    // Mock successful fetch response
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        schedule: [
          {
            title: 'Project Work',
            description: 'Focus time for project development',
            startTime: '09:00',
            endTime: '11:00',
            priority: 'high',
            type: 'focus'
          },
          {
            title: 'Team Meeting',
            description: 'Weekly sync with the team',
            startTime: '11:30',
            endTime: '12:30',
            priority: 'medium',
            type: 'meeting'
          }
        ],
        priorityLevels: [
          { id: 'high', name: 'High', color: '#FF851B' },
          { id: 'medium', name: 'Medium', color: '#FFDC00' }
        ],
        timeBlockTypes: [
          { id: 'focus', name: 'Deep Focus', icon: 'brain' },
          { id: 'meeting', name: 'Meeting', icon: 'users' }
        ]
      }),
    });
  });

  it('renders the scheduler form correctly', () => {
    render(<SchedulerPage />);
    
    // Check for main elements
    expect(screen.getByText('CosmicScheduler')).toBeInTheDocument();
    expect(screen.getByLabelText('Schedule Template')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Scheduling Request')).toBeInTheDocument();
    expect(screen.getByText('Generate Schedule')).toBeInTheDocument();
  });

  it('submits the form and displays a schedule', async () => {
    render(<SchedulerPage />);
    
    // Fill out the form
    const textArea = screen.getByLabelText('Scheduling Request');
    fireEvent.change(textArea, { target: { value: 'I need to work on my project for 3 hours and have a team meeting at 11:30 AM.' } });
    
    // Submit the form
    const submitButton = screen.getByText('Generate Schedule');
    fireEvent.click(submitButton);
    
    // Check loading state
    expect(screen.getByText('Generating Schedule...')).toBeInTheDocument();
    
    // Wait for the schedule to be displayed
    await waitFor(() => {
      expect(screen.getByText('Your Optimized Schedule')).toBeInTheDocument();
      expect(screen.getByText('Project Work')).toBeInTheDocument();
      expect(screen.getByText('Team Meeting')).toBeInTheDocument();
    });
    
    // Verify fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith('/api/scheduler', expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: expect.any(String),
    }));
  });

  it('handles API errors gracefully', async () => {
    // Mock error response
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Failed to generate schedule' }),
    });
    
    render(<SchedulerPage />);
    
    // Fill out and submit the form
    const textArea = screen.getByLabelText('Scheduling Request');
    fireEvent.change(textArea, { target: { value: 'Test request' } });
    
    const submitButton = screen.getByText('Generate Schedule');
    fireEvent.click(submitButton);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to generate schedule')).toBeInTheDocument();
    });
  });

  it('allows creating another schedule after one is generated', async () => {
    render(<SchedulerPage />);
    
    // Fill out and submit the form
    const textArea = screen.getByLabelText('Scheduling Request');
    fireEvent.change(textArea, { target: { value: 'Test request' } });
    
    const submitButton = screen.getByText('Generate Schedule');
    fireEvent.click(submitButton);
    
    // Wait for the schedule to be displayed
    await waitFor(() => {
      expect(screen.getByText('Your Optimized Schedule')).toBeInTheDocument();
    });
    
    // Click the "Create Another Schedule" button
    const createAnotherButton = screen.getByText('Create Another Schedule');
    fireEvent.click(createAnotherButton);
    
    // Verify we're back to the form view
    await waitFor(() => {
      expect(screen.queryByText('Your Optimized Schedule')).not.toBeInTheDocument();
      expect(screen.getByText('No Schedule Generated Yet')).toBeInTheDocument();
    });
  });
});
