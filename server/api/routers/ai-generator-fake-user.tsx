import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const aiGeneratorFakeUser = createTRPCRouter({
  run: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": `${process.env.YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
        "X-Title": `${process.env.YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
          export interface User {
  id_card: string;
  name: string;
  birth_date: string;
  age: number;
  gender: string;
  residence: string;
  email: string;
  hometown: string;
  phone: string;
  schools: {
    elementary: School;
    middle: School;
    high: School;
    university: School;
  };
}

interface School {
  admission_date: string;
  graduation_date: string;
  name: string;
}
随机生成 "${input}" 用户信息并输出 "${input}" 的语言，数字使用随机数，email 不要使用 example。只输出 json ，不需要开头和结束提示。`,
          },
        ],
      }),
    });

    const data = await res.json();
    return data.choices[0].message.content;
  }),
});
