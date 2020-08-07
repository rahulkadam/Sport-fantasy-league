export const HelpContentConfigData = {
  HelpContent: [
    {
      id: 'fantasy',
      topicName: 'Sport Fantasy',
      subtopics: [
        {
          question: 'What is Sport Fantasy?',
          answer:
            'Sport fantasy is for Sport fan who want to play league with single team only, with Transfer restriction',
        },
        {
          question: 'What information is required to Play Sport Fantasy?',
          answer:
            'You would need to login to Fantasy site, create team, join any league or create League',
        },
        {
          question: 'What is my User Team?',
          answer:
            'Your User team will the the team which you will create only once, and then you will use transfer to play fantasy.',
        },
      ],
    },
    {
      id: 'transfer',
      topicName: 'Transfer',
      subtopics: [
        {
          question: 'What happens if I finished all transfer?',
          answer:
            'You have to use your transfer properly, we prefer that you should not user more that 3-4 transfer per match, so you can continue playing fantasy with till end',
        },
        {
          question: 'Can we transfer player inbetween match',
          answer:
            'Nope, you can not transfer playing during live match, as. If you made it, it will be used in next match',
        },
        {
          question: 'When can I see My Fantasy score?',
          answer:
            'Fantasy score, will get updated after match only once, we are not providing live score.',
        },
      ],
    },
  ],
};

export interface Subtopic {
  question: string;
  answer: string;
}

export interface HelpContentConfigObject {
  id: string;
  topicName: string;
  subtopics: Subtopic[];
}
