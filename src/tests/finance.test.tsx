"use client";

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FinancePage from '../app/(dashboard)/finance/page';

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/finance',
  }),
}));

// Mock the fetch function
global.fetch = vi.fn();

describe('StarFinance Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    
    // Mock successful fetch response
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        analysis: 'Your spending is primarily in the housing and food categories. Consider reducing dining out expenses to improve savings.',
        categories: [],
        action: 'analyze_expenses'
      }),
    });
  });

  it('renders the finance form correctly', () => {
    render(<FinancePage />);
    
    // Check for main elements
    expect(screen.getByText('StarFinance')).toBeInTheDocument();
    // Use getAllByText for elements that might appear multiple times
    expect(screen.getAllByText('Expense Analysis')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Budget Creation')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Financial Goal Planning')[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Financial Advice' })).toBeInTheDocument();
  });

  it('switches between different financial tools', () => {
    render(<FinancePage />);
    
    // Check that expense analysis is active by default
    expect(screen.getByText('Add Expenses')).toBeInTheDocument();
    
    // Switch to budget creation
    fireEvent.click(screen.getAllByText('Budget Creation')[0]);
    expect(screen.getByLabelText('Monthly Income ($)')).toBeInTheDocument();
    expect(screen.getByLabelText('Budget Template')).toBeInTheDocument();
    
    // Switch to goal planning
    fireEvent.click(screen.getAllByText('Financial Goal Planning')[0]);
    expect(screen.getByLabelText('Financial Goal')).toBeInTheDocument();
    expect(screen.getByLabelText('Current Savings ($)')).toBeInTheDocument();
    expect(screen.getByLabelText('Monthly Contribution ($)')).toBeInTheDocument();
    expect(screen.getByLabelText('Goal Timeframe (months)')).toBeInTheDocument();
  });

  it('adds and removes expenses', () => {
    render(<FinancePage />);
    
    // Select a category
    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'food' } });
    
    // Enter an amount
    const amountInput = screen.getByLabelText('Amount ($)');
    fireEvent.change(amountInput, { target: { value: '50' } });
    
    // Add the expense
    fireEvent.click(screen.getByRole('button', { name: 'Add Expense' }));
    
    // Check that the expense was added - use a more flexible approach
    // Look for elements that contain the text rather than exact matches
    const tableRows = screen.getAllByRole('row');
    const foodRow = tableRows.find(row => row.textContent.includes('Food'));
    expect(foodRow).toBeTruthy();
    expect(foodRow.textContent).toContain('50');
    
    // Remove the expense - find the remove button within the row
    const removeButton = screen.getByRole('button', { name: 'Remove' });
    fireEvent.click(removeButton);
    
    // Check that the expense was removed
    expect(screen.queryByText('$50.00')).not.toBeInTheDocument();
  });

  it('submits expense analysis and displays results', async () => {
    render(<FinancePage />);
    
    // Add an expense
    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'food' } });
    
    const amountInput = screen.getByLabelText('Amount ($)');
    fireEvent.change(amountInput, { target: { value: '50' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Add Expense' }));
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Generate Financial Advice' });
    fireEvent.click(submitButton);
    
    // Check loading state
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    
    // Wait for the analysis to be displayed
    await waitFor(() => {
      expect(screen.getByText('Your spending is primarily in the housing and food categories. Consider reducing dining out expenses to improve savings.')).toBeInTheDocument();
    });
    
    // Verify fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith('/api/finance', expect.objectContaining({
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
      json: async () => ({ error: 'Failed to process financial request' }),
    });
    
    render(<FinancePage />);
    
    // Add an expense and submit
    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'food' } });
    
    const amountInput = screen.getByLabelText('Amount ($)');
    fireEvent.change(amountInput, { target: { value: '50' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Add Expense' }));
    fireEvent.click(screen.getByRole('button', { name: 'Generate Financial Advice' }));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to process financial request')).toBeInTheDocument();
    });
  });

  it('submits budget creation form correctly', async () => {
    // Mock budget creation response
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        budget: 'Based on your income of $3000, here is your recommended 50/30/20 budget:\n- Needs (50%): $1500\n- Wants (30%): $900\n- Savings (20%): $600',
        template: '50-30-20',
        categories: [],
        action: 'create_budget'
      }),
    });
    
    render(<FinancePage />);
    
    // Switch to budget creation
    fireEvent.click(screen.getAllByText('Budget Creation')[0]);
    
    // Fill out the form
    const incomeInput = screen.getByLabelText('Monthly Income ($)');
    fireEvent.change(incomeInput, { target: { value: '3000' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Generate Financial Advice' }));
    
    // Wait for the budget to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Based on your income of \$3000/)).toBeInTheDocument();
    });
  });
});
