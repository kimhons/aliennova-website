"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { expenseCategories, budgetTemplates, financialGoalTypes } from '@/config/finance-config';

// Define request data interface
interface RequestData {
  action: string;
  data?: {
    expenses?: Expense[];
    timeframe?: string;
    income?: number;
    template?: string;
    goals?: string[];
    goal?: string;
    currentSavings?: number;
    monthlyContribution?: number;
  };
}

// Define expense type
interface Expense {
  category: string;
  subcategory: string;
  amount: string;
  description: string;
}

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('analyze_expenses');
  const [income, setIncome] = useState('');
  
  // State for expense tracking
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentExpense, setCurrentExpense] = useState<Expense>({ category: '', subcategory: '', amount: '', description: '' });
  const [template, setTemplate] = useState('50-30-20');
  const [goal, setGoal] = useState('emergency-fund');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Get subcategories for selected category
  const getSubcategories = (categoryId: string) => {
    const category = expenseCategories.find(cat => cat.id === categoryId);
    return category ? category.subcategories : [];
  };

  const handleAddExpense = () => {
    if (currentExpense.category && currentExpense.amount) {
      setExpenses([...expenses, { ...currentExpense }]);
      setCurrentExpense({ category: '', subcategory: '', amount: '', description: '' });
    }
  };

  const handleRemoveExpense = (index: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let requestData: RequestData = { action };
      
      // Prepare data based on selected action
      switch (action) {
        case 'analyze_expenses':
          requestData.data = {
            expenses,
            timeframe: 'monthly'
          };
          break;
          
        case 'create_budget':
          requestData.data = {
            income: parseFloat(income),
            expenses,
            template,
            goals: [goal]
          };
          break;
          
        case 'goal_planning':
          requestData.data = {
            goal,
            currentSavings: parseFloat(currentSavings),
            monthlyContribution: parseFloat(monthlyContribution),
            timeframe
          };
          break;
      }
      
      const response = await fetch('/api/finance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        switch (action) {
          case 'analyze_expenses':
            setResult(data.analysis);
            break;
            
          case 'create_budget':
            setResult(data.budget);
            break;
            
          case 'goal_planning':
            setResult(data.plan);
            break;
        }
      } else {
        setError(data.error || 'Failed to process financial request');
      }
    } catch (err) {
      setError('An error occurred during financial analysis');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-amber-800">StarFinance</h1>
      <p className="mb-8 text-gray-600">
        Personal finance assistant that helps with budgeting, expense tracking, and financial planning.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Financial Tools</h2>
            <div className="space-y-2">
              <button
                onClick={() => setAction('analyze_expenses')}
                className={`w-full py-2 px-4 rounded-md text-left ${
                  action === 'analyze_expenses' 
                    ? 'bg-amber-100 border-l-4 border-amber-500 text-amber-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Expense Analysis
              </button>
              <button
                onClick={() => setAction('create_budget')}
                className={`w-full py-2 px-4 rounded-md text-left ${
                  action === 'create_budget' 
                    ? 'bg-amber-100 border-l-4 border-amber-500 text-amber-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Budget Creation
              </button>
              <button
                onClick={() => setAction('goal_planning')}
                className={`w-full py-2 px-4 rounded-md text-left ${
                  action === 'goal_planning' 
                    ? 'bg-amber-100 border-l-4 border-amber-500 text-amber-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Financial Goal Planning
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            {action === 'analyze_expenses' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Expense Analysis</h2>
                
                <div className="mb-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Add Expenses</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        value={currentExpense.category}
                        onChange={(e) => setCurrentExpense({
                          ...currentExpense,
                          category: e.target.value,
                          subcategory: ''
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="">Select...</option>
                        {expenseCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                        Subcategory
                      </label>
                      <select
                        id="subcategory"
                        value={currentExpense.subcategory}
                        onChange={(e) => setCurrentExpense({
                          ...currentExpense,
                          subcategory: e.target.value
                        })}
                        disabled={!currentExpense.category}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="">Select...</option>
                        {currentExpense.category && getSubcategories(currentExpense.category).map((subcategory) => (
                          <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount ($)
                      </label>
                      <input
                        type="number"
                        id="amount"
                        value={currentExpense.amount}
                        onChange={(e) => setCurrentExpense({
                          ...currentExpense,
                          amount: e.target.value
                        })}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={handleAddExpense}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        Add Expense
                      </button>
                    </div>
                  </div>
                </div>
                
                {expenses.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Expense List</h3>
                    <div className="bg-gray-50 rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {expenses.map((expense, index) => {
                            const category = expenseCategories.find(cat => cat.id === expense.category);
                            const subcategory = category?.subcategories.find(sub => sub.id === expense.subcategory);
                            
                            return (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {category?.name} {subcategory ? `- ${subcategory.name}` : ''}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  ${parseFloat(expense.amount).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveExpense(index)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {action === 'create_budget' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Budget Creation</h2>
                
                <div className="mb-4">
                  <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Income ($)
                  </label>
                  <input
                    type="number"
                    id="income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Template
                  </label>
                  <select
                    id="template"
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  >
                    {budgetTemplates.map((budgetTemplate) => (
                      <option key={budgetTemplate.id} value={budgetTemplate.id}>
                        {budgetTemplate.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    {budgetTemplates.find(t => t.id === template)?.description}
                  </p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Financial Goal
                  </label>
                  <select
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  >
                    {financialGoalTypes.map((goalType) => (
                      <option key={goalType.id} value={goalType.id}>
                        {goalType.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {action === 'goal_planning' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Financial Goal Planning</h2>
                
                <div className="mb-4">
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
                    Financial Goal
                  </label>
                  <select
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  >
                    {financialGoalTypes.map((goalType) => (
                      <option key={goalType.id} value={goalType.id}>
                        {goalType.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="currentSavings" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Savings ($)
                  </label>
                  <input
                    type="number"
                    id="currentSavings"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Contribution ($)
                  </label>
                  <input
                    type="number"
                    id="monthlyContribution"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Timeframe (months)
                  </label>
                  <input
                    type="number"
                    id="timeframe"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    placeholder="12"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
              </div>
            )}
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
              </div>
            )}
            
            {result && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="text-lg font-medium mb-2 text-green-800">Results</h3>
                <p className="whitespace-pre-wrap">{result}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 "
            >
              {loading ? 'Processing...' : 'Generate Financial Advice'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">About StarFinance</h2>
        <p className="mb-4">
          StarFinance uses advanced AI to help you manage your finances effectively. Whether you need to analyze your spending, create a budget, or plan for financial goals, our tool provides personalized guidance.
        </p>
        <h3 className="text-lg font-medium mb-2">Features:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Expense categorization and pattern recognition</li>
          <li>Budget recommendations based on spending habits</li>
          <li>Savings goals and progress tracking</li>
          <li>Bill payment reminders</li>
          <li>Basic investment insights and recommendations</li>
        </ul>
        <p>Get started by selecting a financial tool and entering your information.</p>
      </div>
    </div>
  );
}
