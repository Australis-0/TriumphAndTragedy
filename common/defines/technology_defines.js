config.defines.technology = {
  additional_research: 0, //Research up to certain research cost, 0 to disable
  ahead_of_time: [
    [0, 1815, 5], //Between 0 and 1800, the tech penalty doubles for every 5 years it is ahead of time
    [1815, 1890, 2],
    [1890, 1939, 1],
    [1939, 1945, 0.5],
    [1945, 3000, 2]
  ],
  max_knowledge_investment: 1, //How much of a tech can be researched each turn at maximum? (percentage)
};
