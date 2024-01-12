//Cultural Technology
//Fill out icon, field - [WIP]
config.technology.cultural_technology = {
  renaissance_thought: {
    name: "Renaissance Thought",
    description: "The Renaissance marked a period of intellectual revival, with a focus on human potential, classical knowledge, and critical thinking, leading to significant advancements in art, science and philosophy.",
    research_cost: 20,
    year: 1356,
    unlocks: {
      research_efficiency: 0.10
    }
  },

  art_patronage: {
    name: "Art Patronage",
    description: "Wealthy patrons played a crucial role in supporting artists during the 1500s, commissioning artworks and fostering artistic creativity, resulting in the creation of renowned masterpieces.",
    prerequisite_techs: ["renaissance_thought"],
    research_cost: 50,
    year: 1450,
    unlocks: {
      unlock_building: "art_academies",
      prestige_gain: 0.05,
      tax_efficiency: -0.02
    }
  },
  individualism: {
    name: "Individualism",
    description: "Individualism celebrated the uniqueness and autonomy of individuals, promoting self-expression, personal exploration, and the pursuit of one’s own interests and talents amongst the middle and upper classes.",
    prerequisite_techs: ["renaissance_thought"],
    research_cost: 50,
    year: 1434,
    unlocks: {
      education_efficiency: 0.05,
      constitutional_monarchy: 0.01,
      democracy: 0.01
    }
  },
  practical_application_of_the_sciences: {
    name: "Practical Application of the Sciences",
    description: "A shift towards applying scientific knowledge to practical fields such as medicine, engineering, and navigation, leading to innovations and advancements that improved daily life.",
    prerequisite_techs: ["renaissance_thought"],
    research_cost: 50,
    year: 1420,
    unlocks: {
      education_efficiency: 0.02,
      research_efficiency: 0.02,
      ahead_of_time_penalty: -0.05
    }
  },

  high_renaissance_art: {
    name: "High Renaissance Art",
    description: "Characterised by exceptional artistic achievements, High Renaissance Art was exemplified by the works of renowned artists such as Leonardo da Vinci, Michelangelo and Raphael, who created iconic pieces that showcased technical excellence, harmony, and emotional depth.",
    prerequisite_techs: ["art_patronage", "individualism"],
    research_cost: 75,
    year: 1495,
    unlocks: {
      unlock_building: "memorials",
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  printing_press: {
    name: "Printing Press",
    description: "The invention of the printing press led to the spread of information and knowledge, making books more accessible, accelerating the vernacular dissemination of ideas, and fuelling intellectual and cultural advancements.",
    prerequisite_techs: ["individualism"],
    research_cost: 75,
    year: 1440,
    unlocks: {
      unlock_building: "publishing_houses",
      education_efficiency: 0.15,
      literacy_gain: 0.05,
      research_efficiency: 0.05,
      scholars_pop_chance: 0.01,
      political_capital_gain_modifier: -0.02
    }
  },
  social_mobility: {
    name: "Social Mobility",
    description: "The 1500s witnessed a gradual increase in social mobility, providing opportunities for individuals from various backgrounds to improve their social status through talent, education and accomplishment, challenging the rigid social hierarchies of the time.",
    prerequisite_techs: ["practical_application_of_the_sciences"],
    research_cost: 75,
    year: 1500,
    unlocks: {
      social_mobility: 0.05
    }
  },

  mannerism: {
    name: "Mannerism",
    description: "Emerging in the Late Renaissance, Mannerism in art embraced unconventional and exaggerated forms, distorted perspectives, and intricate compositions, challenging the balance and harmony of the High Renaissance.",
    research_cost: 100,
    prerequisite_techs: ["high_renaissance_art"],
    year: 1520,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  national_language: {
    name: "National Language",
    description: "The rise of early states during the Renaissance led to the concept of national languages across a geographic region, leading to the beginnings of vernacular standardisation of Early Modern English, German, and French, fostering cultural identity and facilitating communication between citizens.",
    prerequisite_techs: ["printing_press"],
    research_cost: 100,
    year: 1450,
    unlocks: {
      cultural_prestige_to_primary_culture: 10,
      literacy_gain: 0.10,
      cultural_integration_speed: 0.05,
      political_capital_gain_modifier: 0.02
    }
  },
  religious_reform: { //[WIP] - Add Church And State Reforms later
    name: "Religious Reform",
    description: "The Protestant Reformation, led by figures like Martin Luther, initially sought to reform the Catholic Church, challenging its practices, promoting religious autonomy and individual interpretation of scripture, resulting in religious and social changes.",
    prerequisite_techs: ["printing_press"],
    research_cost: 100,
    year: 1566
  },

  national_vernacular: {
    name: "National Vernacular",
    description: "The use and promotion of national vernacular languages in literature, poetry, and writing emerged during the Reformation, disseminating literature and scientific knowledge amongst a broad populace.",
    prerequisite_techs: ["national_language"],
    research_cost: 150,
    year: 1550,
    unlocks: {
      cultural_prestige_to_primary_culture: 10,
      literacy_gain: 0.15
    }
  },
  realpolitik: {
    name: "Realpolitik",
    description: "Realpolitik, a pragmatic political approach, emphasised practical and strategic considerations over idealism or moral principles, helping to shape new diplomatic and political strategies.",
    prerequisite_techs: ["religious_reform"],
    research_cost: 150,
    year: 1532,
    unlocks: {
      diplomatic_slots: 1,
      political_capital_gain_modifier: 0.02
    }
  },

  baroque_art: {
    name: "Baroque Art",
    description: "First emerging in the 17th century, Baroque art was characterised by dramatic expressions, dynamic compositions, and intense emotions, reflecting the religious fervour and political power dynamics of the time.",
    prerequisite_techs: ["mannerism"],
    research_cost: 200,
    year: 1600,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  regularisation_of_grammar: {
    name: "Regularisation of Grammar",
    description: "The Early Modern Era witnessed the first efforts to standardise and codify grammar rules and usage through prescriptivism, contributing to the development of grammatical guidelines and linguistic precision.",
    prerequisite_techs: ["national_vernacular"],
    research_cost: 200,
    year: 1586,
    unlocks: {
      literacy_gain: 0.05,
      cultural_integration_speed: 0.02,
      political_capital_gain_modifier: 0.01
    }
  },
  humanism: {
    name: "Humanism",
    description: "Humanism was a line of thought that emphasised the importance of human potential, education, and the study of classical texts, promoting individualism, secular values, and a broader understanding of human experiences.",
    prerequisite_techs: ["realpolitik"],
    research_cost: 200,
    year: 1564,
    unlocks: {
      unlock_building: ["hospitals", "primary_schools"],
      title_strength: -5,
      political_capital_gain_modifier: 0.02,
      constitutional_monarchy: 0.01,
      democracy: 0.01
    }
  },
  political_treatises: {
    name: "Political Treatises",
    description: "Renaissance thinkers such as Machiavelli and Thomas More wrote influential documents that explored governance, power, and ideal societies, shaping contemporaneous political thought and influencing future political ideologies.",
    prerequisite_techs: ["social_mobility"],
    research_cost: 200,
    year: 1535,
    unlocks: {
      diplomatic_slots: 1
    }
  },

  late_baroque: {
    name: "Late Baroque",
    description: "Predicated on earlier Baroque styles, Late Baroque art and architecture fully embraced lavish ornamentation, grandeur, and exuberance, representing the culmination of the style before transitioning into the Rococo period.",
    prerequisite_techs: ["baroque_art"],
    research_cost: 250,
    year: 1690,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  political_thought: {
    name: "Political Thought",
    description: "Political thought during this era encompassed diverse ideologies and theories, exploring concepts of governance, power, and social organisation, with influential thinkers amongst the upper classes and aristocracy shaping political discourse and advocating for concepts such as a social contract and anti-monarchism.",
    prerequisite_techs: ["political_treatises"],
    research_cost: 250,
    year: 1642,
    unlocks: {
      unlock_building: "cafes",
      diplomatic_slots: 1,
      political_capital_gain_modifier: 0.02
    }
  },

  lingua_franca: {
    name: "Lingua Franca",
    description: "A common language developed for communication and trade between people of different linguistic backgrounds is necessary to help facilitate cultural exchange and commerce.",
    prerequisite_techs: ["regularisation_of_grammar"],
    research_cost: 350,
    year: 1670,
    unlocks: {
      cultural_prestige_to_primary_culture: 10,
      permanent_prestige: 5,
      tax_revenue: 0.02
    }
  },
  natural_state_of_man: {
    name: "Natural State of Man",
    description: "Enlightenment philosophers such as Thomas Hobbes and John Locke contemplated the natural state of man, debating whether humans were inherently self-interested and prone to conflict or possessed natural rights and the potential for reason and cooperation.",
    prerequisite_techs: ["humanism"],
    research_cost: 350,
    year: 1688,
    unlocks: {
      unlock_building: "research_labs",
      research_efficiency: 0.05,
      political_capital_gain_modifier: 0.02
    }
  },

  french_classicism: {
    name: "French Classicism",
    description: "Prevalent during the 17th century, French Classicism in art and literature drew inspiration from classical Greek and Roman models, prioritising order, harmony, and balance, under the framework of a restrained and formal aesthetic.",
    prerequisite_techs: ["late_baroque"],
    research_cost: 500,
    year: 1610,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  governmental_usage_of_vernacular: {
    name: "Governmental Usage of Vernacular",
    description: "As nation-states developed during the Enlightenment, governments increasingly adopted vernacular languages in official communications and governance, expanding access to legal and administrative systems for the general population.",
    prerequisite_techs: ["lingua_franca"],
    research_cost: 500,
    year: 1618,
    unlocks: {
      unlock_building: "secondary_schools",
      cultural_prestige_to_primary_culture: 5,
      literacy_gain: 0.05,
      bureaucrats_pop_chance: 0.01
    }
  },
  enlightenment_philosophy: {
    name: "Enlightenment Philosophy",
    description: "Based on the Scientific Revolution, the Enlightenment was a philosophical movement emphasising reason, knowledge, and progress, with influential thinkers like Voltaire, Montesqieu and Rousseau advocating for concepts such as religious tolerance, separation of powers, and social contract.",
    prerequisite_techs: ["natural_state_of_man"],
    research_cost: 500,
    year: 1715,
    unlocks: {
      unlock_building: ["members_clubs", "zoos"],
      education_efficiency: 0.05
    }
  },
  diplomatic_thought: {
    name: "Diplomatic Thought",
    description: "Diplomatic doctrine throughout the Early Modern period underwent significant changes with the development of diplomatic protocols, the rise of permanent diplomatic missions, and the formulation of principles for conducting international relations.",
    prerequisite_techs: ["political_thought"],
    research_cost: 500,
    year: 1702,
    unlocks: {
      diplomatic_slots: 2
    }
  },

  rococo: {
    name: "Rococo",
    description: "Emerging in the early 18th century, Rococo art and design represented a shift from earlier grandeur, embracing a more playful, ornamental and delicate aesthetic, characterised by intricate detailing, pastel colours, and themes of love and nature.",
    prerequisite_techs: ["french_classicism"],
    research_cost: 650,
    year: 1730,
    unlocks: {
      unlock_building: ["georgian_blocks", "operas"],
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  national_dictionary: {
    name: "National Dictionary",
    description: "As nations sought to establish cultural identity and standardise their languages, the compilation of national dictionaries emerged, serving as authoritative references for spelling, grammar, and vocabulary.",
    prerequisite_techs: ["governmental_usage_of_vernacular"],
    research_cost: 650,
    year: 1755
  },
  early_empiricism: {
    name: "Early Empiricism",
    description: "Championed by philosophers like Francis Bacon and John Locke, Empiricism emphasised the importance of sensory experience and observation as the basis of knowledge, challenging traditional scholastic and rationalist approaches.",
    prerequisite_techs: ["enlightenment_philosophy"],
    research_cost: 650,
    year: 1640,
    unlocks: {
      research_efficiency: 0.10,
      ahead_of_time_penalty: -0.05
    }
  },
  the_rights_of_man: {
    name: "The Rights of Man",
    description: "Enlightenment thinkers put forth the concept of the rights of man, asserting that individuals possess inherent and inalienable rights, such as liberty, equality, and property, serving as a foundation for classical liberalism.",
    prerequisite_techs: ["diplomatic_thought"],
    research_cost: 650,
    year: 1689,
    unlocks: {
      constitutional_monarchy: 0.01,
      democracy: 0.01
    }
  },

  rocaille: {
    name: "Rocaille",
    description: "A decorative style prominent during the 18th century, Rocaille featured intricate and asymmetrical ornamentation inspired by natural forms such as shells, rocks and foliage, influencing architecture, interior design, and decorative arts.",
    prerequisite_techs: ["rococo"],
    research_cost: 750,
    year: 1730,
    unlocks: {
      unlock_building: "theatres",
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  idealism: {
    name: "Idealism",
    description: "A philosophical perspective popularised by Immanuel Kant and others, Idealism posited that reality is shaped by the mind and ideas, emphasising the importance of reason, concepts and subjective experience in understanding the world.",
    prerequisite_techs: ["early_empiricism"],
    research_cost: 750,
    year: 1734,
    unlocks: {
      cultural_prestige_to_primary_culture: 5
    }
  },
  ideological_thought: {
    name: "Ideological Thought",
    description: "Ideological thought refers to the development and articulation of comprehensive systems of ideas, beliefs, and values that help shape political, social and cultural ideologies, often influencing movements and political doctrines.",
    prerequisite_techs: ["the_rights_of_man"],
    research_cost: 750,
    year: 1770,
    unlocks: {
      diplomatic_slots: 1,
      political_capital_gain_modifier: 0.05
    }
  },

  neoclassicism: {
    name: "Neoclassicism",
    description: "First developed during the 18th century, Neoclassicism was seen as an artistic reaction against Rococo, drawing inspiration from classical Greek and Roman art and architecture - characterised by simplicity, order, and restraint.",
    prerequisite_techs: ["rocaille"],
    research_cost: 900,
    year: 1787,
    unlocks: {
      unlock_building: "museums",
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  governmental_standardisation: {
    name: "Governmental Standardisation",
    description: "Governmental standardisation refers to the process of establishing uniform rules, regulations and protocols by governments to ensure consistency and efficiency in various bureaucratic domains.",
    prerequisite_techs: ["national_dictionary"],
    research_cost: 900,
    year: 1789,
    unlocks: {
      political_capital_gain_modifier: 0.05
    }
  },
  metaphysical_philosophy: {
    name: "Metaphysical Philosophy",
    description: "Fundamental questions about the nature of reality, existence, consciousness and the relationship between mind and matter have been raised amongst philosophers, resulting in the examination of concepts beyond the physical realm and often delving into abstract or speculative ideas.",
    prerequisite_techs: ["idealism"],
    research_cost: 900,
    year: 1788,
    unlocks: {
      cultural_prestige_to_primary_culture: 5,
      impact_from_mental_health_conditions: -0.02
    }
  },

  empire_style: {
    name: "Empire Style",
    description: "Empire style, popular during the Napoleonic era, was characterised by opulent and symmetrical designs inspired by ancient Egyptian, Greek, and Roman art, reflecting the grandeur and power associated with the Napoleonic Empire.",
    prerequisite_techs: ["neoclassicism"],
    research_cost: 1000,
    year: 1800,
    unlocks: {
      unlock_building: "haussmann_blocks",
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  state_and_government: {
    name: "State and Government",
    description: "The codification of bureaucratic structures and institutions through which political authority is exercised, including systems of governance and administrative/legal frameworks will help regulate society and shape public policy.",
    prerequisite_techs: ["ideological_thought"],
    research_cost: 1000,
    year: 1802,
    unlocks: {
      maximum_expeditions: 1,
      political_capital_gain_modifier: 0.05,
      tax_revenue: 0.03
    }
  },

  romanticism: {
    name: "Romanticism",
    description: "Preceded by Sturm und Drang, and flourishing in the late 18th and early 19th centuries, Romanticism celebrated imagination, emotion, nature and individualism. Its development challenged rationality, embracing a range of artistic and literary expressions focused on subjectivity and personal experience.",
    prerequisite_techs: ["empire_style"],
    year: 1800,
    research_cost: 1200,
    unlocks: {
      unlock_building: ["esplanades", "public_moorings", "sanatoriums"],
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  standardisation_of_language: {
    name: "Standardisation of Language",
    description: "The standardisation of language involves the establishment of linguistic norms, grammar rules, and vocabulary choices from a prescriptivist lens to create a unified and consistent form of communication, facilitating comprehension, education, and cultural cohesion.",
    prerequisite_techs: ["governmental_standardisation"],
    year: 1828,
    research_cost: 1200,
    unlocks: {
      literacy_gain: 0.05,
      cultural_integration_speed: 0.02
    }
  },
  kantianism: {
    name: "Kantianism",
    description: "A philosophical system developed by Immanuel Kant, emphasising the centrality of reason, moral autonomy, and the pursuit of universal ethical principles based on the categorical imperative.",
    prerequisite_techs: ["metaphysical_philosophy"],
    year: 1787,
    research_cost: 1200,
    unlocks: {
      higher_education_efficiency: 0.02
    }
  },
  malthusian_thought: {
    name: "Malthusian Thought",
    description: "Developed by Thomas Malthus, Malthusianism examined population growth, resources, and the potential for scarcity, arguing that population tends to outstrip available resources unless checked by factors such as famine, disease, or moral restraint.",
    prerequisite_techs: ["state_and_government"],
    research_cost: 1200,
    year: 1798,
    unlocks: {
      permanent_prestige: 10,
      political_capital_gain_modifier: 0.02,
      pop_growth_modifier: -0.25
    }
  },

  neo_gothic: {
    name: "Neo-Gothic",
    description: "A revivalist architectural style of the 19th century that drew inspiration from mediaeval Gothic architecture, featuring pointed arches, ribbed vaults, and intricate ornamentation, reflecting a romanticised interest in the Middle Ages.",
    prerequisite_techs: ["romanticism"],
    research_cost: 1400,
    year: 1848,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  linguistic_nationalism: {
    name: "Linguistic Nationalism",
    description: "The association of language with national identity helped forge the first nationalist movements, with emphasis falling upon the preservation and promotion of a specific language as a symbol of cultural heritage and political sovereignty.",
    prerequisite_techs: ["standardisation_of_language"],
    research_cost: 1400,
    year: 1835,
    unlocks: {
      infamy_limit: 0.05,
      cultural_integration_speed: 0.02
    }
  },
  hegelianism: {
    name: "Hegelianism",
    description: "Hegelianism refers to the philosophical system developed by Georg Wilhelm Friedrich Hegel, emphasising the concept of dialectical reasoning, historical progress, and the idea that reality is the result of conflicting forces and the resolution of contradictions, contributing to the emergence of future ideologies.",
    prerequisite_techs: ["kantianism"],
    research_cost: 1400,
    year: 1807,
    unlocks: {
      cultural_prestige_to_primary_culture: 5,
      prestige_gain: 0.01
    }
  },
  nationalism_and_imperialism: {
    name: "Nationalism & Imperialism",
    description: "The assertion of national identity and prestige abroad through place in the sun thinking led to the development of Late Imperialism, with expansionist policies and practices of dominant powers seeking to control and exploit territories and resources in a zero-sum game.",
    prerequisite_techs: ["malthusian_thought"],
    research_cost: 1400,
    year: 1848,
    unlocks: {
      unlock_building: "worlds_fair",
      maximum_expeditions: 1,
      political_capital_gain_modifier: 0.15,
      ruling_party_support: 0.05
    }
  },

  realism: {
    name: "Realism",
    description: "A 19th century artistic and literary movement, Realism sought to depict everyday life and social realities with accuracy and objectivity, challenging romantic idealism and exploring themes of social inequality and the human condition.",
    prerequisite_techs: ["neo_gothic"],
    research_cost: 1600,
    year: 1848,
    unlocks: {
      unlock_building: ["camera_factories", "flats"],
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  literacy_initiatives: {
    name: "Literacy Initiatives",
    description: "Pushes for mass literacy encompass both educational programmes and policies aimed at promoting reading and writing skills amongst the general population, fostering greater access to knowledge, empowerment and participation in civic life.",
    prerequisite_techs: ["linguistic_nationalism"],
    research_cost: 1600,
    year: 1850,
    unlocks: {
      unlock_building: "schoolhouses",
      literacy_gain: 0.15,
      primary_education_efficiency: 0.10
    }
  },
  positivism: {
    name: "Positivism",
    description: "Popularised by Auguste Comte, Positivism advocated the use of scientific methods and empirical observation to understand and explain the world, emphasising the importance of verifiable facts, data, and logical reasoning in acquiring knowledge.",
    prerequisite_techs: ["nationalism_and_imperialism"],
    research_cost: 1600,
    year: 1849,
    unlocks: {
      research_slots: 1,
      research_efficiency: 0.05
    }
  },

  proto_impressionism: {
    name: "Proto-Impressionism",
    description: "A transitional phase between Realism and Impressionism in the late 19th century, proto-impressionism was spearheaded by artists such as J.M.W. Turner, who focused on loose brushwork and an increasing emphasis on capturing light, atmosphere, and fleeting moments.",
    prerequisite_techs: ["realism"],
    research_cost: 1800,
    year: 1844,
    unlocks: {
      unlock_building: "nightclubs",
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  naturalism: {
    name: "Naturalism",
    description: "An artistic and literary movement of the late 19th and early 20th centuries that sought to present a detailed and objective representation of reality, often addressing social issues such as the deterministic influence of environment and heredity on human behaviour.",
    prerequisite_techs: ["hegelianism"],
    research_cost: 1800,
    year: 1880,
    unlocks: {
      permanent_prestige: 5,
      cultural_prestige_to_primary_culture: 5,
      prestige_gain: 0.01
    }
  },
  functionalism: {
    name: "Functionalism",
    description: "A framework for building theories that see society as a complex system whose parts work together to promote solidarity and stability.",
    prerequisite_techs: ["positivism"],
    research_cost: 1800,
    year: 1874,
    unlocks: {
      unlock_building: "archivists",
      permanent_prestige: 10,
      research_efficiency: 0.02
    }
  },

  impressionism: {
    name: "Impressionism",
    description: "Titled after Monet’s 'Impression, Sunrise', Impressionism emphasised the importance of immediate visual impression and subjective perception of light and colour, characterised by short brushstrokes, and an emphasis on capturing the transient nature of a scene.",
    prerequisite_techs: ["proto_impressionism"],
    research_cost: 2000,
    year: 1872,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  mandatory_schooling: {
    name: "Mandatory Schooling",
    description: "Mandatory education or schooling refers to government-imposed laws and regulations that make education compulsory for a certain age group, aiming to provide equal educational opportunities, promote social integration, and foster a literate and skilled population.",
    prerequisite_techs: ["literacy_initiatives"],
    research_cost: 2000,
    year: 1852,
    unlocks: {
      unlock_building: ["community_centres", "stadiums"],
      primary_education_efficiency: 0.15
    }
  },
  neo_kantianism: {
    name: "Neo-Kantianism",
    description: "Neo-Kantianism represents a revival and reinterpretation of Immanuel Kant’s philosophy in the late 19th and early 20th centuries, exploring topics such as epistemology, ethics and metaphysics, whilst incorporating contemporary scientific and philosophical developments.",
    prerequisite_techs: ["naturalism"],
    research_cost: 2000,
    year: 1860,
    unlocks: {
      cultural_prestige_to_primary_culture: 5
    }
  },
  biologism: {
    name: "Biologism",
    description: "A philosophical and sociological approach emphasising the influence of biological factors, such as genetics and evolutionary processes on human behaviour.",
    prerequisite_techs: ["positivism"],
    research_cost: 2000,
    year: 1892,
    unlocks: {
      unlock_building: "research_complexes",
      higher_education_efficiency: 0.05,
      research_efficiency: 0.02
    }
  },

  symbolism: {
    name: "Symbolism",
    description: "An artistic and literary movement of the late 19th century, symbolists sought to evoke emotions and convey ideas through symbolic representations in their works, often exploring dreams, the subconscious, and spiritual or mystical themes.",
    prerequisite_techs: ["impressionism"],
    research_cost: 2500,
    year: 1857,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  analytic_philosophy: {
    name: "Analytic Philosophy",
    description: "Prominent in the 20th century, analytic philosophy focuses on the logical analysis of language, concepts and arguments, seeking precision and clarity in philosophical discourse through the rigorous examination of thought and language.",
    prerequisite_techs: ["neo_kantianism"],
    research_cost: 2500,
    year: 1925,
    unlocks: {
      higher_education_efficiency: 0.05
    }
  },
  social_science: {
    name: "Social Science",
    description: "Encompassing disciplines such as sociology, anthropology, and economics, the specialisation of the social sciences led to initial output increases across fields that studied human society, behaviour and institutions using empirical methods.",
    prerequisite_techs: ["biologism"],
    research_cost: 2500,
    year: 1895,
    unlocks: {
      research_slots: 1,
      ahead_of_time_penalty: -0.15
    }
  },

  post_impressionism: {
    name: "Post-Impressionism",
    description: "The artistic developments that followed the Impressionist movement in the late 19th and early 20th centuries are referred to by this name, featuring artists such as Vincent van Gogh and Paul Cézanne, who explored new ways of representing emotions, form, and perspective.",
    prerequisite_techs: ["symbolism"],
    research_cost: 3000,
    year: 1906,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  universal_literacy: {
    name: "Universal Literacy",
    description: "Universal literacy refers to the goal of achieving literacy for all individuals in a given society, regardless of background or socioeconomic status, helping to promote equal access to education, information, and opportunities.",
    prerequisite_techs: ["mandatory_schooling"],
    research_cost: 3000,
    year: 1890,
    unlocks: {
      literacy_gain: 0.25,
      education_efficiency: 0.05
    }
  },
  phenomenology: {
    name: "Phenomenology",
    description: "Developed by Edmund Husserl, Phenomenology focused on the study of subjective conscious experience and the structures of consciousness, emphasising the first-person perspective and the importance of lived experience in understanding the world.",
    prerequisite_techs: ["analytic_philosophy"],
    research_cost: 3000,
    year: 1900,
    unlocks: {
      unlock_building: "research_institutes",
      research_slots: 1,
      research_efficiency: 0.05
    }
  },
  revanchism: {
    name: "Revanchism",
    description: "A political movement that seeks to avenge perceived territorial losses and the reduction of national prestige, revanchists called for extraordinary military growth and mobilisation at all levels of society for the nation.",
    prerequisite_techs: ["social_science"],
    year: 1871,
    research_cost: 3000,
    unlocks: {
      infamy_limit: 0.10,
      unlock_cb: "revanchism"
    }
  },

  fauvism: {
    name: "Fauvism",
    description: "An early 20th century art movement that emphasised bold and vibrant colours, Fauvism disregarded naturalistic representation in favour of expressing emotion and subjective experiences through non-representational forms.",
    prerequisite_techs: ["post_impressionism"],
    research_cost: 3500,
    year: 1904,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  grammatical_standardisation: {
    name: "Grammatical Standardisation",
    description: "The establishment of a set of rules and conventions for grammar and linguistic usage through various national academies aimed to create uniformity and clarity in written and spoken communication within a particular language or dialect.",
    prerequisite_techs: ["universal_literacy"],
    research_cost: 3500,
    year: 1909,
    unlocks: {
      cultural_integration_speed: 0.05
    }
  },
  anti_rationalism: {
    name: "Anti-Rationalism",
    description: "A philosophical stance that challenges the primacy of reason, and emphasises the significance of intuition, emotions, and subjective experience in understanding and interpreting the world.",
    prerequisite_techs: ["phenomenology"],
    research_cost: 3500,
    year: 1909,
    unlocks: {
      cultural_prestige_to_primary_culture: 5
    }
  },
  social_alienation: {
    name: "Social Alienation",
    description: "Marx’s theory of alienation aimed to explain the development and continuation of capitalism, by describing the experience of human life as meaningless or worthless in modern capitalist society.",
    prerequisite_techs: ["revanchism"],
    research_cost: 3500,
    year: 1932,
    unlocks: {
      communism: 0.01,
      socialism: 0.01
    }
  },

  cubism: {
    name: "Cubism",
    description: "Pioneered by artists like Pablo Picasso and Georges Braque, Cubism revolutionised artistic representation by depicting subjects from multiple perspectives simultaneously, fragmenting forms and challenging traditional notions of space and reality.",
    prerequisite_techs: ["fauvism"],
    research_cost: 4000,
    year: 1910,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  pragmatism: {
    name: "Pragmatism",
    description: "A philosophical approach that focuses on practical consequences and the usefulness of ideas, actions and empirical results in determining the value and validity of beliefs and theories.",
    prerequisite_techs: ["anti_rationalism"],
    research_cost: 4000,
    year: 1880,
    unlocks: {
      cultural_prestige_to_primary_culture: 0.05
    }
  },

  expressionism: {
    name: "Expressionism",
    description: "Prominent in the early 20th century, Expressionism aimed to convey emotional and subjective experiences through art, employing distorted forms, vivid colours and exaggerated gestures to express the inner turmoil and psychological states of the artist.",
    prerequisite_techs: ["cubism"],
    research_cost: 4500,
    year: 1901,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  continental_philosophy: {
    name: "Continental Philosophy",
    description: "A broad philosophical tradition associated with European thinkers, characterised by a focus on existentialism, phenomenology, hermeneutics and critical theory that aimed to explore questions of human existence, language, power, and culture.",
    prerequisite_techs: ["pragmatism"],
    research_cost: 4500,
    year: 1928,
    unlocks: {
      cultural_prestige_to_primary_culture: 5,
      communism: 0.01,
      socialism: 0.01,
      political_capital_gain_modifier: -0.02
    }
  },
  hypernationalism: {
    name: "Hypernationalism",
    description: "An extreme form of nationalism characterised by excessive devotion and loyalty to one’s nation or ethnic group, often accompanied by xenophobia, aggressive expansionist policies, and the belief in the superiority of one’s own culture or race.",
    prerequisite_techs: ["social_alienation"],
    year: 1919,
    research_cost: 4500,
    unlocks: {
      infamy_limit: 0.05
    }
  },

  surrealism: {
    name: "Surrealism",
    description: "Emerging during the fin-de-siecle, Surrealism sought to unlock the power of the unconscious mind and explore the realm of dreams, fantasies, and irrationality, using unexpected juxtapositions, dreamlike imagery, and symbolic elements to challenge conventional reality.",
    prerequisite_techs: ["expressionism"],
    research_cost: 5000,
    year: 1920,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  standardisation_of_foreign_names: {
    name: "Standardisation of Foreign Names",
    description: "The standardisation of foreign phonetic spelling during the 1900s-1920s established consistent rules and guidelines for transliterating or translating names from one language or writing system to another, promoting clarity and consistency in cross-cultural communication.",
    prerequisite_techs: ["grammatical_standardisation"],
    research_cost: 5000,
    year: 1914,
    unlocks: {
      literacy_gain: 0.02,
      political_capital_gain_modifier: 0.01
    }
  },
  post_structuralism: {
    name: "Post-Stucturalism",
    description: "A theoretical framework that emerged in the late 20th century, challenging the idea of fixed and stable meanings, identities, and structures, instead opting to explore the power dynamics, language, and social constructions that shape knowledge and reality.",
    prerequisite_techs: ["continental_philosophy"],
    research_cost: 5000,
    year: 1945,
    unlocks: {
      cultural_prestige_to_primary_culture: 5,
      communism: 0.01,
      socialism: 0.01,
      political_capital_gain_modifier: -0.02
    }
  },
  irredentism: {
    name: "Irredentism",
    description: "A political movement or policy advocating for the reclamation of territory perceived as being inhabited by a group sharing a common ethnic, cultural or historical background, often based on claims of historical injustice or the desire for national unification.",
    prerequisite_techs: ["hypernationalism"],
    research_cost: 5000,
    year: 1923,
    unlocks: {
      infamy_limit: 0.10
    }
  },

  bauhaus_movement: {
    name: "Bauhaus Movement",
    description: "A revolutionary art school founded in Germany in 1919, Bauhaus aimed to combine the fine arts, crafts and architecture by emphasising functional design, simplicity, and the integration of form and function.",
    prerequisite_techs: ["surrealism"],
    research_cost: 5500,
    year: 1919,
    unlocks: {
      permanent_prestige: 20,
      districts: 1,
      prestige_gain: 0.01
    }
  },
  language_regulation: {
    name: "Language Regulation",
    description: "National academies promoted the establishment of rules, standards, and policies governing the use and structure of language within a community or society, aiming to ensure clarity, consistency, and effective communication.",
    prerequisite_techs: ["standardisation_of_foreign_names"],
    research_cost: 5500,
    year: 1925,
    unlocks: {
      cultural_integration_speed: 0.05
    }
  },
  process_philosophy: {
    name: "Process Philosophy",
    description: "A philosophical perspective that focuses on the dynamic and interconnected nature of reality, emphasising change, becoming, and the discrete flow of events and experiences rather than fixed and static entities.",
    prerequisite_techs: ["post_structuralism"],
    research_cost: 5500,
    year: 1925,
    unlocks: {
      cultural_prestige_to_primary_culture: 5
    }
  },
  social_studies: {
    name: "Social Studies",
    description: "An interdisciplinary field of study that encompasses various disciplines such as sociology, anthropology, history, political science, and economics, examining social relationships, human behaviour, and societal structures to understanding and address social issues and phenomena.",
    prerequisite_techs: ["irredentism"],
    research_cost: 5500,
    year: 1920,
    unlocks: {
      unlock_building: "community_colleges",
      research_efficiency: 0.05
    }
  },

  modern_art: {
    name: "Modern Art",
    description: "Emerging in the mid-20th century, Modern Art was characterised by a departure from traditional styles, and a focus on experimentation, innovation, and subjective expression - the conception of the art as art, reflecting the shifting cultural, social and technological landscape of the time.",
    prerequisite_techs: ["bauhaus_movement"],
    research_cost: 6000,
    year: 1940,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  international_romanisation: {
    name: "International Romanisation",
    description: "As the Latin alphabet came to be seen as a symbol of internationalisation and modernity, languages such as Turkish, as well as various Chinese and Japanese scripts began attempts to change the transliteration and representation of writing systems, facilitating digitalisation, cross-cultural communication and the standardisation of spelling and pronunciation.",
    prerequisite_techs: ["language_regulation"],
    research_cost: 6000,
    year: 1928,
    unlocks: {
      cultural_prestige_to_primary_culture: 5,
      cultural_integration_speed: 0.02
    }
  },

  post_expressionism: {
    name: "Post-Expressionism",
    description: "Post-Expressionism refers to a period following the expressionist movement in the art, where artists explored new styles and approaches that moved away from the intense emotions and distortion of form associated with expressionism, often embracing more objective and restrained artistic techniques.",
    prerequisite_techs: ["modern_art"],
    research_cost: 6500,
    year: 1945,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  late_modern_language: {
    name: "Late Modern Language",
    description: "The digitalisation and the standardisation of slang terms and terminology helped characterise significant changes in vocabulary, grammar, and usage influenced by social, technological, and cultural developments.",
    prerequisite_techs: ["international_romanisation"],
    research_cost: 6500,
    year: 1945,
    unlocks: {
      cultural_prestige_to_primary_culture: 5,
      literacy_gain: 0.10
    }
  },
  existentialism: {
    name: "Existentialism",
    description: "A philosophical movement that emerged in postwar Europe, Existentialism focuses on an individual’s freedom, responsibility, and existence in an absurd and uncertain world, emphasising subjective experience, personal choice, and the search for meaning and authenticity.",
    prerequisite_techs: ["process_philosophy"],
    research_cost: 6500,
    year: 1945,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },

  brutalism: {
    name: "Brutalism",
    description: "An architectural style that emerged in the mid-20th century, Brutalism is characterised by raw, exposed concrete surfaces and bold geometric forms, reflecting an emphasis on functionality and the aesthetic of structure.",
    prerequisite_techs: ["post_expressionism"],
    research_cost: 7000,
    year: 1950,
    unlocks: {
      unlock_building: "commie_blocks",
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  critical_theory: {
    name: "Critical Theory",
    description: "Critical theory is a philosophical and sociological approach that critiques social and political systems through dialectics, aiming to uncover power structures, inequalities, and oppression in society, aiming to offer insights towards social transformation and emancipation.",
    prerequisite_techs: ["existentialism"],
    year: 1947,
    research_cost: 7000,
    unlocks: {
      prestige_gain: 0.02,
      communism: 1,
      socialism: 1,
      political_capital_gain_modifier: -0.05
    }
  },
  ideological_thought: {
    name: "Ideological Thought",
    description: "The development and modern exploration of systems of ideas, beliefs, values, and doctrines that shape political, social and cultural ideologies, influencing the actions and perspectives of individuals and societies.",
    prerequisite_techs: ["social_studies"],
    year: 1957,
    research_cost: 7000,
    unlocks: {
      political_capital_gain_modifier: 0.05,
      ruling_party_support: 0.03
    }
  },

  post_modernism: {
    name: "Post-Modernism",
    description: "Post-Modernism is a cultural and intellectual movement that emerged in the mid-20th century, challenging the principles and assumptions of modernism by emphasising subjectivity, relativism, and the deconstruction of traditional norms, boundaries, and grand narratives.",
    prerequisite_techs: ["brutalism"],
    year: 1949,
    research_cost: 7500,
    unlocks: {
      higher_education_efficiency: 0.05,
      education_efficiency: -0.02
    }
  },

  minimalism: {
    name: "Minimalism",
    description: "An artistic style that emerged in the mid-20th century, characterised by adherence to simplicity, austerity, and reduction of form and materials to their essential elements, often conveying a sense of clarity, precision, and focus of the fundamental aspects of the work, borrowing from earlier Bauhaus conceptions.",
    prerequisite_techs: ["post_modernism"],
    year: 1960,
    research_cost: 8000,
    unlocks: {
      unlock_building: "condominiums",
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  post_analytic_philosophy: {
    name: "Post-Analytic Philosophy",
    description: "A movement that emerged in the mid-20th century, moving beyond the methodology of traditional analytic philosophy to explore broader philosophical questions concerning meaning, knowledge, and the nature of reality.",
    prerequisite_techs: ["critical_theory"],
    year: 1969,
    research_cost: 8000,
    unlocks: {
      cultural_prestige_to_primary_culture: 5,
      higher_education_efficiency: 0.02
    }
  },
  international_relations_and_modern_sovereignty: {
    name: "International Relations and Modern Sovereignty",
    description: "The study of international relations and modern sovereignty examines the complex dynamics and interactions between nation-states and the contemporary global order, focusing on issues of power, diplomacy, cooperation, and hard/soft power in a rapidly changing world.",
    prerequisite_techs: ["ideological_thought"],
    year: 1973,
    research_cost: 8000,
    unlocks: {
      diplomatic_slots: 2
    }
  },

  contemporary_art: {
    name: "Contemporary Art",
    description: "Contemporary art refers to the art produced in the present era and the postmodern space, encompassing a wide range of artistic styles, mediums, and approaches that reflect the diverse cultural, social, and political landscapes of the contemporary world.",
    prerequisite_techs: ["minimalism"],
    year: 1970,
    research_cost: 8500,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  protection_of_minority_languages: {
    name: "Protection of Minority Languages",
    description: "A reversal of earlier prescriptivist tendencies, the protection of minority languages involves efforts to preserve, promote, and safeguard the linguistic rights and cultural heritage of minority language communities, recognising their value in maintaining diversity, cultural expression, and fostering inclusive societies.",
    prerequisite_techs: ["late_modern_language"],
    year: 1979,
    research_cost: 8500,
    unlocks: {
      political_capital_gain_modifier: 0.03,
      non_core_manpower: 0.02
    }
  },
  ethicism: {
    name: "Ethicism",
    description: "An ethical framework or movement that emphasises ethical principles and values in individual and collective decision-making, helping to address moral dilemmas through formal-informal logic, and promoting ethical behaviour in various spheres of life.",
    prerequisite_techs: ["post_analytic_philosophy"],
    year: 1985,
    research_cost: 8500,
    unlocks: {
      diplomatic_slots: 1,
      political_capital_gain_modifier: -0.02
    }
  },

  digital_art: {
    name: "Digital Art",
    description: "Digital Art encompasses artistic works and practices that utilise digital technology, such as computer-generated graphics, digital painting, interactive installations and multimedia experiences, enabling new forms of artistic expression and exploring the intersection of art and technology.",
    prerequisite_techs: ["contemporary_art"],
    research_cost: 9000,
    year: 1985,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  contemporary_ethicism: {
    name: "Contemporary Ethicism",
    description: "Referring to ethical theories and perspectives that have emerged in the modern era, Contemporary Ethicism addresses present moral and ethical issues, aiming to provide new insights and approaches to moral decision-making and behaviour.",
    prerequisite_techs: ["ethicism"],
    research_cost: 9000,
    year: 1990,
    unlocks: {
      diplomatic_slots: 1,
      political_capital_gain_modifier: -0.02,
      research_efficiency: -0.02
    }
  },
  modern_cultural_integration: {
    name: "Modern Cultural Integration",
    description: "Cultural integration refers to the process by which individuals or groups from different cultural backgrounds come together, interact, and exchange ideas, values, and practices, leading to the blending and mutual enrichment of cultures.",
    prerequisite_techs: ["international_relations_and_modern_sovereignty"],
    research_cost: 9000,
    year: 1991,
    unlocks: {
      cultural_integration_speed: 0.05,
      non_core_manpower: 0.02
    }
  },

  vector_art: {
    name: "Vector Art",
    description: "A digital art form that relies on mathematical equations to create and manipulate geometric shapes and lines, the sum of which results in scalable and resolution-independent images that can be resized without losing quality.",
    prerequisite_techs: ["digital_art"],
    research_cost: 9500,
    year: 2010,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  language_barrier_disruption: {
    name: "Language Barrier Disruption",
    description: "Language barrier disruption involves the use of technology, communication tools, and language services to overcome language barriers and facilitate effective communication between individuals or communities speaking different languages.",
    prerequisite_techs: ["protection_of_minority_languages"],
    research_cost: 9500,
    year: 2006,
    unlocks: {
      education_efficiency: 0.05,
      literacy_gain: 0.05,
      research_efficiency: 0.02
    }
  },
  object_oriented_ontology: {
    name: "Object-Oriented Ontology",
    description: "Developed in the 21st century, OOO is a philosophical approach that emphasises the agency and reality of non-human entities and objects, aiming to break anthropocentric perspectives by exploring the interconnectedness and equal significance of all things.",
    prerequisite_techs: ["contemporary_ethicism"],
    research_cost: 9500,
    year: 2009,
    unlocks: {
      cultural_prestige_to_primary_culture: 0.05,
      higher_education_efficiency: 0.02
    }
  },

  interactive_artistic_displays: {
    name: "Interactive Artistic Displays",
    description: "Interactive artistic displays encompass artworks or installations that encourage viewer participation and engagement, allowing the audience to actively interact with the artwork, influencing its form, content, or experience.",
    prerequisite_techs: ["vector_art"],
    research_cost: 10000,
    year: 2016,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  ai_translators: {
    name: "AI Translators",
    description: "Beginning in the 2000s, AI translation was one of the first relevant fields to displace human workers by automatically translating text or speech from one language to another through machine learning algorithms, enhancing communication and bridging language barriers between monolinguistic speakers.",
    prerequisite_techs: ["language_barrier_disruption"],
    research_cost: 10000,
    year: 2016,
    unlocks: {
      permanent_prestige: 15,
      cultural_integration_speed: 0.05
    }
  },

  holographic_art: {
    name: "Holographic Art",
    description: "Holography as art involves the creation and display of three-dimensional holographic images or installations, using light diffraction and interference to produce realistic and immersive visual experiences.",
    prerequisite_techs: ["interactive_artistic_displays"],
    research_cost: 10500,
    year: 2025,
    unlocks: {
      permanent_prestige: 20,
      prestige_gain: 0.01
    }
  },
  global_lingua_franca: {
    name: "Global Lingua Franca",
    description: "A global lingua franca refers to a widely spoken language that has become the dominant international form of communication amongst people from different linguistic backgrounds on a global scale, facilitating international interactions and understanding.",
    prerequisite_techs: ["ai_translators"],
    research_cost: 10500,
    year: 2030,
    unlocks: {
      diplomatic_slots: 1,
      tax_revenue: 0.05
    }
  },
  global_civilisation: {
    name: "Global Civilisation",
    description: "Global civilisation refers to the concept of a unified human civilisation that transcends national boundaries that encompasses shared values, principles and interconnectedness, emphasising the global interdependence and common destiny of humanity.",
    prerequisite_techs: ["modern_cultural_integration"],
    research_cost: 10500,
    year: 2030,
    unlocks: {
      diplomatic_slots: 2
    }
  }
};
