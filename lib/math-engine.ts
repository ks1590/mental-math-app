export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
export type DifficultyLevel = 1 | 2 | 3;

export type Problem = {
  id: string;
  expression: string;
  answer: number;
  choices: number[];
  operation: Operation;
  operands: { a: number; b: number };
};

// Get operations allowed for each difficulty level
const getOperationsForLevel = (level: DifficultyLevel): Operation[] => {
  switch (level) {
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
const generateByOperation = (operation: Operation): { a: number; b: number; answer: number } => {
  let a: number, b: number, answer: number;

  switch (operation) {
    case 'add':
      // Addition: 1-digit + 1-digit (result <= 18)
      a = Math.floor(Math.random() * 9) + 1;
      b = Math.floor(Math.random() * 9) + 1;
      answer = a + b;
      break;

    case 'subtract':
      // Subtraction: ensure positive result
      a = Math.floor(Math.random() * 9) + 10; // 10-18
      b = Math.floor(Math.random() * 9) + 1;  // 1-9
      // Make sure a > b
      if (a <= b) {
        [a, b] = [b + 1, a];
      }
      answer = a - b;
      break;

    case 'multiply':
      // Multiplication: times table (1-9 × 1-9)
      a = Math.floor(Math.random() * 9) + 1;
      b = Math.floor(Math.random() * 9) + 1;
      answer = a * b;
      break;

    case 'divide':
      // Division: only divisible problems
      b = Math.floor(Math.random() * 8) + 2; // 2-9 (divisor)
      const quotient = Math.floor(Math.random() * 9) + 1; // 1-9
      a = b * quotient; // dividend
      answer = quotient;
      break;

    default:
      a = 1;
      b = 1;
      answer = 2;
  }

  return { a, b, answer };
};

// Get operation symbol
const getOperationSymbol = (operation: Operation): string => {
  switch (operation) {
    case 'add': return '+';
    case 'subtract': return '-';
    case 'multiply': return '×';
    case 'divide': return '÷';
    default: return '+';
  }
};

export const generateProblem = (level: DifficultyLevel = 1): Problem => {
  // Select random operation based on difficulty level
  const operations = getOperationsForLevel(level);
  const operation = operations[Math.floor(Math.random() * operations.length)];

  // Generate problem
  const { a, b, answer } = generateByOperation(operation);

  // Generate choices (one correct answer + 3 distractors)
  const choices = new Set<number>();
  choices.add(answer);

  // Generate distractors based on operation type
  while (choices.size < 4) {
    let distractor: number;
    
    if (operation === 'divide' || operation === 'multiply') {
      // For multiplication/division, use nearby values
      const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
      distractor = answer + offset;
    } else {
      // For addition/subtraction, use common mistakes
      const mistakes = [
        answer + 1,
        answer - 1,
        answer + 2,
        answer - 2,
        a, // operand itself
        b,
      ];
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
  const expression = `${a} ${symbol} ${b} = ?`;

  return {
    id: Math.random().toString(36).substring(7),
    expression,
    answer,
    choices: shuffledChoices,
    operation,
    operands: { a, b },
  };
};
