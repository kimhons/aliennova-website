export const expenseCategories = [
  {
    id: "housing",
    name: "Housing",
    icon: "home",
    subcategories: [
      { id: "rent", name: "Rent/Mortgage" },
      { id: "utilities", name: "Utilities" },
      { id: "maintenance", name: "Maintenance & Repairs" },
      { id: "insurance", name: "Home Insurance" },
      { id: "property-tax", name: "Property Tax" }
    ]
  },
  {
    id: "transportation",
    name: "Transportation",
    icon: "car",
    subcategories: [
      { id: "car-payment", name: "Car Payment" },
      { id: "fuel", name: "Fuel" },
      { id: "maintenance", name: "Maintenance & Repairs" },
      { id: "insurance", name: "Auto Insurance" },
      { id: "public-transit", name: "Public Transportation" },
      { id: "rideshare", name: "Rideshare/Taxi" }
    ]
  },
  {
    id: "food",
    name: "Food",
    icon: "utensils",
    subcategories: [
      { id: "groceries", name: "Groceries" },
      { id: "dining", name: "Dining Out" },
      { id: "delivery", name: "Food Delivery" },
      { id: "coffee", name: "Coffee & Snacks" }
    ]
  },
  {
    id: "health",
    name: "Health & Wellness",
    icon: "heartbeat",
    subcategories: [
      { id: "insurance", name: "Health Insurance" },
      { id: "medical", name: "Medical Bills" },
      { id: "pharmacy", name: "Pharmacy" },
      { id: "fitness", name: "Fitness & Gym" },
      { id: "mental", name: "Mental Health" }
    ]
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "film",
    subcategories: [
      { id: "streaming", name: "Streaming Services" },
      { id: "events", name: "Events & Concerts" },
      { id: "hobbies", name: "Hobbies" },
      { id: "travel", name: "Travel & Vacations" }
    ]
  },
  {
    id: "personal",
    name: "Personal",
    icon: "user",
    subcategories: [
      { id: "clothing", name: "Clothing & Accessories" },
      { id: "beauty", name: "Beauty & Grooming" },
      { id: "education", name: "Education" },
      { id: "gifts", name: "Gifts & Donations" }
    ]
  },
  {
    id: "debt",
    name: "Debt & Loans",
    icon: "credit-card",
    subcategories: [
      { id: "credit-card", name: "Credit Card Payments" },
      { id: "student-loans", name: "Student Loans" },
      { id: "personal-loans", name: "Personal Loans" },
      { id: "other-debt", name: "Other Debt" }
    ]
  },
  {
    id: "savings",
    name: "Savings & Investments",
    icon: "piggy-bank",
    subcategories: [
      { id: "emergency", name: "Emergency Fund" },
      { id: "retirement", name: "Retirement" },
      { id: "investments", name: "Investments" },
      { id: "goals", name: "Savings Goals" }
    ]
  },
  {
    id: "income",
    name: "Income",
    icon: "dollar-sign",
    subcategories: [
      { id: "salary", name: "Salary & Wages" },
      { id: "freelance", name: "Freelance & Side Hustles" },
      { id: "investments", name: "Investment Income" },
      { id: "other", name: "Other Income" }
    ]
  }
];

export const budgetTemplates = [
  {
    id: "50-30-20",
    name: "50/30/20 Budget",
    description: "50% needs, 30% wants, 20% savings and debt repayment",
    allocation: {
      needs: 0.5,
      wants: 0.3,
      savings: 0.2
    },
    categories: {
      needs: ["housing", "transportation", "food", "health", "debt"],
      wants: ["entertainment", "personal"],
      savings: ["savings"]
    }
  },
  {
    id: "zero-based",
    name: "Zero-Based Budget",
    description: "Every dollar has a purpose, with income minus expenses equal to zero",
    steps: [
      "List all income sources",
      "List all necessary expenses",
      "Allocate remaining funds to goals",
      "Adjust until income minus expenses equals zero"
    ]
  },
  {
    id: "envelope",
    name: "Envelope System",
    description: "Allocate cash to different spending categories",
    categories: expenseCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      percentage: 0 // To be customized by user
    }))
  },
  {
    id: "pay-yourself-first",
    name: "Pay Yourself First",
    description: "Set aside savings before expenses",
    steps: [
      "Determine savings rate (recommended 10-20%)",
      "Automatically transfer to savings with each paycheck",
      "Budget remaining income for expenses"
    ],
    recommendedSavingsRate: 0.15
  },
  {
    id: "debt-snowball",
    name: "Debt Snowball",
    description: "Focus on paying off smallest debts first",
    steps: [
      "List all debts from smallest to largest",
      "Make minimum payments on all debts",
      "Put extra money toward smallest debt",
      "Once smallest is paid off, roll payment to next smallest"
    ]
  }
];

export const financialGoalTypes = [
  {
    id: "emergency-fund",
    name: "Emergency Fund",
    description: "3-6 months of essential expenses for unexpected events",
    recommendedAmount: "3-6 months of expenses",
    priority: "high"
  },
  {
    id: "debt-repayment",
    name: "Debt Repayment",
    description: "Pay off high-interest debt",
    recommendedAmount: "Total debt amount",
    priority: "high"
  },
  {
    id: "retirement",
    name: "Retirement Savings",
    description: "Long-term savings for retirement",
    recommendedAmount: "15% of income",
    priority: "high"
  },
  {
    id: "home-purchase",
    name: "Home Purchase",
    description: "Down payment for a home",
    recommendedAmount: "20% of home price",
    priority: "medium"
  },
  {
    id: "education",
    name: "Education Fund",
    description: "Savings for education expenses",
    recommendedAmount: "Varies by education goals",
    priority: "medium"
  },
  {
    id: "vacation",
    name: "Vacation Fund",
    description: "Savings for travel and vacations",
    recommendedAmount: "Estimated trip cost",
    priority: "low"
  },
  {
    id: "major-purchase",
    name: "Major Purchase",
    description: "Saving for a significant purchase",
    recommendedAmount: "Full purchase price",
    priority: "low"
  }
];
