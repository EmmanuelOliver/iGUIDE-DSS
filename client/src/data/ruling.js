function evaluateCondition(ruleData, data) {
  if (
    ruleData.attribute === data.name  
  
  ) {
    return true
  }
  else {
    return false
  }
}

export default evaluateCondition
