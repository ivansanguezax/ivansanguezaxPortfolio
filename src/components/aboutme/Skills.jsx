import React from 'react';
import { 
  LayoutDashboard, 
  LineChart, 
  Sparkles, 
  Palette, 
  Code, 
  TrendingUp 
} from "lucide-react";

const skillsData = [
  {
    title: "Product Management",
    description: "Productboard, Notion, Jira, Confluence, Asana, Trello, Aha!",
    icon: <LayoutDashboard className="h-4 w-4 text-gray-600" />
  },
  {
    title: "Product Analytics",
    description: "Amplitude, Mixpanel, Hotjar, Looker Studio.",
    icon: <LineChart className="h-4 w-4 text-gray-600" />
  },
  {
    title: "AI & Automation Tools",
    description: "OpenAI API, LangChain, GPT integrations, Google Analytics 4, Zapier, n8n, Make, Airtable",
    icon: <Sparkles className="h-4 w-4 text-gray-600" />
  },
  {
    title: "UI/UX",
    description: "Figma, Adobe XD, UserTesting, Maze.",
    icon: <Palette className="h-4 w-4 text-gray-600" />
  },
  {
    title: "Software Engineering",
    description: "TypeScript, React (Next.js), Flutter, Node.js, Firebase, SQL, Python.",
    icon: <Code className="h-4 w-4 text-gray-600" />
  },
  {
    title: "Financial & Performance Metrics",
    description: "Cost & budget management, ROI analysis, KPI tracking, business intelligence (BI).",
    icon: <TrendingUp className="h-4 w-4 text-gray-600" />
  }
];

const GridItem = ({ icon, title, description }) => {
  return (
    <div className="group relative h-full rounded-2xl border border-gray-200/50 bg-white p-2 transition-all duration-300 hover:border-gray-300/75 md:rounded-3xl md:p-3">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-100/50 group-hover:via-blue-100/50 group-hover:to-emerald-100/50" />
      <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 group-hover:shadow-md md:p-6">
        <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div className="w-fit rounded-lg border border-gray-200 p-2 transition-colors duration-300 group-hover:border-gray-300 group-hover:bg-gray-50">
            {icon}
          </div>
          <div className="space-y-3">
            <h3 className="font-sans text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
              {title}
            </h3>
            <p className="font-sans text-sm leading-relaxed text-gray-600 md:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section className="w-full py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {skillsData.map((skill, index) => (
            <GridItem
              key={index}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;