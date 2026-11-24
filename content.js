/*
  Everything on the site comes from this file.
  To update the site, edit the text below and commit. No build step.

  Inline links:  write [link text](https://example.com) inside any text.
  Dates:         "YYYY-MM", or just "YYYY" if the month is unknown.
  Hide a field:  leave it as an empty string "" or an empty list [].
  Project images: put the file in static/projects/ and set image: "static/projects/name.jpg".
*/

window.SITE = {
  name: "Ratan Kokku",
  role: "Applied Scientist, AWS Agentic AI",
  tagline:
    "I build learning systems that improve from their own traces: agents that decide, models that judge other models, and detection systems that retrain themselves as the adversary changes.",
  location: "Seattle, WA",
  email: "ratan2513@gmail.com",
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
    "Before that I spent two and a half years as a scientist on AWS WAF, leading the science for bot detection and API security, where the core challenge is building detectors that keep up with adversaries who constantly change their behavior.",
    "Earlier, I co-founded [Kshemin](https://ksheminlabs.com/), an edge-AI fleet-management startup in India, where I led a ten-person data science team and co-invented a patented driver-monitoring system. I have competed on Kaggle since 2017 and hold an M.S. in Data Science from Northeastern University."
  ],

  // Newest first. Items are grouped by year automatically; within a year they keep the order written here.
  news: [
    { date: "2026-11", text: "Joined the Strands team in AWS Agentic AI, working on multimodal decision models for agents and physical AI." },
    { date: "2026-11", text: "Led the science for AWS WAF API Security, now launched as an AWS WAF managed rule group with detections for the OWASP API Top 10.", url: "https://aws.amazon.com/blogs/security/introducing-api-and-ai-security-on-aws-from-discovery-to-protection/" },
    { date: "2026-09", text: "Led the science for self-improving bot detection models on AWS WAF." },
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
        "Working on multimodal decision models for agents and physical AI."
      ]
    },
    {
      org: "Amazon Web Services",
      role: "Applied Scientist, Perimeter Protection (AWS WAF)",
      start: "2024-07",
      end: "2026-11",
      place: "Seattle",
      points: [
        "Science lead for bot detection, building self-improving models that adapt as bot behavior changes, now protecting all AWS WAF customers.",
        "Science lead for [AWS WAF API Security](https://aws.amazon.com/blogs/security/introducing-api-and-ai-security-on-aws-from-discovery-to-protection/), detecting API abuse covered by the OWASP API Top 10.",
        "Built behavioral representation models for bot detection.",
        "Built a multi-agent threat investigation system for security analysts and presented it at an internal Amazon conference.",
        "Worked on agentic security, testing AI agents against attacks such as prompt injection and tool poisoning."
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
      image: "static/projects/trait.jpg",
      imageFull: "static/projects/trait.png",
      imageAlt: "TRAIT pipeline: agents label my corrections, SFT then DPO training, asking TRAIT at a fork, and coding agents reporting feedback",
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
      name: "Market Signals Desk",
      status: "Personal research, 2026",
      summary:
        "A multi-agent research desk for the stock market that runs on a schedule, including weekends. Specialist agents read the charts, earnings and news for every tracked stock, and a lead agent combines them into one verdict per stock, delivered as a pre-market brief and a private dashboard. Every call it makes is graded over time, so the desk keeps an honest track record of what worked and why.",
      detail: "It informs my own decisions; it doesn't place trades.",
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
      summary: "Contributions to the [Strands Agents SDK](https://github.com/strands-agents/sdk-python), and the Strands Agents integration for [Moss](https://github.com/usemoss/moss), a real-time semantic search runtime for AI agents.",
      detail: "",
      links: [{ label: "Strands Agents SDK", url: "https://github.com/strands-agents/sdk-python" }, { label: "Moss integration", url: "https://github.com/usemoss/moss/tree/main/packages/strands-agents-moss" }]
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
    { school: "Jawaharlal Nehru Technological University, Kakinada", degree: "B.Tech in Electronics and Communication Engineering", detail: "GVP College of Engineering (Autonomous), Visakhapatnam" }
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
