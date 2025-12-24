// NOTE: AI generation mocked for demo purposes

export const generateGuideSummary = async (guideId: string, steps: any[]) => {
  if (steps.length === 0) {
    return "This guide currently has no steps.";
  }

  const count = steps.length;
  const topics = ["deployment", "configuration", "user onboarding", "troubleshooting", "installation"];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  return `This guide contains ${count} steps covering ${randomTopic}. It walks the user through the process, ensuring all necessary configurations are met. Follow the steps sequentially for best results.`;
};

export const generateProjectSummary = async (projectId: string, feedback: any[]) => {
  if (feedback.length === 0) {
    return "No feedback has been collected for this project yet. Start gathering user feedback to generate insights.";
  }

  const count = feedback.length;
  const sentiments = ["positive", "mixed", "constructive", "enthusiastic"];
  const themes = ["user experience", "feature requests", "bug reports", "performance concerns", "design feedback"];
  
  const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];

  return `Based on ${count} feedback item${count > 1 ? 's' : ''}, the overall sentiment appears ${randomSentiment}. Key themes include ${randomTheme}. Consider prioritizing these insights in your next iteration to improve user satisfaction.`;
};
