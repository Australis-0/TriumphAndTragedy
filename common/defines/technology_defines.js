config.defines.technology = {
  additional_research: 0, //Research up to certain research cost, 0 to disable
  ahead_of_time: [
    [0, 1800, 10], //Between 0 and 1800, the tech penalty doubles for every 10 years it is ahead of time
    [1800, 1890, 5],
    [1890, 1939, 2],
    [1939, 1945, 1],
    [1945, 3000, 2]
  ],
  max_knowledge_investment: 1, //How much of a tech can be researched each turn at maximum? (percentage)
};
