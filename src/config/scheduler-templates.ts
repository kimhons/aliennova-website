export const schedulerTemplates = [
  {
    id: "work-day",
    name: "Work Day",
    description: "Optimize your workday with focused blocks and breaks",
    template: {
      morningRoutine: {
        startTime: "08:00",
        duration: 60,
        activities: ["Email review", "Daily planning", "Team check-in"]
      },
      focusBlocks: [
        {
          startTime: "09:30",
          duration: 90,
          priority: "high"
        },
        {
          startTime: "13:00",
          duration: 90,
          priority: "high"
        }
      ],
      breaks: [
        {
          startTime: "11:00",
          duration: 15
        },
        {
          startTime: "12:30",
          duration: 30
        },
        {
          startTime: "15:00",
          duration: 15
        }
      ],
      meetings: {
        preferredTimes: ["11:30", "14:00", "16:00"],
        maxDuration: 60,
        bufferTime: 15
      },
      endOfDay: {
        startTime: "17:00",
        duration: 30,
        activities: ["Task review", "Tomorrow planning"]
      }
    }
  },
  {
    id: "study-session",
    name: "Study Session",
    description: "Structured study time with the Pomodoro technique",
    template: {
      preparation: {
        duration: 15,
        activities: ["Gather materials", "Set goals", "Eliminate distractions"]
      },
      pomodoros: [
        {
          duration: 25,
          breakDuration: 5
        },
        {
          duration: 25,
          breakDuration: 5
        },
        {
          duration: 25,
          breakDuration: 5
        },
        {
          duration: 25,
          breakDuration: 15
        }
      ],
      reviewTime: {
        duration: 20,
        activities: ["Summarize learning", "Create test questions", "Plan next session"]
      }
    }
  },
  {
    id: "project-planning",
    name: "Project Planning",
    description: "Structured approach to planning and kickstarting projects",
    template: {
      vision: {
        duration: 30,
        activities: ["Define objectives", "Identify stakeholders", "Set success criteria"]
      },
      breakdown: {
        duration: 45,
        activities: ["List major deliverables", "Create work breakdown structure", "Identify dependencies"]
      },
      scheduling: {
        duration: 45,
        activities: ["Estimate time requirements", "Assign resources", "Set milestones"]
      },
      riskAssessment: {
        duration: 30,
        activities: ["Identify potential risks", "Plan mitigation strategies", "Create contingency plans"]
      },
      kickoff: {
        duration: 60,
        activities: ["Prepare presentation", "Schedule team meeting", "Distribute responsibilities"]
      }
    }
  },
  {
    id: "wellness-day",
    name: "Wellness Day",
    description: "Balance self-care activities throughout your day",
    template: {
      morningRoutine: {
        startTime: "07:00",
        duration: 60,
        activities: ["Meditation", "Light exercise", "Nutritious breakfast"]
      },
      activeBlocks: [
        {
          startTime: "10:00",
          duration: 45,
          activities: ["Walk", "Yoga", "Swimming"]
        },
        {
          startTime: "15:00",
          duration: 45,
          activities: ["Stretching", "Light cardio", "Dance"]
        }
      ],
      nutritionBlocks: [
        {
          startTime: "08:00",
          meal: "Breakfast"
        },
        {
          startTime: "12:00",
          meal: "Lunch"
        },
        {
          startTime: "16:00",
          meal: "Snack"
        },
        {
          startTime: "19:00",
          meal: "Dinner"
        }
      ],
      mindfulnessBlocks: [
        {
          startTime: "07:00",
          duration: 15,
          activity: "Morning meditation"
        },
        {
          startTime: "13:00",
          duration: 10,
          activity: "Breathing exercises"
        },
        {
          startTime: "21:00",
          duration: 15,
          activity: "Evening reflection"
        }
      ],
      sleepPreparation: {
        startTime: "21:30",
        duration: 30,
        activities: ["Digital detox", "Light reading", "Sleep environment setup"]
      }
    }
  },
  {
    id: "family-time",
    name: "Family Day",
    description: "Quality time with family members of all ages",
    template: {
      morningActivity: {
        startTime: "09:00",
        duration: 120,
        activityTypes: ["Outdoor", "Creative", "Educational"]
      },
      mealTimes: [
        {
          startTime: "12:30",
          duration: 60,
          type: "Lunch"
        },
        {
          startTime: "18:00",
          duration: 60,
          type: "Dinner"
        }
      ],
      afternoonActivity: {
        startTime: "14:00",
        duration: 120,
        activityTypes: ["Games", "Sports", "Cultural"]
      },
      downtime: {
        startTime: "16:30",
        duration: 60,
        activities: ["Reading", "Quiet play", "Rest"]
      },
      eveningActivity: {
        startTime: "19:30",
        duration: 90,
        activityTypes: ["Movie", "Board games", "Storytelling"]
      }
    }
  }
];

export const priorityLevels = [
  {
    id: "critical",
    name: "Critical",
    color: "#FF4136",
    description: "Must be completed today, affects other tasks or people"
  },
  {
    id: "high",
    name: "High",
    color: "#FF851B",
    description: "Important for today's goals, but can be rescheduled if necessary"
  },
  {
    id: "medium",
    name: "Medium",
    color: "#FFDC00",
    description: "Should be completed soon, but has some flexibility"
  },
  {
    id: "low",
    name: "Low",
    color: "#2ECC40",
    description: "Nice to complete if time allows, can be easily rescheduled"
  },
  {
    id: "flexible",
    name: "Flexible",
    color: "#7FDBFF",
    description: "Can be done anytime, no specific deadline"
  }
];

export const timeBlockTypes = [
  {
    id: "focus",
    name: "Deep Focus",
    icon: "brain",
    description: "Uninterrupted time for complex tasks requiring concentration"
  },
  {
    id: "meeting",
    name: "Meeting",
    icon: "users",
    description: "Scheduled discussions with others"
  },
  {
    id: "admin",
    name: "Administrative",
    icon: "tasks",
    description: "Emails, planning, and organizational tasks"
  },
  {
    id: "learning",
    name: "Learning",
    icon: "book",
    description: "Time dedicated to skill development and education"
  },
  {
    id: "wellness",
    name: "Wellness",
    icon: "heart",
    description: "Exercise, meditation, and self-care activities"
  },
  {
    id: "break",
    name: "Break",
    icon: "coffee",
    description: "Rest periods between focused work"
  }
];
