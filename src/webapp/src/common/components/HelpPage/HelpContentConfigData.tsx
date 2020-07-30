export const HelpContentConfigData = {
  HelpContent: [
    {
      id: 'quickpay',
      topicName: 'Quick Pay',
      subtopics: [
        {
          question: 'What is Astro Quick Pay?',
          answer:
            "Astro Quick Pay is a convenient method to check your Bill Summary, Account Status and pay Astro bills at your convenience with immediate payment posting, right from home. Visit <a href='/'>Astro Quick Pay</a> to pay your bill now.",
        },
        {
          question: 'What information is required to pay my Astro bill?',
          answer:
            'You would need your 10-digit account number and your email address.',
        },
        {
          question: 'What is my account number?',
          answer:
            'Your Astro account number is a 10-digit combination e.g. 08XXXXXXXX.  You may log on to Astro Self Service or refer to the top right-hand corner of your bill.',
        },
        {
          question: 'Is my personal information protected by the PDPA?',
          answer:
            "Yes, Astro is bounded by the PDPA act. All information received will be used in accordance with our <a href='https://www.astro.com.my/privacy-notice'>Privacy Notice</a>.",
        },
        {
          question:
            'Are there any extra charges incurred if I make a payment through Astro Quick Pay?',
          answer:
            'Of course not, it is a value-added service introduced for your convenience.',
        },
      ],
    },
    {
      id: 'billing',
      topicName: 'Billing',
      subtopics: [
        {
          question:
            'What happens if I pay more than what is stated in my bill?',
          answer:
            'The balance will be credited into your account, which will be reflected when you receive your next bill. The balance credit will be used to offset your bill balance.',
        },
        {
          question:
            'What do I do if I still receive SMS payment reminders even though I have already made payment?',
          answer:
            'Please disregard the reminder if payment had been made and do check if you have any outstanding balance on <a href="/">Astro Quick Pay</a>.',
        },
        {
          question: 'My account is disconnected how do I reconnect my account?',
          answer:
            'Your disconnected services would resume within 1 hour after you have paid your "Total Overdue Charges".  Please check your Account status, Bill Summary and pay on <a href=\'/\'>Astro Quick Pay</a>.',
        },
        {
          question:
            'I have sufficient funds in my account. Why is my payment unsuccessful?',
          answer:
            "Please check SMS received on the unsuccessful payment status and should you require further clarification contact your issuing bank for clarification or contact us via <a href='https://api.whatsapp.com/send?phone=60395433838&text=Hi'>WhatsApp</a>.",
        },
      ],
    },
    {
      id: 'apg',
      topicName: 'APG',
      subtopics: [
        {
          question: 'What payment methods are available in Astro Quick Pay?',
          answer:
            '<ol>' +
            '<li>' +
            'Credit or Debit Cards' +
            '<ul>' +
            '<li>Visa</li>' +
            '<li>Mastercard</li>' +
            '</ul>' +
            '</li>' +
            '<li>Maybank2U - Pay using your Maybank2U account.</li>' +
            '<li>FPX - Pay using any local bank account via FPX.</li>' +
            '</ol>',
        },
        {
          question:
            'What is "Add Billing Reminder to Google Calendar" and how does it help?',
          answer:
            'You can add a reminder to pay your bill, on your Google Calendar with one click. Enjoy uninterrupted services, by remembering to pay your bill on time.',
        },
        {
          question: 'Further Help!',
          answer:
            "For any issues, contact us via <a href='https://api.whatsapp.com/send?phone=60395433838&text=Hi'>WhatsApp</a>.",
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
