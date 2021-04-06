import { assign, createMachine } from "xstate";

const test = () => {
  console.log("persist to firebase");
};

const Card = createMachine(
  {
    id: "step",
    initial: "one",
    context: {},
    states: {
      one: {
        meta: {
          match: "WWE Championship Match",
          optionsAvailable: [
            { wrestler: "Bobby Lashley", status: "champion" },
            { wrestler: "Drew McIntyre", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "two" },
          PREVIOUS: { target: "one" },
        },
      },
      two: {
        meta: {
          match: "Smackdown Women's Championship Match",
          optionsAvailable: [
            { wrestler: "Sasha Banks", status: "champion" },
            { wrestler: "Bianca Belair", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "three" },
          PREVIOUS: { target: "one" },
        },
      },
      three: {
        meta: {
          match: "Celebrity Match",
          optionsAvailable: [
            { wrestler: "Bad Bunny", status: "challenger" },
            { wrestler: "The Miz", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "four" },
          PREVIOUS: { target: "two" },
        },
      },
      four: {
        meta: {
          match: "Cesaro vs Seth Rollins",
          optionsAvailable: [
            { wrestler: "Cesaro", status: "challenger" },
            { wrestler: "Seth Rollins", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "five" },
          PREVIOUS: { target: "three" },
        },
      },
      five: {
        meta: {
          match: "Raw Tag Team Championship Match",
          optionsAvailable: [
            { wrestler: "AJ Styles and Omos", status: "challenger" },
            { wrestler: "The New Day", status: "champion" },
          ],
        },
        on: {
          NEXT: { target: "six" },
          PREVIOUS: { target: "four" },
        },
      },
      six: {
        meta: {
          match: "Steel Cage Match",
          optionsAvailable: [
            { wrestler: "Shane McMahon", status: "challenger" },
            { wrestler: "Braun Strowman", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "sixB" },
          PREVIOUS: { target: "five" },
        },
      },
      sixB: {
        meta: {
          match:
            "Tag Team Turmoil to earn a WWE Women's Tag Team Title Match on Night 2",
          optionsAvailable: [
            { wrestler: "Naomi & Lana", status: "challenger" },
            { wrestler: "Mandy Rose & Dana Brooke", status: "challenger" },
            { wrestler: "The Riott Squad", status: "challenger" },
            { wrestler: "Natalya & Tamina", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "seven" },
          PREVIOUS: { target: "six" },
        },
      },
      seven: {
        meta: {
          match: "Universal Championship Triple Threat Match",
          optionsAvailable: [
            { wrestler: "Roman Reigns", status: "champion" },
            { wrestler: "Edge", status: "challenger" },
            { wrestler: "Daniel Bryan", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "eight" },
          PREVIOUS: { target: "six" },
        },
      },
      eight: {
        meta: {
          match: "The Fiend with Alexa Bliss vs Randy Orton",
          optionsAvailable: [
            { wrestler: "The Fiend", status: "challenger" },
            { wrestler: "Randy Orton", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "nine" },
          PREVIOUS: { target: "seven" },
        },
      },
      nine: {
        meta: {
          match: "Raw Women's Championship",
          optionsAvailable: [
            { wrestler: "Asuka", status: "champion" },
            { wrestler: "Rhea Ripley", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "ten" },
          PREVIOUS: { target: "eight" },
        },
      },
      ten: {
        meta: {
          match: "Owens vs Zayn (Logan Paul special referee)",
          optionsAvailable: [
            { wrestler: "Kevin Owens", status: "challenger" },
            { wrestler: "Sami Zayn", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "tenB" },
          PREVIOUS: { target: "nine" },
        },
      },
      tenB: {
        meta: {
          match: "Riddle vs Sheamus",
          optionsAvailable: [
            { wrestler: "Riddle", status: "champion" },
            { wrestler: "Sheamus", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "eleven" },
          PREVIOUS: { target: "ten" },
        },
      },
      eleven: {
        meta: {
          match: "Intercontinental Championship street fight match",
          optionsAvailable: [
            { wrestler: "Big E", status: "champion" },
            { wrestler: "Apollo Crews", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "elevenB" },
          PREVIOUS: { target: "ten" },
        },
      },
      elevenB: {
        meta: {
          match: "WWE Women's Tag Team Title Match",
          optionsAvailable: [
            { wrestler: "Shayna Baszler & Nia Jax", status: "champion" },
            { wrestler: "Winner from night one", status: "challenger" },
          ],
        },
        on: {
          NEXT: { target: "twelve" },
          PREVIOUS: { target: "eleven" },
        },
      },
      twelve: {
        meta: {
          match: "Great, see you at Wrestlemania",
          optionsAvailable: [{ wrestler: "Alexa Bliss", status: "" }],
        },
        on: {
          PREVIOUS: { target: "elevenB" },
        },
      },
    },
  },
  {
    actions: {
      test,
    },
  }
);

export default Card;
