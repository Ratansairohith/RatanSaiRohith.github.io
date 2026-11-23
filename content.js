/*
  Everything on the site comes from this file.
  To update the site, edit the text below and commit. No build step.

  Inline links:  write [link text](https://example.com) inside any text.
  Dates:         "YYYY-MM", or just "YYYY" if the month is unknown.
  Hide a field:  leave it as an empty string "" or an empty list [].
*/

window.SITE = {
  name: "Ratan Kokku",
  role: "Applied Scientist, AWS Agentic AI",
  tagline:
    "I build learning systems that improve from their own traces: agents that decide, models that judge other models, and detection systems that retrain themselves as the adversary changes.",
  location: "Seattle, WA",
  email: "ratan2513@gmail.com",
  photo: "static/portrait.jpg",
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
    "Earlier, I co-founded [Kshemin](https://ksheminlabs.com/), an edge-AI fleet-management startup in India, where I led a ten-person data science team and co-invented a patented driver-monitoring system. I have competed on Kaggle since 2017 and hold an M.S. in Data Science from Northeastern University."
  ],

  // Newest first. Items are grouped by year automatically; within a year they keep the order written here.
  news: [
    { date: "2026-11", text: "Joined the Strands team in AWS Agentic AI, working on multimodal decision models for agents and physical AI." },
    { date: "2026-09", text: "Led the science for self-improving bot detection on AWS WAF: a fingerprint reputation model with LLM-judge labeling and nightly audits, now serving all AWS WAF customers." },
    { date: "2026", text: "Led the science for AWS WAF API Security, building detections for the OWASP API Top 10." },
    { date: "2025", text: "Worked on agentic security, building attack environments that test AI agents against prompt injection, tool poisoning and context poisoning." },
    { date: "2024", text: "Led the development of a multi-agent threat investigation system for security analysts and presented it at an internal Amazon conference." },
    { date: "2024-07", text: "Joined Amazon Web Services as an Applied Scientist on the Perimeter Protection team (AWS WAF)." },
    { date: "2023-06", text: "Completed a co-op with the AI Center of Excellence at Fidelity Investments." }
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
        "Built a multi-agent threat investigation system that cut investigation time by 32.6%; presented it at Amazon's internal machine learning conference.",
        "Worked on agentic security: built environments that attack AI agents with prompt injection, tool poisoning and context poisoning, and collected the resulting traces for AI security research."
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
      url: "https://ksheminlabs.com/",
      role: "Co-founder and Senior Data Scientist",
      start: "2019",
      end: "2022",
      place: "Hyderabad",
      points: [
        "Co-founded an edge-AI driver-safety and fleet-management company and led its ten-person data science team; incubated at T-Hub and NASSCOM.",
        "Shipped on-device models for driver distraction, face recognition, road damage detection and driver performance ranking on Jetson and Coral hardware.",
        "Co-inventor on Indian patent 202041040669A.",
        "Built 3D-printed prosthetic arms delivered to The Ability People Organization, an NGO in Visakhapatnam.",
        "Featured in [The Better India](https://thebetterindia.com/263801/visakhapatnam-student-road-safety-innovation-startup-artificial-intelligence/), [Telangana Today](https://telanganatoday.com/t-hubs-new-programme-graduates-5-startups), [Made in India Design](https://madeinindia.design/solution-stop-drivers-falling-asleep-wheel) and an [STPI India video](https://www.youtube.com/watch?v=WIvQZ9CsCYo)."
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
    { title: "Kaggle Notebooks Master", detail: "Highest rank 40; 7 gold, 10 silver and 1 bronze notebooks, 3,400+ upvotes." },
    { title: "Kaggle Competitions Expert", detail: "Highest rank 487; 8 silver and 6 bronze medals across 33 competitions." },
    { title: "Chief Minister's awards, Andhra Pradesh", detail: "Awarded to Kshemin in 2017 and 2023." },
    { title: "Publishsutra Inspire Award", detail: "I-Innovate online hackathon, 2020." },
    { title: "ICT Academy Student Innovator Award", detail: "Second prize for the Driver Stimulus Index, Andhra Pradesh and Telangana, 2018." },
    { title: "Gold medal, IIA International Innovation Fair", detail: "For the Driver Stimulus Index, 2017." }
  ],

  // Press and media. Leave url as "" for print-only coverage.
  press: [
    { date: "2021-10", outlet: "The Better India", title: "Students build innovative solution to stop drivers from falling asleep at the wheel", url: "https://thebetterindia.com/263801/visakhapatnam-student-road-safety-innovation-startup-artificial-intelligence/" },
    { date: "2021-09", outlet: "Telangana Today", title: "T-Hub's new programme graduates 5 startups, including Kshemin Labs", url: "https://telanganatoday.com/t-hubs-new-programme-graduates-5-startups" },
    { date: "", outlet: "Made in India Design", title: "Product feature on the driver drowsiness detection system", url: "https://madeinindia.design/solution-stop-drivers-falling-asleep-wheel" },
    { date: "2020", outlet: "STPI India", title: "Kshemin Labs, a startup at STPI MOTION, pioneering AI-assisted safe driving (video)", url: "https://www.youtube.com/watch?v=WIvQZ9CsCYo" },
    { date: "2019-09", outlet: "Andhra Jyothy", title: "Feature on Kshemin Labs and its driver-safety device", url: "" },
    { date: "2018-08", outlet: "The Times of India", title: "Coverage of our 3D-printed prosthetic arm project", url: "" }
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
