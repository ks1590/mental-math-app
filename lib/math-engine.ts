export type Problem = {
  id: string;
  expression: string;
  answer: number;
  choices: number[];
};

export const generateProblem = (level: number = 1): Problem => {
  // Level 1: Simple addition (1-digit + 1-digit)
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const answer = a + b;

  const choices = new Set<number>();
  choices.add(answer);

  while (choices.size < 4) {
    // Generate distractors close to the answer
    const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const distractor = answer + offset;

    if (distractor > 0 && distractor !== answer) {
      choices.add(distractor);
    } else {
        // Fallback for edge cases or duplicates
        choices.add(Math.floor(Math.random() * 18) + 1);
    }
  }

  // Shuffle choices
  const shuffledChoices = Array.from(choices).sort(() => Math.random() - 0.5);

  return {
    id: Math.random().toString(36).substring(7),
    expression: `${a} + ${b} = ?`,
    answer,
    choices: shuffledChoices,
  };
};
