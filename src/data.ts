import { Project, WorkExperience, Education, SkillCategory, Achievement } from './types';

export const projectsData: Project[] = [
  {
    id: 'blue-tees',
    title: 'Blue Tees GAME: AI Golf GPS',
    description: 'AI-powered golf companion mobile application integrated with Bluetooth Low Energy hardware.',
    longDescription: 'Developed an AI golf GPS companion app featuring real-time Bluetooth Low Energy (BLE) integration for Blue Tees hardware (Player+ GPS Speaker, PlayerGO, Ringer GPS). Engineered real-time shot tracking, interactive live course navigation, and a fully connected AI golf experience. Acted as a senior technical lead coordinating project delivery and supporting key hardware pair flows.',
    appStoreLink: 'https://apps.apple.com/us/app/blue-tees-game-ai-golf-gps/id6448720121',
    appleId: '6448720121',
    tags: ['React Native', 'TypeScript', 'Bluetooth BLE', 'Redux Toolkit', 'Socket.io', 'GPS', 'REST API'],
    category: 'Golf & IoT',
    metrics: 'Delivered live auto shot-tracking with local offline cache backups',
    featured: true
  },
  {
    id: 'mgi-sureshot',
    title: 'MGI & Sureshot: Electric Buggy',
    description: 'A GPS companion app for premium MGI Golf Ai Series electric buggies covering 40,000+ courses worldwide.',
    longDescription: 'Built a feature-rich GPS companion app tracking 40k+ golf courses worldwide. Custom-designed high-performance 3D hole flyovers, live real-time green distance tracking (front/middle/back margins), and a comprehensive cloud digital scorecard. Optimized map rendering on device and API fetching strategy for high performance.',
    appStoreLink: 'https://apps.apple.com/us/app/mgi-sureshot/id1520474332',
    appleId: '1520474332',
    tags: ['React Native', 'GPS', 'Google Maps API', 'Firebase', 'TypeScript', 'REST API'],
    category: 'Golf & IoT',
    metrics: '35% memory utilization decrease during high-resolution 3D flyovers',
    featured: true
  },
  {
    id: 'tactectec',
    title: 'TecTecTec Golf GPS: TEAM8 Companion',
    description: 'BLE companion application for premium golf watches and TEAM8 audio hardware accessory ecosystems.',
    longDescription: 'Engineered a BLE custom companion mobile app for TecTecTec premium GPS watches and TEAM8 audio devices. Supported lifetime-free course updates on 40,000+ globally listed courses, audio-based hazard hazard warnings, and a custom OTA firmware manager using React Native Native Modules bindings in ObjC & Java.',
    appStoreLink: 'https://apps.apple.com/us/app/tectectec-golf-gps/id1465202636',
    appleId: '1465202636',
    tags: ['React Native', 'Bluetooth BLE', 'OTA Firmware Updates', 'Native Modules', 'TypeScript'],
    category: 'Golf & IoT',
    metrics: 'Secure OTA Firmware upgrades executed within 45 seconds on low bandwidth BLE',
    featured: false
  },
  {
    id: 'yamatrack',
    title: 'YamaTrack Mobile - Yamaha Golf Cart',
    description: 'Official Yamaha Golf-Car Company mobile application with live GPS metrics, cart pairing, and order management.',
    longDescription: 'Contributed as a principal application architect for the official Yamaha Golf-Car Company app, resulting in over 10,000+ active Google Play / App Store downloads. Features dynamic GPS tracking, interactive high-resolution course mapping, custom in-round food ordering systems, and post-round analytical feedback modules.',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.l1inc.yamahacartgps',
    tags: ['React Native', 'GPS', 'Google Maps API', 'Redux', 'REST API', 'JSON Schema'],
    category: 'Golf & IoT',
    metrics: 'Active and stable deployment in 100+ high-end resorts and golf clubs globally',
    featured: true
  },
  {
    id: 'rad-golf',
    title: 'Rad Golf - Rangefinder Analytics',
    description: 'Golf analytics dashboard with real-time Bluetooth rangefinder sync and AI auto-shot detection.',
    longDescription: 'Designed and developed a premium golf analytics platform featuring AI-assisted shot detection, continuous in-round statistics logs, and instant real-time sync with premium Rad Golf Bluetooth speaker and hand-held rangefinder devices for analytical feedback.',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.radgolf&hl=en',
    tags: ['React Native', 'TypeScript', 'BLE Integration', 'Redux Toolkit', 'REST API', 'Performance Tuning'],
    category: 'Golf & IoT',
    metrics: '35% rendering speed increase via React.memo and smart DOM recycle strategies',
    featured: false
  },
  {
    id: 'powakaddy',
    title: 'PowaKaddy - Smart Electric Trolley',
    description: 'IoT companion app governing electric smart golf buggies with real-time BLE synchronization.',
    longDescription: 'Engineered the official BLE React Native companion pairing for PowaKaddy high-end smart electric buggies. Built live round stat calculations, instant GPS course telemetry updates, and a highly stable OTA firmware flash mechanism enabling user device upgrades directly via Bluetooth.',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.powakaddy&hl=en',
    tags: ['React Native', 'Bluetooth BLE', 'OTA Firmware', 'GPS Hardware', 'Native Modules', 'TypeScript'],
    category: 'Golf & IoT',
    metrics: 'Reversed connection latency by 40% with customized background polling loops',
    featured: false
  },
  {
    id: 'whichbar',
    title: 'WhichBar - Real-Time Crowd Analytics',
    description: 'Crowd-sourced social discovery map with live crowd analytics and fast booking pipelines.',
    longDescription: 'Architected and shipped an innovative mobile social discovery application. Enabled real-time bar/club crowd diagnostics via WebSocket and Socket.io tracking, integrated skip-the-line fast event booking processes, and incorporated smart local venue discovery powered by Google Maps API services.',
    appStoreLink: 'https://apps.apple.com/in/app/whichbar/id6444701065',
    appleId: '6444701065',
    tags: ['React Native', 'Firebase', 'Google Maps API', 'Socket.io', 'WebSocket', 'Redux Store', 'Express.js'],
    category: 'Social & Map Integration',
    metrics: 'Live WebSocket message dispatch of under 40ms, supporting hundreds of simultaneous locations',
    featured: true
  },
  {
    id: 'barany',
    title: 'Barany - Food & Restaurant Delivery',
    description: 'Full-stack double-sided restaurant food order and driver fleet delivery system serving Jordan and India.',
    longDescription: 'Created a complex multi-region delivery application servicing the restaurant and grocery industries in Jordan and Indian markets. Engineered real-time driver GPS order dispatch tracking, multi-currency credit gateways, and custom scheduling algorithms inside Cloud Firestore and Firebase Auth.',
    appStoreLink: 'https://apps.apple.com/jo/app/barany/id6566189936',
    appleId: '6566189936',
    tags: ['React Native', 'Firebase SDK', 'Cloud Firestore', 'Real-time GPS Tracking', 'Payment Gateway', 'TypeScript'],
    category: 'Full-Stack & Utilities',
    metrics: 'Integrated robust order pipeline processing 5,000+ daily actions with high uptime',
    featured: false
  }
];

