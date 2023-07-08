//Cultural Technology
//Fill out icon, year fields - [WIP]
config.technology.cultural_technology = {
  renaissance_thought: {
    name: "Renaissance Thought",
    description: "The Renaissance marked a period of intellectual revival, with a focus on human potential, classical knowledge, and critical thinking, leading to significant advancements in art, science and philosophy.",
    research_cost: 20,
    unlocks: {
      research_efficiency: 0.10
    }
  },

  art_patronage: {
    name: "Art Patronage",
    description: "Wealthy patrons played a crucial role in supporting artists during the 1500s, commissioning artworks and fostering artistic creativity, resulting in the creation of renowned masterpieces.",
    research_cost: 50,
    unlocks: {
      prestige_gain: 0.05,
      tax_efficiency: -0.02
    }
  },
  individualism: {
    name: "Individualism",
    description: "Individualism celebrated the uniqueness and autonomy of individuals, promoting self-expression, personal exploration, and the pursuit of one’s own interests and talents amongst the middle and upper classes.",
    research_cost: 50,
    unlocks: {
      education_efficiency: 0.05,
      constitutional_monarchy: 0.01,
      democracy: 0.01
    }
  },
  practical_application_of_the_sciences: {
    name: "Practical Application of the Sciences",
    description: "A shift towards applying scientific knowledge to practical fields such as medicine, engineering, and navigation, leading to innovations and advancements that improved daily life.",
    research_cost: 50,
    unlocks: {
      education_efficiency: 0.02,
      research_efficiency: 0.02,
      ahead_of_time_penalty: -0.05
    }
  },

  high_renaissance_art: {
    name: "High Renaissance Art",
    description: "Characterised by exceptional artistic achievements, High Renaissance Art was exemplified by the works of renowned artists such as Leonardo da Vinci, Michelangelo and Raphael, who created iconic pieces that showcased technical excellence, harmony, and emotional depth.",
    research_cost: 75,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  printing_press: {
    name: "Printing Press",
    description: "The invention of the printing press led to the spread of information and knowledge, making books more accessible, accelerating the vernacular dissemination of ideas, and fuelling intellectual and cultural advancements.",
    research_cost: 75,
    unlocks: {
      education_efficiency: 0.15,
      literacy_gain: 0.05,
      scholar_pop_chance: 
    }
  },
};
