
import { shuffleArray } from './utils';
export type Question = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
};
export type QuestionState = Question & { answers: string[] }
export enum Difficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard'
}

export const fetchTrivia = async (amount: number, difficulty: Difficulty) => {

	const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

	const resp = await fetch(endpoint);
	const data = await resp.json()
	return data.results.map((question: Question) => ({
		...question,
		answers: shuffleArray([ question.correct_answer, ...question.incorrect_answers ])
	}));
};
