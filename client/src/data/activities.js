import concepts from "../data/concepts.js";

const activities = [
  {
    activity: "Difficulties "+"Self Efficacy",
    attribute: "Difficulties",
    concept: "Self Efficacy",
    description:
      "1. Identify the difficulty or challenge. \n2. Break it down into smaller, manageable tasks.\n3. Create a plan to tackle each task.\n4. Take action and work on each task one by one.\n5. Evaluate your progress and adjust your plan as needed.",
    status: "active"
  },
  {
    activity: "Procrastination "+"Cognitive Therapy",
    attribute: "Procrastination",
    concept: "Cognitive Therapy",
    description:
      "1. Identify tasks that you are avoiding or delaying.\n2. Explore the thoughts or fears contributing to the procrastination.\n3. Challenge these thoughts and replace them with positive affirmations.\n4. Use time management strategies such as setting deadlines or using a planner.\n5. Reflect on your progress and adjust your strategies as needed.",
    status: "active"
  },
  {
    activity: "Social Withdrawal"+"Behavior Therapy",
    attribute: "Social Withdrawal",
    concept: "Behavior Therapy",
    description:
      "1. Identify social situations you tend to avoid.\n2. Gradually expose yourself to these situations, starting with less intimidating ones.\n3. Participate in group study sessions or extracurricular activities.\n4. Reflect on your experiences and feelings after each activity.\n5. Keep practicing social exposure and reward yourself for your efforts.",
    status: "active"
  },
  //
  {
    activity: "Lack of Task Completion"+"Person-Centered Therapy",
    attribute: "Lack of Task Completion",
    concept: "Person-Centered Therapy",
    description:
      "1. Reflect on why some tasks are left incomplete.\n2. Identify personal interests and motivations.\n3. Set realistic goals aligned with your motivations.\n4. Create a plan to achieve your goals, including task completion steps.\n5. Continually assess your progress, and adapt your plan as necessary.",
    status: "active"
  },
  {
    activity: "Inconsistent Attendance"+"Solution-Focused Brief Therapy",
    attribute: "Inconsistent Attendance",
    concept: "Solution-Focused Brief Therapy",
    description:
      "1. Acknowledge the problem with attendance.\n2. Visualize what consistent attendance would look like.\n3. Identify small steps that can be taken towards improved attendance.\n4. Commit to these steps and implement them.\n5. Continuously review your progress and celebrate successes.",
    status: "active"
  },
  //
  {
    activity: "Feeling Overwhelmed"+"Cognitive-Behavioral Therapy",
    attribute: "Feeling Overwhelmed",
    concept: "Cognitive-Behavioral Therapy",
    description:
      "1. Identify tasks or responsibilities that are causing overwhelm.\n2. Break large tasks into smaller, more manageable pieces.\n3. Use stress management techniques, such as deep breathing or mindfulness.\n4. Regularly review and adjust your workload.\n5. Seek support when needed and celebrate your successes.",
    status: "active"
  },
  {
    activity: "Lack of Personal Time"+"Psychoanalysis",
    attribute: "Lack of Personal Time",
    concept: "Psychoanalysis",
    description:
      "1. Reflect on reasons why personal time might be neglected.\n2. Identify activities you enjoy and find relaxing.\n3. Schedule regular time for these activities, treating them as non-negotiable appointments.\n4. Explore underlying issues or beliefs that may be causing the neglect of personal time.\n5. Continually reassess your progress and the balance between work and personal time.",
    status: "active"
  },
//  
{
  activity: "Uncertainty about Future"+"Existential Therapy",
  attribute: "Uncertainty about Future",
  concept: "Existential Therapy",
  description:
    "1. Reflect on your fears about the future.\n2. Recognize that uncertainty is a part of life and it's okay not to have all the answers.\n3. Explore personal values and how they align with future goals.\n4. Create a plan that respects these values and goals, accepting that adjustments may be necessary.\n5. Revisit and revise this plan as you continue to grow and learn.",
  status: "active"
},
{
  activity: "Frequent Major Switching"+"Gestalt Therapy",
  attribute: "Frequent Major Switching",
  concept: "Gestalt Therapy",
  description:
    "1. Reflect on your academic decisions and patterns.\n2. Consider the reasons for frequently changing majors.\n3. Focus on the present moment and your current interests and goals.\n4. Make a decision based on these current factors, rather than future fears or past mistakes.\n5. Regularly review your academic path, making adjustments as necessary.",
  status: "active"
}

];

activities.forEach(activity => {
  activity.title =  `${activity.attribute} with ${activity.concept} Concept`;
});


export default activities;
