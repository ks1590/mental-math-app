export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
export type DifficultyLevel = 0 | 1 | 2 | 3;
export type ProblemType = 'normal' | 'fill-in-the-blank';

export type Problem = {
  id: string;
  expression: string;
  answer: number;
  result: number; // The result of the equation (a op b = result)
  choices: number[];
  operation: Operation;
  operands: { a: number; b: number };
  missingComponent: 'a' | 'b' | 'result';
};

// Get operations allowed for each difficulty level
const getOperationsForLevel = (level: DifficultyLevel): Operation[] => {
  switch (level) {
    case 0:
      return ['add'];
    case 1:
      return ['add', 'subtract'];
    case 2:
      return ['add', 'subtract', 'multiply'];
    case 3:
      return ['add', 'subtract', 'multiply', 'divide'];
    default:
      return ['add'];
  }
};

// Generate a problem based on operation type
const generateByOperation = (operation: Operation): { a: number; b: number; result: number } => {
  let a: number, b: number, result: number;

  switch (operation) {
    case 'add':
      // Addition: 1-digit + 1-digit (result <= 18)
      a = Math.floor(Math.random() * 9) + 1;
      b = Math.floor(Math.random() * 9) + 1;
      result = a + b;
      break;

    case 'subtract':
      // Subtraction: ensure positive result
      a = Math.floor(Math.random() * 9) + 10; // 10-18
      b = Math.floor(Math.random() * 9) + 1; // 1-9
      // Make sure a > b
      if (a <= b) {
        [a, b] = [b + 1, a];
      }
      result = a - b;
      break;

    case 'multiply':
      // Multiplication: times table (1-9 × 1-9)
      a = Math.floor(Math.random() * 9) + 1;
      b = Math.floor(Math.random() * 9) + 1;
      result = a * b;
      break;

    case 'divide':
      // Division: only divisible problems
      b = Math.floor(Math.random() * 8) + 2; // 2-9 (divisor)
      const quotient = Math.floor(Math.random() * 9) + 1; // 1-9
      a = b * quotient; // dividend
      result = quotient;
      break;

    default:
      a = 1;
      b = 1;
      result = 2;
  }

  return { a, b, result };
};

// Get operation symbol
const getOperationSymbol = (operation: Operation): string => {
  switch (operation) {
    case 'add':
      return '+';
    case 'subtract':
      return '-';
    case 'multiply':
      return '×';
    case 'divide':
      return '÷';
    default:
      return '+';
  }
};

export const generateProblem = (level: DifficultyLevel = 1, type: ProblemType = 'normal'): Problem => {
  // Select random operation based on difficulty level
  const operations = getOperationsForLevel(level);
  const operation = operations[Math.floor(Math.random() * operations.length)];

  // Generate problem
  const { a, b, result } = generateByOperation(operation);

  // Determine missing component
  let missingComponent: 'a' | 'b' | 'result' = 'result';
  let answer: number = result;

  if (type === 'fill-in-the-blank') {
    // Randomly hide 'a' or 'b'
    // For division, hiding 'b' (divisor) is tricky if we want to keep it simple, but logic holds.
    // For subtraction, hiding 'b' is effectively: a - ? = result -> ? = a - result
    missingComponent = Math.random() < 0.5 ? 'a' : 'b';
    answer = missingComponent === 'a' ? a : b;
  }

  // Generate choices (one correct answer + 3 distractors)
  const choices = new Set<number>();
  choices.add(answer);

  // Generate distractors based on operation type
  while (choices.size < 4) {
    let distractor: number;

    const useNearby = Math.random() < 0.6; // 60% chance to use nearby values

    if (useNearby) {
      const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
      distractor = answer + offset;
    } else {
      // Logic for common mistakes depends on what we are looking for
      const mistakes = [answer + 10, answer - 10, answer * 2, Math.floor(answer / 2)];
      if (type === 'normal') {
        mistakes.push(a, b); // Operand as answer
      } else {
        mistakes.push(result); // Result as answer
        if (missingComponent === 'a') mistakes.push(b);
        if (missingComponent === 'b') mistakes.push(a);
      }
      distractor = mistakes[Math.floor(Math.random() * mistakes.length)];
    }

    // Ensure distractor is positive and different from answer
    if (distractor > 0 && distractor !== answer && distractor <= 100) {
      choices.add(distractor);
    }
  }

  // Shuffle choices
  const shuffledChoices = Array.from(choices).sort(() => Math.random() - 0.5);

  const symbol = getOperationSymbol(operation);

  let expression = '';
  if (missingComponent === 'result') {
    expression = `${a} ${symbol} ${b} = ?`;
  } else if (missingComponent === 'a') {
    expression = `? ${symbol} ${b} = ${result}`;
  } else {
    expression = `${a} ${symbol} ? = ${result}`;
  }

  return {
    id: Math.random().toString(36).substring(7),
    expression,
    answer,
    result,
    choices: shuffledChoices,
    operation,
    operands: { a, b },
    missingComponent,
  };
};
