import concepts from "../data/concepts.js";

const rules = [
//
  {
    concept: "Self Efficacy",
    attribute: "Procrastination",
    action: "Explore and challenge the thoughts that lead to procrastination. Implement time management strategies."
  },
  {
    concept: "Behavior Therapy",
    attribute: "Social Withdrawal",
    action: "Encourage participation in group study sessions or extracurricular activities to foster social interaction."
  },
//
{
  concept: "Person-Centered Therapy",
  attribute: "Lack of Task Completion",
  action: "Facilitate an environment for self-discovery and personal growth. Help the student identify and tap into their intrinsic motivation."
},
{
  concept: "Solution-Focused Brief Therapy",
  attribute: "Inconsistent Attendance",
  action: "Focus on identifying the student's goals and creating concrete steps towards improved attendance."
},
//
{
  concept: "Cognitive-Behavioral Therapy",
  attribute: "Feeling Overwhelmed",
  action: "Guide the student in breaking tasks down into manageable chunks and introducing stress management techniques."
},
{
  concept: "Psychoanalysis",
  attribute: "Lack of Personal Time",
  rating: 4,
  action: "Explore underlying issues that may be causing the student to neglect personal time. Promote the importance of self-care."
},
//
{
  concept: "Existential Therapy",
  attribute: "Uncertainty about Future",
  rating: 5,
  action: "Help the student explore their fears about the future, focusing on personal responsibility and finding meaning."
},
{
  concept: "Gestalt Therapy",
  attribute: "Frequent Major Switching",
  rating: 4,
  action: "Assist the student in gaining self-awareness about their changing decisions, focusing on the here and now."
}

];
rules.forEach(rule => {
  rule.recommendation = `${rule.attribute} ${rule.concept}`;
});

export default rules;
