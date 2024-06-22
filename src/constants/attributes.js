import { createChapters } from '../utils/mics';

export const BOARDS = [
  { label: 'CBSE', value: 'cbse' },
  { label: 'ICSE', value: 'icse' },
  { label: 'STATE', value: 'state' },
];

export const STATES = [
  {
    label: 'Andhra Pradesh',
    value: 'andhra-pradesh',
  },
  {
    label: 'Arunachal Pradesh',
    value: 'arunachal-pradesh',
  },
  {
    label: 'Assam',
    value: 'assam',
  },
  {
    label: 'Bihar',
    value: 'bihar',
  },
  {
    label: 'Chhattisgarh',
    value: 'chhattisgarh',
  },
  {
    label: 'Delhi',
    value: 'delhi',
  },
  {
    label: 'Goa',
    value: 'goa',
  },
  {
    label: 'Gujarat',
    value: 'gujarat',
  },
  {
    label: 'Haryana',
    value: 'haryana',
  },
  {
    label: 'Himachal Pradesh',
    value: 'himachal Pradesh',
  },
  {
    label: 'Jharkhand',
    value: 'jharkhand',
  },
  {
    label: 'Karnataka',
    value: 'karnataka',
  },
  {
    label: 'Kerala',
    value: 'kerala',
  },
  {
    label: 'Madhya Pradesh',
    value: 'madhya Pradesh',
  },
  {
    label: 'Maharashtra',
    value: 'maharashtra',
  },
  {
    label: 'Manipur',
    value: 'manipur',
  },
  {
    label: 'Meghalaya',
    value: 'meghalaya',
  },
  {
    label: 'Mizoram',
    value: 'mizoram',
  },
  {
    label: 'Nagaland',
    value: 'nagaland',
  },
  {
    label: 'Odisha',
    value: 'odisha',
  },
  {
    label: 'Punjab',
    value: 'punjab',
  },
  {
    label: 'Rajasthan',
    value: 'rajasthan',
  },
  {
    label: 'Sikkim',
    value: 'sikkim',
  },
  {
    label: 'Tamil Nadu',
    value: 'tamil-nadu',
  },
  {
    label: 'Telangana',
    value: 'telangana',
  },
  {
    label: 'Tripura',
    value: 'tripura',
  },
  {
    label: 'Uttar Pradesh',
    value: 'uttar-pradesh',
  },
  {
    label: 'Uttarakhand',
    value: 'uttarakhand',
  },
  {
    label: 'West Bengal',
    value: 'west-bengal',
  },
];

export const CLASSES = [
  {
    label: 'Class 1',
    value: 'class1',
    series: [
      { value: 'cyber-navigate', label: 'Cyber Navigate', chapters: createChapters(7) },
      { value: 'it-kode', label: 'IT Kode', chapters: createChapters(6) },
      { value: 'krypto', label: 'Krypto', chapters: createChapters(6) },
      { value: 'analog', label: 'Analog', chapters: createChapters(6) },
    ],
  },
  {
    label: 'Class 2',
    value: 'class2',
    series: [
      { value: 'cyber-navigate', label: 'Cyber Navigate', chapters: createChapters(7) },
      { value: 'it-kode', label: 'IT Kode', chapters: createChapters(7) },
      { value: 'krypto', label: 'Krypto', chapters: createChapters(7) },
      { value: 'analog', label: 'Analog', chapters: createChapters(6) },
    ],
  },
  {
    label: 'Class 3',
    value: 'class3',
    series: [
      { value: 'cyber-navigate', label: 'Cyber Navigate', chapters: createChapters(7) },
      { value: 'it-kode', label: 'IT Kode', chapters: createChapters(7) },
      { value: 'krypto', label: 'Krypto', chapters: createChapters(9) },
      { value: 'analog', label: 'Analog', chapters: createChapters(6) },
    ],
  },
  {
    label: 'Class 4',
    value: 'class4',
    series: [
      { value: 'cyber-navigate', label: 'Cyber Navigate', chapters: createChapters(9) },
      { value: 'it-kode', label: 'IT Kode', chapters: createChapters(9) },
      { value: 'krypto', label: 'Krypto', chapters: createChapters(9) },
      { value: 'analog', label: 'Analog', chapters: createChapters(6) },
    ],
  },
  {
    label: 'Class 5',
    value: 'class5',
    series: [
      { value: 'cyber-navigate', label: 'Cyber Navigate', chapters: createChapters(9) },
      { value: 'it-kode', label: 'IT Kode', chapters: createChapters(9) },
      { value: 'krypto', label: 'Krypto', chapters: createChapters(8) },
      { value: 'analog', label: 'Analog', chapters: createChapters(7) },
    ],
  },
  {
    label: 'Class 6',
    value: 'class6',
    series: [
      { value: 'cyber-navigate', label: 'Cyber Navigate', chapters: createChapters(9) },
      { value: 'it-kode', label: 'IT Kode', chapters: createChapters(9) },
      { value: 'krypto', label: 'Krypto', chapters: createChapters(9) },
      { value: 'analog', label: 'Analog', chapters: createChapters(6) },
    ],
  },
  {
    label: 'Class 7',
    value: 'class7',
    series: [
      { value: 'cyber-navigate', label: 'Cyber Navigate', chapters: createChapters(9) },
      { value: 'it-kode', label: 'IT Kode', chapters: createChapters(9) },
      { value: 'krypto', label: 'Krypto', chapters: createChapters(9) },
      { value: 'analog', label: 'Analog', chapters: createChapters(7) },
    ],
  },
  {
    label: 'Class 8',
    value: 'class8',
    series: [
      { value: 'cyber-navigate', label: 'Cyber Navigate', chapters: createChapters(9) },
      { value: 'it-kode', label: 'IT Kode', chapters: createChapters(9) },
      { value: 'krypto', label: 'Krypto', chapters: createChapters(8) },
      { value: 'analog', label: 'Analog', chapters: createChapters(7) },
    ],
  },
  {
    label: 'Class 9',
    value: 'class9',
    series: [
      { value: 'analog', label: 'Analog', chapters: createChapters(8) },
      {
        value: 'ai',
        label: 'AI',
        chapters: [
          { value: 'partA_chapter5', label: 'Part A Chapter 5' },
          { value: 'partB_chapter4', label: 'Part B Chapter 4' },
        ],
      },
      {
        value: 'it402',
        label: 'IT402',
        chapters: [
          { value: 'partA_chapter5', label: 'Part A Chapter 5' },
          { value: 'partB_chapter5', label: 'Part B Chapter 5' },
        ],
      },
    ],
  },
  {
    label: 'Class 10',
    value: 'class10',
    series: [
      { value: 'analog', label: 'Analog', chapters: createChapters(8) },
      {
        value: 'ai',
        label: 'AI',
        chapters: [
          { value: 'partA_chapter5', label: 'Part A Chapter 5' },
          { value: 'partB_chapter7', label: 'Part B Chapter 7' },
        ],
      },
      {
        value: 'it402',
        label: 'IT402',
        chapters: [
          { value: 'partA_chapter5', label: 'Part A Chapter 5' },
          { value: 'partB_chapter4', label: 'Part B Chapter 4' },
        ],
      },
    ],
  },
];

