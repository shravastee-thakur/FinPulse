# FinPulse

An AI Financial and Market Research Assistant that uses autonomous agents to gather live market data, analyze recent news, and deliver strictly structured financial briefings.



<img width="1265" height="641" alt="finpulse1" src="https://github.com/user-attachments/assets/9e1d26e5-e37e-42ad-b8ed-f48c00f23bd3" />


## Overview

FinPulse takes a natural language query, deploys an AI agent to research live stock prices and recent news, and formats the results into a validated JSON object ready for dashboard rendering.

The system uses a two stage pipeline to ensure reliability.

1. **The Researcher:** An autonomous agent loops through available tools to gather raw data.
2. **The Formatter:** A structured output chain forces the raw research into a strict Zod schema.

This separation prevents the agent from breaking when forced to output strict JSON during its reasoning loop.

## Tech Stack

### Backend
* **Runtime:** Node.js, Express, TypeScript
* **AI Orchestration:** LangChain.js, LangGraph
* **LLM:** Groq (OpenAI compatible API)
* **Data Sources:** Yahoo Finance, Tavily Search API
* **Validation:** Zod

### Frontend
* **Framework:** React, Vite, TypeScript
* **Styling:** Tailwind CSS
* **State Management:** React Hooks

## Project Structure

The project follows the Single Responsibility Principle. Business logic is isolated from AI adapters.

```text
FinPulse/
├── backend/
│   ├── src/
│   │   ├── agents/          # LangChain agent creation
│   │   ├── config/          # Environment and LLM configuration
│   │   ├── controllers/     # HTTP request handling
│   │   ├── routes/          # API endpoint definitions
│   │   ├── schemas/         # Zod validation schemas
│   │   ├── services/        # Business logic and orchestration
│   │   ├── tools/           # LangChain tool adapters
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/             # HTTP client for backend
    │   ├── components/      # React UI components
    │   ├── types/           # TypeScript interfaces
    │   ├── App.tsx          # Main dashboard layout
    │   └── main.tsx         # React entry point
    ├── .env
    └── package.json
```
## Key Design Decisions
### Isolated Business Logic
LangChain tools act as thin adapters. The actual data fetching logic lives in pure TypeScript service functions. This makes the core logic testable without requiring AI framework mocks.
### Two Stage Pipeline
Agents require freedom to reason and call tools. Forcing strict JSON output during this phase often causes parsing errors. The pipeline splits research and formatting into separate LLM calls to guarantee valid structured output.
### Shared Validation
Zod schemas validate the LLM output on the backend before it ever reaches the frontend. React components receive fully typed objects and never need to parse raw text.
