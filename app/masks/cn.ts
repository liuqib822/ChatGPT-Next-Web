import { BuiltinMask } from "./typing";

export const CN_MASKS: BuiltinMask[] = [
  {
    avatar: "1f638",
    name: "评论分析师",
    context: [
      {
        id: "writer-0",
        role: "user",
        content:
          "我希望你充当评论分析师，我会发送中文文本给你，你帮我根据主评内容字段，分析出来买家评论主要涉及的问题类别，并作出分析，首先需要分析总体评价中，正面和负面的整体占比情况，再分别分析正面和负面评价中分别出现的问题类别，另外根据每种主题涉及的评论数除以总评论条数，补充上每类型主题的提及率占比。",
        date: "",
      },
    ],
    modelConfig: {
      model: "gpt-4-turbo",
      temperature: 1,
      max_tokens: 5000,
      presence_penalty: 0,
      frequency_penalty: 0,
      sendMemory: true,
      historyMessageCount: 4,
      compressMessageLengthThreshold: 1000,
    },
    lang: "cn",
    builtin: true,
    createdAt: 1688899480511,
  },
];
