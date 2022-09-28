// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { adjectives, nouns } from "../../config/adjectives";

function generateHash(input: string) {
  const arr = input.replace(/ /g, "").split("");

  let result = 0;

  for (let i = 0; i < arr.length; i += 1) {
    result = result + input.charCodeAt(i);
  }

  return {
    first: result,
    second: result * arr.length,
  };
}

function generateName(input: string): string {
  const hash = generateHash(input);

  const first = adjectives[hash.first % adjectives.length];
  const second = nouns[hash.second & adjectives.length];

  return `${first} ${second}`;
}

interface Data {
  name: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const input = req.query.name as string;

  const name = generateName(input);

  res.status(200).json({ name });
}
