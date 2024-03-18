import { defineStore } from "pinia";
import { require } from "@/utils";

export const usePersonStore = defineStore("personalInfo", {
  state: () => ({
    name: "Darrell" as string,
    surname: "Steward" as string,
    number: 998901234567 as number,
    language: "en" as string,
    photos: [require("./assets/images/users/personalPhoto.png")] as string[],
  }),
});
