"use client";

import { NextRequest, NextResponse } from "next/server";
import { expenseCategories, budgetTemplates, financialGoalTypes } from "@/config/finance-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    // Initialize OpenAI client at request time, not module level
    const { OpenAI } = await import("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });

    if (!openai.apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    let systemMessage = "";
    let userMessage = "";
    let result = {};

    // Handle different finance actions
    switch (action) {
      case "analyze_expenses":
        const { expenses, timeframe } = data;
        
        systemMessage = `You are StarFinance, an AI-powered personal finance assistant.
        Your task is to analyze the user's expenses and provide insights and recommendations.
        
        Analyze the expenses for patterns, unusual spending, and opportunities for savings.
        Group expenses by category and identify the top spending areas.
        Compare spending to typical budget recommendations.
        Provide actionable recommendations for improving financial health.`;
        
        userMessage = `Please analyze my expenses for ${timeframe || 'the past month'}: ${JSON.stringify(expenses)}`;
        break;
        
      case "create_budget":
        const { income, expenses: budgetExpenses, template, goals } = data;
        
        const selectedTemplate = budgetTemplates.find(t => t.id === template) || 
          budgetTemplates.find(t => t.id === "50-30-20");
        
        systemMessage = `You are StarFinance, an AI-powered personal finance assistant.
        Your task is to create a personalized budget based on the user's income, expenses, and financial goals.
        
        Budget Template: ${selectedTemplate ? JSON.stringify(selectedTemplate) : "Standard budget"}
        
        Create a detailed budget that allocates income to different expense categories.
        Ensure the budget accounts for all necessary expenses while working toward financial goals.
        Provide specific dollar amounts for each category based on the selected template.
        Include savings allocations and debt repayment strategies if applicable.`;
        
        userMessage = `Please create a budget with monthly income of $${income} and these expense categories: ${JSON.stringify(budgetExpenses)}. My financial goals are: ${JSON.stringify(goals)}`;
        break;
        
      case "goal_planning":
        const { goal, currentSavings, timeframe: goalTimeframe, monthlyContribution } = data;
        
        const selectedGoal = financialGoalTypes.find(g => g.id === goal) || 
          financialGoalTypes.find(g => g.id === "emergency-fund");
        
        systemMessage = `You are StarFinance, an AI-powered personal finance assistant.
        Your task is to create a plan for achieving the user's financial goal.
        
        Goal Type: ${selectedGoal ? selectedGoal.name : "Custom financial goal"}
        
        Create a detailed plan with specific milestones and timelines.
        Calculate the required monthly contributions to reach the goal within the specified timeframe.
        Provide strategies for increasing savings or accelerating progress toward the goal.
        Include potential obstacles and how to overcome them.`;
        
        userMessage = `I want to plan for ${selectedGoal ? selectedGoal.name : goal} with current savings of $${currentSavings}. I can contribute $${monthlyContribution} monthly and want to achieve this goal in ${goalTimeframe}.`;
        break;
        
      default:
        return NextResponse.json(
          { error: "Invalid finance action specified" },
          { status: 400 }
        );
    }

    // Generate the finance advice using AI
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage }
      ],
      temperature: 0.5,
      max_tokens: 2000,
    });

    // Extract the generated content
    const generatedContent = response.choices[0].message.content || "";

    // Format the response based on the action
    switch (action) {
      case "analyze_expenses":
        result = {
          analysis: generatedContent,
          categories: expenseCategories,
          action: "analyze_expenses"
        };
        break;
        
      case "create_budget":
        result = {
          budget: generatedContent,
          template: data.template,
          categories: expenseCategories,
          action: "create_budget"
        };
        break;
        
      case "goal_planning":
        result = {
          plan: generatedContent,
          goal: data.goal,
          action: "goal_planning"
        };
        break;
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error in finance API:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during financial analysis" },
      { status: 500 }
    );
  }
}