export const SERIES = [
  {
    value: 'cyber-navigate',
    label: 'Cyber Navigate',
    chapters: [{ label: '', value: '' }],
  },
  {
    value: 'it-kode',
    label: 'IT Kode',
    chapters: [{ label: '', value: '' }],
  },
  {
    value: 'krypto',
    label: 'Krypto',
    chapters: [{ label: '', value: '' }],
  },
  {
    value: 'analog',
    label: 'Analog',
    chapters: [{ label: '', value: '' }],
  },
  {
    value: 'ai',
    label: 'AI',
    chapters: [{ label: '', value: '' }],
  },
  {
    value: 'it402',
    label: 'IT402',
    chapters: [{ label: '', value: '' }],
  },
];

export const DESIGNATIONS = [
  { label: 'Admin', value: 'admin', isVisible: false },
  { label: 'Head of Department(HOD)', value: 'hod', isVisible: true },
  { label: 'PGT', value: 'pgt', isVisible: true },
  { label: 'TGT', value: 'tgt', isVisible: true },
];

export const QUESTIONS = [
  {
    label: 'Objective Type',
    name: 'objective',
    category: [
      {
        name: 'one_word',
        label: 'One Word',
      },
      {
        name: 'abbreviations',
        label: 'Abbreviations',
      },
      {
        name: 'true_or_false',
        label: 'True Or False',
      },
      {
        name: 'multiple_choice',
        label: 'Multiple Choice',
      },
      {
        name: 'application_based',
        label: 'Application Based',
      },
      {
        name: 'fill_in_the_blanks',
        label: 'Fill In The Blanks',
      },
      {
        name: 'match_the_following',
        label: 'Match the Following',
      },
    ],
  },
  {
    label: 'Subjective Type',
    name: 'subjective',
    category: [
      {
        name: 'short_answer',
        label: 'Short Answer',
      },
      {
        name: 'long_answer',
        label: 'Long Answer',
      },
    ],
  },
];

export const TRUE_FALSE = [
  {
    name: 'true',
    label: 'True',
  },
  {
    name: 'false',
    label: 'False',
  },
];

export const LOGO_POSITIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
];

export const OUTPUT_TEMPLATES = [
  {
    name: 'style_1',
    label: 'Style 1',
  },
  {
    name: 'style_2',
    label: 'Style 2',
  },
  {
    name: 'style_3',
    label: 'Style 3',
  },
];

export const ALPHABETS_OPTIONS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const ROMAN_OPTIONS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export const TEMPLATES = [
  {
    type: 'short_answer',
    label: 'Short Answer Template',
    href: '/templates/short-question.xlsx',
  },
  {
    type: 'long_answer',
    label: 'Long Answer Template',
    href: '/templates/long-question.xlsx',
  },
  {
    type: 'fill_in_the_blanks',
    label: 'Fill in the blanks Template',
    href: '/templates/fill-in-the-blanks-question.xlsx',
  },
  {
    type: 'abbreviations',
    label: 'Abbreviation Template',
    href: '/templates/abbrevation-question.xlsx',
  },
  {
    type: 'true_or_false',
    label: 'True or False Template',
    href: '/templates/true-false-question.xlsx',
  },
  {
    type: 'application_based',
    label: 'Application Based Template',
    href: '/templates/application-based-question.xlsx',
  },
  {
    type: 'one_word',
    label: 'One Word Template',
    href: '/templates/one-word-question.xlsx',
  },
  {
    type: 'match_the_following',
    label: 'Match the following Template',
    href: '/templates/match-the-following-question.xlsx',
  },
  {
    type: 'multiple_choice',
    label: 'Multiple Choice Template',
    href: '/templates/multiple-choice-question.xlsx',
  },
];
