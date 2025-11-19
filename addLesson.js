const { db } = require('./admin-init');

const lessonsData = [
  {
    title: "Introduction to the Khmer Rouge",
    description: "An overview of the movement, its ultra-Maoist agrarian ideology, and the historical context of conflict in Cambodia leading up to 1975.",
    order: 1,
    module: "Khmer Rouge History"
  },
  {
    title: "The Start of the Khmer Rouge Rule (17 April 1975)",
    description: "Focuses on the fall of Phnom Penh, the immediate forced evacuation of cities, and the declaration of 'Year Zero'—the start of radical, enforced change across Cambodia.",
    order: 2,
    module: "Khmer Rouge History"
  },
  {
    title: "Pol Pot: Who is the Leader?",
    description: "A biographical profile of Saloth Sar (Pol Pot), exploring his political background, his ascent to power, and his role as the regime's primary architect of mass terror and extreme policies.",
    order: 3,
    module: "Khmer Rouge History"
  },
  {
    title: "Khmer Rouge Rule: Life Under the Angkar",
    description: "A comprehensive study of daily life under the regime, focusing on the forced collective farms, labor policies, the elimination of currency, and the targeting of former officials and intellectuals.",
    order: 4,
    module: "Khmer Rouge History"
  },
  {
    title: "The Killing Fields and the Scope of the Genocide",
    description: "An examination of the systematic purges, mass executions (The Killing Fields), and the security prison system (S-21/Tuol Sleng) used for the elimination of perceived enemies, detailing the scope of the Cambodian Genocide.",
    order: 5,
    module: "Khmer Rouge History"
  },
  {
    title: "The End of the Khmer Rouge (7 January 1979)",
    description: "Analyzes the decisive Vietnamese invasion, the subsequent collapse of the Democratic Kampuchea government, and the retreat of the Khmer Rouge forces, marking the end of their brutal four-year rule.",
    order: 6,
    module: "Khmer Rouge History"
  },
  {
        title: "Establishment of the Protectorate (1863)",
    description: "Covers the treaties signed by King Norodom that placed Cambodia under French protection, the strategic reasons for France's interest (protecting Cochin China), and the initial constraints placed on the monarchy.",
    order: 1,
    module: "French Colonial Era in Cambodia"
  },
  {
    title: "Colonial Administration and Reforms",
    description: "Details the structure of French rule, including the role of the Résident Supérieur, the centralization of power away from the monarchy, and the implementation of judicial and tax reforms.",
    order: 2,
    module: "French Colonial Era in Cambodia"
  },
  {
    title: "Economic Exploitation and Infrastructure",
    description: "Focuses on the French economic policies, including the forced cultivation of cash crops (like rubber and pepper), the establishment of monopolies (salt, alcohol, opium), and the development of rudimentary infrastructure like roads and railways.",
    order: 3,
    module: "French Colonial Era in Cambodia"
  },
  {
    title: "Socio-Cultural Impact and Education",
    description: "Examines the changes to the Cambodian class system, the introduction of the French educational system (which trained a new local elite), and the cultural clashes and influence of French language and ideas.",
    order: 4,
    module: "French Colonial Era in Cambodia"
  },
  {
    title: "Rise of Nationalist and Independence Movements",
    description: "Analyzes the growth of anti-colonial sentiment, the influence of the Japanese occupation during WWII, and the emergence of early nationalist figures like Son Ngoc Thanh and the Khmer Issarak.",
    order: 5,
    module: "French Colonial Era in Cambodia"
  },
  {
    title: "The Royal Crusade for Independence (1953)",
    description: "Focuses on King Norodom Sihanouk's diplomatic campaign that led to full independence from France, the final agreements, and the state of Cambodia at the close of the colonial period.",
    order: 6,
    module: "French Colonial Era in Cambodia"
  },
  {
    title: "The Birth of Sangkum Reastr Niyum (1955)",
    description: "Covers King Sihanouk's abdication to enter politics, the creation of the Sangkum (People's Socialist Community) political movement, and its dominance in the national elections.",
    order: 1,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "Policy of Neutrality and Non-Alignment",
    description: "Details Cambodia's foreign policy during the Cold War, balancing relations with the US, China, and the Soviet Union, and its commitment to non-alignment in regional conflicts.",
    order: 2,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "Economic and Social Modernization",
    description: "Focuses on Sihanouk's national development agenda, including efforts in education, public health, and state-led industrialization projects during the 1960s.",
    order: 3,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "Suppression of Internal Opposition",
    description: "Examines the political environment, including the suppression of both right-wing opposition (like the Khmer Serei) and the nascent communist movement (which later became the Khmer Rouge).",
    order: 4,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "The Vietnam War and Border Incursions",
    description: "Analyzes the impact of the Vietnam War on Cambodian sovereignty, the use of the Ho Chi Minh Trail by North Vietnamese forces, and the resulting destabilization of the eastern border.",
    order: 5,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "The Coup of 1970 and the End of Sangkum",
    description: "Focuses on the events of March 1970, when General Lon Nol and Prince Sirik Matak overthrew Sihanouk, leading to the establishment of the Khmer Republic and intensifying the civil war.",
    order: 6,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "The Birth of Sangkum Reastr Niyum (1955)",
    description: "Covers King Sihanouk's abdication to enter politics, the creation of the Sangkum (People's Socialist Community) political movement, and its dominance in the national elections.",
    order: 1,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "Policy of Neutrality and Non-Alignment",
    description: "Details Cambodia's foreign policy during the Cold War, balancing relations with the US, China, and the Soviet Union, and its commitment to non-alignment in regional conflicts.",
    order: 2,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "Economic and Social Modernization",
    description: "Focuses on Sihanouk's national development agenda, including efforts in education, public health, and state-led industrialization projects during the 1960s.",
    order: 3,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "Suppression of Internal Opposition",
    description: "Examines the political environment, including the suppression of both right-wing opposition (like the Khmer Serei) and the nascent communist movement (which later became the Khmer Rouge).",
    order: 4,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "The Vietnam War and Border Incursions",
    description: "Analyzes the impact of the Vietnam War on Cambodian sovereignty, the use of the Ho Chi Minh Trail by North Vietnamese forces, and the resulting destabilization of the eastern border.",
    order: 5,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "The Coup of 1970 and the End of Sangkum",
    description: "Focuses on the events of March 1970, when General Lon Nol and Prince Sirik Matak overthrew Sihanouk, leading to the establishment of the Khmer Republic and intensifying the civil war.",
    order: 6,
    module: "Sangkum Reastr Niyum Era (1953–1970)"
  },
  {
    title: "The Vietnamese Intervention and Liberation (January 1979)",
    description: "Covers the invasion by the Vietnamese military, the collapse of the Khmer Rouge regime, and the immediate humanitarian crisis that followed the conflict.",
    order: 1,
    module: "People’s Republic of Kampuchea (1979–1989)"
  },
  {
    title: "Establishment of the PRK Government",
    description: "Details the formation of the new government structure, backed by Vietnam, and the establishment of the Kampuchean People’s Revolutionary Party (KPRP) to administer the country.",
    order: 2,
    module: "People’s Republic of Kampuchea (1979–1989)"
  },
  {
    title: "National Reconstruction and Restoration",
    description: "Focuses on the massive effort to rebuild the collapsed social and physical infrastructure—reopening schools, hospitals, and factories, and stabilizing the national food supply after years of devastation.",
    order: 3,
    module: "People’s Republic of Kampuchea (1979–1989)"
  },
  {
    title: "The Coalition Government of Democratic Kampuchea (CGDK)",
    description: "Examines the persistent opposition to the PRK from a coalition of resistance groups, including the Khmer Rouge, the Sihanoukists, and the KPNLF, which held Cambodia's UN seat.",
    order: 4,
    module: "People’s Republic of Kampuchea (1979–1989)"
  },
  {
    title: "Soviet Bloc Influence and Aid",
    description: "Analyzes the crucial role of Soviet, Vietnamese, and Eastern Bloc financial and technical aid in keeping the new state functioning, and the impact of these relationships on PRK policy.",
    order: 5,
    module: "People’s Republic of Kampuchea (1979–1989)"
  },
  {
    title: "Vietnamese Troop Withdrawal (1989)",
    description: "Covers the gradual drawdown and final withdrawal of Vietnamese military forces, which paved the way for international peace negotiations and a shift towards the State of Cambodia.",
    order: 6,
    module: "People’s Republic of Kampuchea (1979–1989)"
  },
];

async function addDummyData() {
  console.log('Starting to add dummy lessons...');

  const addPromises = lessonsData.map(lesson => {
    return db.collection('lessons').add(lesson);
  });

  try {
    const documentReferences = await Promise.all(addPromises);
    
    console.log(`Success! Added ${documentReferences.length} lessons.`);
    documentReferences.forEach(docRef => {
      console.log(` - Added lesson with ID: ${docRef.id}`);
    });

  } catch (error) {
    console.error('Error adding dummy lessons:', error.message);
  }
}

addDummyData();