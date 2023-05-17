import concepts from "../data/concepts.js";

const rules = [
  {
    concept: concepts[0].concept_name,
    attribute: "Self-Doubt",
    rating: 1,
    action:
      "Maintain your current study habits and continue to attend class regularly",
  },
  {
    concept: concepts[0].concept_name,
    attribute: "Difficulties",
    rating: 2,
    action:
      "Consider seeking academic support, such as tutoring or meeting with your professor during office hours",
  },
  {
    concept: concepts[0].concept_name,  
    attribute: "Difficulties",
    rating: 3,
    action: "Develop a plan to manage your time more effectively and seek out additional academic support resources",
  }, 
  {
    concept: concepts[2].concept_name,
    attribute: "Difficulties",
    rating: 1,
    action:
      "Set Goals Very Carefully",
  },
  {
    concept: concepts[2].concept_name,
    attribute: "Difficulties",
    rating: 2,
    action:
      "Set Goals Very Carefully",
  },
  {
    concept: concepts[2].concept_name,  
    attribute: "Difficulties",
    rating: 3,
    action: "Set Goals Very Carefully",
  }, 
  {
    concept: concepts[2].concept_name,  
    attribute: "Procrastination",
    rating: 1,
    action: "In experiencing minimal procrastination behavior, set small goals that are easily achievable, using positive self-talk to boost their motivation, and breaking their work down into manageable chunks. A concept that may be useful in this context is goal-setting theory, which suggests that setting specific, challenging goals can lead to improved performance and motivation.",
  },
  {
    concept: concepts[0].concept_name,  
    attribute: "Procrastination",
    rating: 2,
    action: "They may benefit from cognitive-behavioral therapy (CBT), which can help them identify and challenge negative thoughts and beliefs that are contributing to their procrastination. CBT is based on the idea that our thoughts, feelings, and behaviors are interconnected and can influence one another",
  },
  {
    concept: concepts[0].concept_name,
    attribute: "Procrastination",
    rating: 3,
    action: "Seek professional help from a therapist or counselor who specializes in working with procrastination and related issues. Some potential approaches that may be used in therapy include mindfulness-based interventions, behavioral activation, and motivational interviewing.",
  },
  {
    concept: concepts[0].concept_name,  
    attribute: "Academic Consistency",
    rating: 1,
    action: "Continue to maintain consistent academic habits and behaviors",
  },
  {
    concept: concepts[0].concept_name,  
    attribute: "Academic Consistency",
    rating: 2,
    action: " Seek out additional academic and emotional support resources.",
  },
  {
    concept: concepts[0].concept_name,  
    attribute: "Academic Consistency",
    rating: 3,
    action: "Seek out additional academic and emotional support resources. 3",
  },
  {
    concept: concepts[0].concept_name,
    attribute: "Online Learning Struggle",
    rating: 1,
    action: "Continue to maintain consistent academic habits and behaviors"
    },
    {
    concept: concepts[0].concept_name,
    attribute: "Online Learning Struggle",
    rating: 2,
    action: "Seek out additional academic and emotional support resources"
    },
    {
    concept: concepts[0].concept_name,
    attribute: "Online Learning Struggle",
    rating: 3,
    action: "Seek out additional academic and emotional support resources and consider reaching out to an academic advisor or counselor for personalized assistance"
    },
    {
      concept: concepts[0].concept_name,
      attribute: "Lacking Peer Support",
      rating: 1,
      action: "Seek out opportunities to connect with classmates, such as online study groups or discussion forums.",
    },
    {
      concept: concepts[0].concept_name,
      attribute: "Lacking Peer Support",
      rating: 2,
      action: "Consider reaching out to your instructor or academic advisor for guidance on how to connect with peers in your course.",
    },
    {
      concept: concepts[0].concept_name,
      attribute: "Lacking Peer Support",
      rating: 3,
      action: "Explore additional resources for building connections with peers outside of the classroom, such as student organizations or social media groups related to your academic interests.",
    },
];


export default rules;
