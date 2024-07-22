import { z } from "zod";
import Replicate from "replicate";
const replicate = new Replicate();
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const aiGeneratorFakeUser = createTRPCRouter({
  run: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const output = await replicate.run("meta/meta-llama-3-70b-instruct", {
      input: {
        top_p: 0.9,
        prompt: `
          export interface User {
  id_card: string;
  name: string;
  birth_date: string;
  age: number;
  gender: string;
  // 现居地 x 省 x 市 x 区 x 街道 x 号
  residence: string;
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
生成一个 ${input} 用户信息，要求真实。只返回 json，不要开始和结束的提示语。`,
        min_tokens: 0,
        temperature: 0.6,
        prompt_template:
          "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
        presence_penalty: 1.15,
      },
    });

    return output as string[];
  }),
});