export const experienceData: WorkExperience[] = [
  {
    id: 'exp-se',
    role: 'Software Engineer',
    company: 'Webskitters Technology Solutions Pvt. Ltd.',
    location: 'Kolkata, West Bengal, India',
    period: 'March 2026 – Present',
    responsibilities: [
      'Independently managing end-to-end client projects—coordinating across design, backend, and QA streams, ensuring 95% on-time sprint deliveries.',
      'Leading architecture blueprints for critical React Native projects utilizing clean MVVM design patterns, robust software infrastructure, and memory tuning.',
      'Building innovative AI-powered mobile capabilities (integrating LLM REST APIs, custom OCR character recognition, and predictive, context-aware layout rendering).',
      'Overseeing continuous deployment (CD) pipelines via Fastlane scripting and managing automated release cycles for Apple App Store and Google Play console.',
      'Sponsoring teammates daily by troubleshooting code defects, reviewing Pull Requests, and demonstrating robust performance engineering strategies.'
    ]
  },
  {
    id: 'exp-ad',
    role: 'Application Developer',
    company: 'Webskitters Technology Solutions Pvt. Ltd.',
    location: 'Kolkata, West Bengal, India',
    period: 'March 2025 – March 2026',
    responsibilities: [
      'Shipped robust cross-platform Android & iOS builds encompassing IoT Bluetooth rangefinders, active GPS map, social messaging, and food commerce spheres.',
      'Successfully integrated Low Energy Bluetooth (BLE 4.0/5.0) pairing workflows, live GPS telemetry, Socket.io duplex systems, and low-latency client WebSockets.',
      'Amplified cross-platform frame rates and interface rendering speeds by 35% through custom Hermes optimization, react-virtual FlatLists, and lazy memory collections.',
      'Implemented full-stack features utilizing Node.js Express controllers, Firebase DB security rules, and state managers including Redux Saga and Zustand.'
    ]
  },
  {
    id: 'exp-jad',
    role: 'Junior Application Developer',
    company: 'Webskitters Technology Solutions Pvt. Ltd.',
    location: 'Kolkata, West Bengal, India',
    period: 'November 2022 – March 2025',
    responsibilities: [
      'Engineered initial React Native view flows, core UI component systems, and client validation modules utilizing ES6+ JS, JSX templates, and static Typescript.',
      'Assisted technical leaders in constructing backend helper microservices with Node.js, Express, Cloud Firestore, and MongoDB repositories.',
      'Rapidly self-upskilled in complex asynchronous application execution (Redux Saga Middleware, OO practices, custom React Hooks and Navigation patterns).'
    ]
  }
];

