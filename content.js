/*
  Everything on the site comes from this file.
  To update the site, edit the text below and commit. No build step.

  Inline links:  write [link text](https://example.com) inside any text.
  Dates:         "YYYY-MM" (or "YYYY-MM-DD"). News is sorted newest first automatically.
  Hide a field:  leave it as an empty string "" or an empty list [].
*/

window.SITE = {
  name: "Ratan Kokku",
  role: "Applied Scientist, AWS Agentic AI",
  tagline:
    "I build learning systems that improve from their own traces: agents that decide, models that judge other models, and detection systems that retrain themselves as the adversary changes.",
  location: "Seattle, WA",
  email: "ratan.kokku@gmail.com",
  photo: "static/me.jpg",
  resume: "", // paste a link to your current resume PDF here to show a Resume link
  updated: "2026-11-21",

  links: [
    { label: "GitHub", url: "https://github.com/Ratansairohith" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ratansairohith" },
    { label: "Kaggle", url: "https://www.kaggle.com/ratan123" },
  ],

  about: [
    "I'm an applied scientist at Amazon Web Services in Seattle. I recently joined the Strands team in AWS Agentic AI, where I work on multimodal decision models for agents and physical AI.",
    "Before that I spent two and a half years as a scientist on AWS WAF, leading the science for bot detection and API security. Most of that work came down to one question: how do you keep a detector honest when the thing it detects keeps changing? My answer was to let LLM judges label traffic, audit the production models every night, and retrain behind a statistical gate.",
    "Earlier, I co-founded Kshemin, an edge-AI fleet-management startup in India, where I led a ten-person data science team and co-invented a patented driver-monitoring system. I have competed on Kaggle since 2017 and hold an M.S. in Data Science from Northeastern University."
  ],

  // Add new items at the top or bottom; they are sorted by date.
  news: [
    { date: "2026-11", text: "Joined the Strands team in AWS Agentic AI to work on multimodal decision models for agents and physical AI." },
    { date: "2026-10", text: "Our fingerprint reputation model for AWS WAF bot detection is now live for all AWS WAF customers, with a 15% lift in AUC on low-and-slow bots." },
    { date: "2026-10", text: "A nightly error audit with blind dual LLM judges let us train a challenger model that cut live false positives from 13.2% to 5.0%." },
    { date: "2026-09", text: "Started leading the science for a new family of self-improving bot detection models at AWS." },
    { date: "2024-07", text: "Joined Amazon Web Services as an Applied Scientist on the Perimeter Protection team (AWS WAF)." },
    { date: "2023-06", text: "Finished a co-op with the AI Center of Excellence at Fidelity Investments." }
  ],

  experience: [
    {
      org: "Amazon Web Services",
      role: "Applied Scientist, Strands (AWS Agentic AI)",
      start: "2026-11",
      end: "",
      place: "Seattle",
      points: [
        "Training multimodal decision models that let agents act with fewer expensive model calls, starting with automated research loops."
      ]
    },
    {
      org: "Amazon Web Services",
      role: "Applied Scientist, Perimeter Protection (AWS WAF)",
      start: "2024-07",
      end: "2026-11",
      place: "Seattle",
      points: [
        "Science lead for bot detection. Built a fingerprint reputation model now serving all AWS WAF customers (+15% AUC on low-and-slow bots), wrapped in a nightly loop where two independent LLM judges label fingerprints, settle disagreements by reading each other's reasoning, and feed a model that retrains behind a statistical gate.",
        "Designed a nightly error audit across 500 customer sites that exposed a 13.7% real-world error rate hidden behind 1.1% on training labels; a challenger trained on audit labels cut live false positives from 13.2% to 5.0%. Per-customer models now retrain daily in shadow.",
        "Science lead for AWS WAF API Security: detections for the OWASP API Top 10 (enumeration, BOLA, BOPLA, BFLA) built on models of how clients move across API endpoints, plus a multi-agent framework that synthesizes realistic attacks against each customer's API surface.",
        "Learned behavioral embeddings for bot detection with contrastive training on a fine-tuned small open-weight LLM over 886M weekly requests (+7.9% AUC).",
        "Built a multi-agent threat investigation system that cut investigation time by 32.6%; presented it at Amazon's internal machine learning conference."
      ]
    },
    {
      org: "Fidelity Investments",
      role: "Data Science Co-op, AI Center of Excellence",
      start: "2023-01",
      end: "2023-06",
      place: "",
      points: [
        "Worked on [MABWiser](https://github.com/fidelity/mabwiser), Fidelity's open-source library for contextual multi-armed bandits."
      ]
    },
    {
      org: "Kshemin Innovations",
      role: "Co-founder and Senior Data Scientist",
      start: "2019",
      end: "2022",
      place: "Hyderabad",
      points: [
        "Co-founded an edge-AI fleet-management company and led its ten-person data science team; the company raised $4M and was incubated at T-Hub and NASSCOM.",
        "Shipped on-device models for driver distraction, face recognition, road damage detection and driver performance ranking on Jetson and Coral hardware.",
        "Co-inventor on Indian patent 202041040669A."
      ]
    }
  ],

  projects: [
    {
      name: "TRAIT",
      status: "Personal research, 2026",
      summary:
        "A framework for personalizing coding agents. TRAIT learns a developer's preferences from agent session traces and steers the agent at key decision points, before the developer needs to step in.",
      detail: "",
      links: []
    },
    {
      name: "ResearchCrew",
      status: "Personal research, 2026",
      summary:
        "A scheduled crew of specialized agents (reader, synthesizer, verifier, devil's advocate, judge) that turns each day's ML papers on arXiv into a ranked portfolio of testable research hypotheses, using hostile literature search, an evidence ladder and Elo ranking.",
      detail: "",
      links: []
    },
    {
      name: "NeuralPizza-7B",
      status: "Open-weight model",
      summary:
        "A 7B language model fine-tuned with direct preference optimization. It reached #20 on the Open LLM Leaderboard and has been downloaded more than 4,000 times.",
      detail: "",
      links: []
    },
    {
      name: "Open-source contributions",
      status: "Ongoing",
      summary: "Contributions to the [Strands Agents SDK](https://github.com/strands-agents/sdk-python) and to Moss.",
      detail: "",
      links: []
    }
  ],

  recognition: [
    { title: "Indian patent 202041040669A", detail: "Co-inventor, from work at Kshemin." },
    { title: "Kaggle Notebooks Master", detail: "Highest rank 40; 7 gold and 8 silver notebooks, 3,400+ upvotes." },
    { title: "Kaggle Competitions Expert", detail: "Highest rank 487; 8 silver and 6 bronze medals across 33 competitions." },
    { title: "Chief Minister's innovation award", detail: "Awarded to Kshemin." },
    { title: "Gold medal, IIA International Innovation Fair", detail: "2017." }
  ],

  education: [
    { school: "Northeastern University, Khoury College", degree: "M.S. in Data Science", detail: "GPA 3.90 / 4.0" },
    { school: "GVP College of Engineering (Autonomous)", degree: "B.Tech in Electronics and Communication Engineering", detail: "" }
  ],

  // Older work, shown in a compact list near the bottom.
  archive: [
    { name: "Skin cancer detection on Android", note: "TensorFlow Lite classifier running on live camera frames." },
    { name: "Pneumonia detection web app", note: "VGG-16 behind a Flask app." },
    { name: "Bengali handwritten grapheme classification", note: "PyTorch, Kaggle competition." },
    { name: "Tweets on the Australian election", note: "Text analytics and topic modeling.", url: "https://www.kaggle.com/ratan123/data-analysis-of-tweets-on-australian-election/" },
    { name: "Understanding COVID-19 papers with text analytics", note: "CORD-19 dataset.", url: "https://www.kaggle.com/ratan123/cord-19-understanding-papers-with-textanalytics/" },
    { name: "Tweet sentiment extraction", note: "Transformer span extraction, Kaggle competition." }
  ]
};
