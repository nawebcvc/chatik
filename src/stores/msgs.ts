import { defineStore } from "pinia";
import { require } from "@/utils";

interface Imsgs {
  [n: string]: [
    {
      id: string;
      date: string;
      text: string;
      files: {
        imgs: string[];
        audios: string[];
        attachments: string[];
        links: string[];
      };
    }
  ];
}

export const useMsgStore = defineStore("msgs", {
  state: () => ({
    "3735c0a1-f3c9-469f-a3bc-415b565431d0": [
      {
        id: "6a7e6e0b-36ae-48e8-8049-433abda9b85f",
        date: "Fri May 19 2023 18:12:14 GMT+0500 (Uzbekistan Standard Time)",
        text: "I wish I could be here",
        files: {
          imgs: [],
          audios: [],
          attachments: [],
          links: [
              /* "https://dribbble.com/shots/16434545-24LIB-cryptocurrency-exchange-trading" : */ require("./assets/images/files/a6fd8a72-e251-43d5-acbf-73404c53857c.png"),
          ],
        },
      },
    ],
  } as Imsgs),
});
