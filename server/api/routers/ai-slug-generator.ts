import { z } from "zod";
import Replicate from "replicate";
const replicate = new Replicate();
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const aiSlugGenerator = createTRPCRouter({
  run: publicProcedure
    .input(z.string().max(200))
    .mutation(async ({ input }) => {
      const output = await replicate.run("meta/meta-llama-3-70b-instruct", {
        input: {
          top_p: 0.9,
          prompt: `Generate an English url slug based on the title, require SEO friendly, contain keywords. only return url slug. Don't answer any questions. title: "${input}"`,
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
