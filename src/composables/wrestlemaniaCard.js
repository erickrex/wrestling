import { assign, createMachine } from "xstate";

const test = () => {
  console.log('persist to firebase')
}

const Card = createMachine(
  {
    id: "step",
    initial: "one",
    context: {
      
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
          NEXT: { target: "two"},
          PREVIOUS: { target: "one"}
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
            NEXT: { target: "three"},
            PREVIOUS: { target: "one"},
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
            NEXT: { target: "four"},
            PREVIOUS: { target: "two"},
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
            NEXT: { target: "five"},
            PREVIOUS: { target: "three"},
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
            NEXT: { target: "six"},
            PREVIOUS: { target: "four"},
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
            NEXT: { target: "seven"},
            PREVIOUS: { target: "five"},
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
            NEXT: { target: "eight"},
            PREVIOUS: { target: "six"}
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
            NEXT: { target: "nine"},
            PREVIOUS: { target: "seven"}
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
            NEXT: { target: "ten"},
            PREVIOUS: { target: "eight"}
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
            NEXT: { target: "eleven"},
            PREVIOUS: { target: "nine"}
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
            NEXT: { target: "twelve"},
            PREVIOUS: { target: "ten"}
        },
      },
      twelve: {
        meta: {
          match: "Great, see you at Wrestlemania"
        },
        on: {
          PREVIOUS: { target: "eleven"},
        },
      },
    },
  },
  {
    actions: {
      test
    },
  }
);

export default Card;
