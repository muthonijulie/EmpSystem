function calculateSalary() {
  const Base_sal = parseFloat(document.getElementById('Base_sal').value) || 0;
  const Overtime = parseFloat(document.getElementById('Overtime').value) || 0;
  const Deductions = parseFloat(document.getElementById('Deductions').value) || 0;

  const overtimeRate =  1.5;
  const baseHourlyRate = Base_sal / (40 * 4); // Monthly rate

  
  const overtimeAmount = Overtime * baseHourlyRate * overtimeRate;

  
  const Total_sal = Base_sal + overtimeAmount - Deductions;

  
  document.getElementById('Total_sal').value = Total_sal.toFixed(2); 
}