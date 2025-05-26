"use client";

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailIntegration from '@/components/scheduler/EmailIntegration';

// Mock fetch
global.fetch = vi.fn();

describe('EmailIntegration Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the email integration form', () => {
    render(<EmailIntegration />);
    
    expect(screen.getByText('CosmicScheduler Email Integration')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Participants (comma separated)')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Body')).toBeInTheDocument();
    expect(screen.getByText('Send Email Request')).toBeInTheDocument();
  });

  it('handles form submission and displays results', async () => {
    // Mock successful API response
    const mockResponse = {
      success: true,
      meetingId: 'meet-abc123',
      meetingDetails: {
        title: 'Test Meeting',
        description: 'This is a test meeting',
        isVirtual: true
      },
      suggestedTimeSlots: [
        {
          id: 'slot-1',
          startTime: '2025-05-27T10:00:00.000Z',
          endTime: '2025-05-27T10:30:00.000Z',
          score: 90
        },
        {
          id: 'slot-2',
          startTime: '2025-05-28T14:00:00.000Z',
          endTime: '2025-05-28T14:30:00.000Z',
          score: 80
        }
      ],
      participants: ['test@example.com', 'participant@example.com'],
      status: 'pending'
    };
    
    global.fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });
    
    render(<EmailIntegration />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Your Email'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText('Participants (comma separated)'), {
      target: { value: 'participant@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'Test Meeting' }
    });
    
    fireEvent.change(screen.getByLabelText('Email Body'), {
      target: { value: 'This is a test meeting scheduled for tomorrow at 2pm.' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('Send Email Request'));
    
    // Wait for API call and UI update
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/email-scheduler', expect.any(Object));
      expect(screen.getByText('Meeting Request Processed')).toBeInTheDocument();
      expect(screen.getByText('Test Meeting')).toBeInTheDocument();
      expect(screen.getByText('90% match')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock error response
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        error: true,
        message: 'Failed to process email scheduling request'
      }),
    });
    
    render(<EmailIntegration />);
    
    // Fill out minimal required fields
    fireEvent.change(screen.getByLabelText('Your Email'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText('Participants (comma separated)'), {
      target: { value: 'participant@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'Test Meeting' }
    });
    
    fireEvent.change(screen.getByLabelText('Email Body'), {
      target: { value: 'Test body' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('Send Email Request'));
    
    // Wait for API call and error display
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/email-scheduler', expect.any(Object));
      expect(screen.getByText('Error Processing Request')).toBeInTheDocument();
      expect(screen.getByText('Failed to process email scheduling request')).toBeInTheDocument();
    });
  });
});
