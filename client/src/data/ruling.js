function evaluateCondition(ruleData, inputData) {
  if (
    ruleData.concept === "Self-Efficacy" &&
    ruleData.attribute === inputData.thought  &&
    ruleData.rating === inputData.thoughtLevel
  ) {
    return true
  } else if (
    ruleData.concept === "Self-Efficacy" &&
    ruleData.attribute === inputData.behavior  &&
    ruleData.rating === inputData.behaviorLevel
  ) {
    return true
  }
  else if (
    ruleData.concept === "Goal-Setting" &&
    ruleData.attribute === inputData.behavior  &&
    ruleData.rating === inputData.behaviorLevel
  ) {
    return true
  }
  else if (
    ruleData.attribute === inputData.behavior  &&
    ruleData.rating === inputData.behaviorLevel
  ) {
    return true
  }
  else {
    return false
  }
}

export default evaluateCondition
