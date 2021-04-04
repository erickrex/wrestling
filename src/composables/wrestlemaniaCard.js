import { assign, createMachine } from "xstate";

const addPicked = assign({
  results: (ctx, event) => ctx.results.add(event.winner)
});

const exemplary = () => {
  console.log("ya pues compa");
}

const Card = createMachine(
  {
    id: "step",
    initial: "one",
    context: {
      results: new Set(),
      productRoute: "",
      message: "",
    },
    states: {
      one: {
        meta: {
          match: "WWE Championship match",
          optionsAvailable: [
            { wrestler: "Bobby Lashley", status: "champion" },
            { wrestler: "Drew McIntyre", status: "challenger" }
          ],
        },
        on: {
          NEXT: { target: "two", actions: [addPicked] },
          PREVIOUS: { target: "one", actions: [addPicked] }
        },
      },
      two: {
        meta: {
          match: "Smackdown Womens Championship?",
          optionsAvailable: [
            { wrestler: "Sasha Banks", status: "champion" },
            { wrestler: "Bianca Belair", status: "challenger" },
          ],
        },
        on: {
            NEXT: { target: "three", actions: [addPicked] },
            PREVIOUS: { target: "one", actions: [addPicked] },
          },
      },
      three: {
        meta: {
          match: "Celebrity Match featuring Bad Bunny",
          optionsAvailable: [
            { wrestler: "The Miz", status: "challenger" },
            { wrestler: "Bad Bunny", status: "challenger" },
          ],
        },
        on: {
            NEXT: { target: "four", actions: [addPicked] },
            PREVIOUS: { target: "two", actions: [addPicked] },
          },
      },
      four: {
        meta: {
          match: "Raw Tag Team Championships",
          optionsAvailable: [
            { wrestler: "AJ Styles and OMAS", status: "challenger" },
            { wrestler: "The New Day", status: "champion" },
          ],
        },
        on: {
            NEXT: { target: "five", actions: [addPicked] },
            PREVIOUS: { target: "three", actions: [addPicked] },
          },
      },
      five: {
        meta: {
          match: "Seth Rollins vs Cesaro",
          optionsAvailable: [
            { wrestler: "Seth Rollins", status: "challenger" },
            { wrestler: "Cesaro", status: "challenger" },
          ],
        },
        on: {
            NEXT: { target: "six", actions: [addPicked] },
            PREVIOUS: { target: "four", actions: [addPicked] },
          },
      },
      six: {
        meta: {
          match: "Shane McMahon vs Braun Strowman",
          optionsAvailable: [
            { wrestler: "Shane McMahon", status: "challenger" },
            { wrestler: "Braun Strowman", status: "challenger" },
          ],
        },
        on: {
            NEXT: { target: "seven", actions: [addPicked] },
            PREVIOUS: { target: "five", actions: [addPicked] },
          },
      },
      seven: {
        meta: {
          match: "Universal Championship thriple threat match",
          optionsAvailable: [
            { wrestler: "Roman Reigns", status: "champion" },
            { wrestler: "Edge", status: "challenger" },
            { wrestler: "Daniel Bryan", status: "challenger" }
          ],
        },
        on: {
            NEXT: { target: "eight", actions: [addPicked] },
            PREVIOUS: { target: "six", actions: [addPicked] }
        },
      },
      eight: {
        meta: {
            match: "Raw Womens Championship",
            optionsAvailable: [
              { wrestler: "Asuka", status: "champion" },
              { wrestler: "Rhea Ripley", status: "challenger" },
            ],
        },
        on: {
            NEXT: { target: "nine", actions: [addPicked] },
            PREVIOUS: { target: "seven", actions: [addPicked] }
        },
      },
      nine: {
        meta: {
          match: "The Fiend with Alexa Bliss vs Randy Orton",
          optionsAvailable: [
            { wrestler: "The Fiend", status: "challenger" },
            { wrestler: "Randy Orton", status: "challenger" },
          ],
        },
        on: {
            NEXT: { target: "ten", actions: [addPicked] },
            PREVIOUS: { target: "eight", actions: [addPicked] }
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
            NEXT: { target: "eleven", actions: [addPicked] },
            PREVIOUS: { target: "nine", actions: [addPicked] }
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
            NEXT: { target: "twelve", actions: [addPicked] },
            PREVIOUS: { target: "ten", actions: [addPicked] }
        },
      },
      twelve: {
        meta: {
          match: "Great, see you at Wrestlemania"
        },
        on: {
          entry: { actions: [addPicked] },
        },
        type: "final",
      },
    },
  },
  {
    actions: {
      addPicked,
      exemplary
    },
  }
);

export default Card;
