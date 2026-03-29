import { GoogleGenerativeAI } from '@google/generative-ai';
import { FALLBACK_FOLLOWUPS } from '../data/mockData';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

// ─────────────────────────────────────────────
//  Generate AI follow-up question
// ─────────────────────────────────────────────
export const generateFollowUp = async (question, candidateAnswer) => {
  if (!genAI) {
    const pool = FALLBACK_FOLLOWUPS.default;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are a technical interviewer conducting a software engineering interview.

The question asked was: "${question}"

The candidate's answer was: "${candidateAnswer || 'The candidate wrote some code but did not explain verbally.'}"

Generate ONE concise, probing follow-up question (1–2 sentences max) that:
- Digs deeper into their understanding
- Tests for edge cases or scalability concerns  
- Is directly relevant to their answer
- Sounds natural and conversational

Return ONLY the follow-up question, nothing else.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error('Gemini follow-up error:', err);
    const pool = FALLBACK_FOLLOWUPS.default;
    return pool[Math.floor(Math.random() * pool.length)];
  }
};

// ─────────────────────────────────────────────
//  Generate AI Scorecard / Report
// ─────────────────────────────────────────────
export const generateScorecard = async ({
  jobTitle,
  questions,
  candidateAnswers,
  evaluation,
}) => {
  const fallbackCard = {
    strengths: [
      'Demonstrated solid foundational knowledge in core concepts',
      'Communicated ideas clearly with logical structure',
      'Showed adaptability when approached with follow-up questions',
    ],
    improvements: [
      'Could strengthen knowledge of advanced optimization techniques',
      'Practice breaking down complex problems more methodically',
    ],
    behavioral: [
      'Remained composed under technical questioning',
      'Asked appropriate clarifying questions',
      'Showed genuine enthusiasm for the role',
    ],
    skillBreakdown: {
      Communication: evaluation?.communication * 10 || 70,
      'Technical Depth': evaluation?.technical * 10 || 65,
      Confidence: evaluation?.confidence * 10 || 75,
      'Problem Solving': Math.round((((evaluation?.technical || 7) + (evaluation?.confidence || 7)) / 2) * 10),
      Clarity: Math.round((evaluation?.communication || 7) * 10),
    },
  };

  if (!genAI) return fallbackCard;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const answersText = (candidateAnswers || [])
      .map((a, i) => `Q${i + 1}: ${questions?.[i]?.text || 'Technical question'}\nAnswer: ${a || 'No answer provided'}`)
      .join('\n\n');

    const evalText = evaluation
      ? `Evaluation scores — Communication: ${evaluation.communication}/10, Technical: ${evaluation.technical}/10, Confidence: ${evaluation.confidence}/10`
      : '';

    const prompt = `You are an expert technical interviewer generating a post-interview assessment report for a ${jobTitle} position.

${answersText ? `Interview transcript:\n${answersText}\n\n` : ''}${evalText}

Generate a structured JSON assessment (no markdown, just raw JSON) with exactly this shape:
{
  "strengths": ["string", "string", "string"],
  "improvements": ["string", "string"],
  "behavioral": ["string", "string", "string"],
  "skillBreakdown": {
    "Communication": <number 0-100>,
    "Technical Depth": <number 0-100>,
    "Confidence": <number 0-100>,
    "Problem Solving": <number 0-100>,
    "Clarity": <number 0-100>
  }
}

Be specific, fair, and constructive. Do NOT include numeric scores in text fields. Do NOT show the skill breakdown numbers in the strengths/improvements text.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    // Strip markdown fences if present
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error('Gemini scorecard error:', err);
    return fallbackCard;
  }
};