export const educationData: Education[] = [
  {
    degree: 'Bachelor of Technology',
    field: 'Mechanical Engineering',
    institution: 'Netaji Subhash Engineering College (MAKAUT)',
    location: 'Kolkata, India',
    period: 'August 2014 – July 2018',
    highlights: [
      'Transitioned into software engineering post-graduation through passionate self-driven upskilling in computer science fundamentals.',
      'Progressively mastered JavaScript ES6+, TypeScript, React.js ecosystem, modern Node.js backends, and app architectures.'
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Core',
    iconName: 'Code',
    skills: ['TypeScript', 'JavaScript (ES6+)', 'Vanilla JS', 'JSX', 'OOPs', 'JSON', 'Data Structures']
  },
  {
    title: 'Mobile & IoT Infrastructure',
    iconName: 'Smartphone',
    skills: ['React Native', 'Expo', 'React Native CLI', 'Native Modules', 'BLE Low Energy', 'GPS Hardware APIs', 'OTA Firmware Updates']
  },
  {
    title: 'Frontend & Architecture',
    iconName: 'Layout',
    skills: ['React.js', 'Redux Toolkit', 'Zustand', 'MVVM Patterns', 'Tailwind CSS', 'Redux Saga', 'React Navigation', 'Framer Motion']
  },
  {
    title: 'Backend & Databases',
    iconName: 'Database',
    skills: ['Node.js', 'Express.js', 'Socket.io', 'WebSockets', 'Firebase / Firestore', 'MongoDB', 'Microsoft SQL Server', 'REST APIs']
  },
  {
    title: 'AI & Intelligent Tech',
    iconName: 'Brain',
    skills: ['LLM API Integration', 'AI Feature Design', 'Optical Character Recognition (OCR)', 'Predictive UI', 'Git Copilot', 'Context-Aware UX']
  },
  {
    title: 'DevOps & Tooling',
    iconName: 'GitBranch',
    skills: ['Fastlane CI', 'Xcode & Android Studio', 'Postman / Flipper', 'Git/GitHub', 'Jira / Linear', 'Performance Profiling']
  }
];

export const achievementsData: Achievement[] = [
  {
    title: 'Live Production Apps',
    value: '8+',
    sub: 'Active on App Store & Play Store'
  },
  {
    title: 'App Speedup Metrics',
    value: '+35%',
    sub: 'Through Hermes & Memory tuning'
  },
  {
    title: 'On-time Delivery Speed',
    value: '95%',
    sub: 'Consistent sprint release index'
  },
  {
    title: 'Years Active Tech Experience',
    value: '3.5+',
    sub: 'Ascending career trajectory'
  }
];
