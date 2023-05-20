function evaluateCondition(ruleData, data) {
  if (
    ruleData.attribute === data.name  &&
    ruleData.rating === data.rating  
  
  ) {
    return true
  }
  else {
    return false
  }
}

export default evaluateCondition
