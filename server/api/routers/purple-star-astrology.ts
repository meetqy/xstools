import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const purpleStarAstrology = createTRPCRouter({
  run: publicProcedure
    .input(
      z.object({
        birth_date: z.string(),
        gender: z.string(),
        lang: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": `${process.env.YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
          "X-Title": `${process.env.YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini-2024-07-18",
          messages: [
            {
              role: "user",
              content: `出生日期：${input.birth_date} ,性别：${input.gender} 推测我今天的命运和财富，只需要用词语概括即可。宜，忌作为分类。输出 {suitable:string[], avoid:string[]}， 用 ${input.lang} 的语言。`,
            },
          ],
        }),
      });

      const data = await res.json();
      return data.choices[0].message.content;
    }),
});
