[![Bolt.new: AI-Powered Full-Stack Web Development in the Browser](./public/social_preview_index.jpg)](https://bolt.new)

Below is a detailed Product Requirements Document for upgrading bolt.new to leverage new features from the Vercel AI SDK, including provider integrations and tool calling capabilities. Converting over this right now will allow us to easily add MCP support, mocktesting, and the ability to add images to prompts in the near future more eaily.

---

# PRD: Bolt.new Upgrade – Leveraging Vercel AI SDK Features

## 1. Overview

**Bolt.new** is an AI-powered web development agent that enables users to prompt, run, edit, and deploy full-stack applications directly in the browser. The project currently delivers a seamless in-browser development environment powered by WebContainers from StackBlitz. This upgrade aims to take full advantage of new features in the **Vercel AI SDK**—including unified provider management, multi-step tool calls, and enhanced support for various AI models (such as Anthropic’s Claude)—to improve both functionality and developer experience.

---

## 2. Problem Statement

While bolt.new is already a powerful platform for rapid prototyping and development, the current integration:
- **Lacks flexibility** in connecting to multiple AI providers.
- **Misses out on advanced tool calling** features that could enable richer interactions (e.g., multi-step queries, real-time data fetching).
- **Does not fully exploit** the unified interface provided by the Vercel AI SDK for text generation, structured data, and interactive tool calls.

---

## 3. Goals and Objectives

- **Enhanced Provider Flexibility:**  
  Integrate the Vercel AI SDK’s provider registry to allow bolt.new to switch easily between multiple AI providers (e.g., OpenAI, Anthropic, etc.) using a unified API.

- **Advanced Tool Calling:**  
  Implement tool calling features (multi-step calls, tool results, and error handling) to enable bolt.new’s AI to perform discrete tasks (such as fetching live data, code transformation, etc.) within the development workflow.

- **Improved Developer Experience:**  
  Leverage new message parts and streaming capabilities from the Vercel AI SDK to provide detailed responses—including reasoning, tool call outputs, and interactive UI elements—that enhance clarity and productivity.

- **Robust Error Handling and Extensibility:**  
  Utilize the SDK’s built-in error management and middleware features to ensure reliable and maintainable integration, supporting future expansion (e.g., additional providers or custom tools).

---

## 4. Features

### 4.1. Provider Integration
- **Unified API:** Use the Vercel AI SDK’s standardized language model specification to integrate multiple providers without vendor lock-in.  
- **Custom Provider Registry:** Allow users to choose or switch providers (e.g., Anthropic’s Claude, OpenAI’s GPT-4 variants) via a central registry.
- **Default Provider Settings:** Configure default models (e.g., Anthropic’s models for reasoning tasks) with pre-set parameters.

### 4.2. Tool Calling Capabilities
- **Tool Definition:** Define and register tools (using Zod or JSON schemas) to execute discrete tasks such as fetching weather data, code linting, or preview generation.
- **Multi-Step Interactions:** Enable multi-step tool calls (using the `maxSteps` setting) to simulate a conversation where the AI queries external APIs and summarizes the results.
- **Response Message Composition:** Support responses that include mixed message parts (e.g., text, reasoning, and tool results) for richer feedback.
- **Error Handling:** Implement standardized error responses (e.g., NoSuchToolError, InvalidToolArgumentsError) and repair mechanisms for tool calls.

### 4.3. User Interface Enhancements
- **Interactive Chat UI:** Update the UI to display multi-part messages including reasoning tokens, tool call results, and interactive prompts.
- **Enhanced Debugging:** Provide detailed error messages and tool call history for troubleshooting.

### 4.4. Extensibility and Middleware
- **Middleware Integration:** Leverage middleware (e.g., default settings middleware, extractReasoningMiddleware) to enforce consistent configurations across model calls.
- **Custom Tools and Providers:** Allow future developers to add their own providers or tools via MCP servers.

---

## 5. Functional Requirements

- **FR1:** Bolt.new must integrate the Vercel AI SDK (version 4.2 or later) as the core for AI model interactions.
- **FR2:** Implement a provider registry that supports switching between at least two major providers (e.g., OpenAI and Anthropic).
- **FR3:** Define a set of tools using the SDK’s tool helper function that the AI can call during a session.
- **FR4:** Enable multi-step tool calling with configurable `maxSteps` to allow chained interactions.
- **FR5:** Update the UI to support and render multiple message parts (text, tool calls, reasoning, image results).
- **FR6:** Incorporate robust error handling for both model and tool call failures.

---

## 6. Non-Functional Requirements

- **Performance:**  
  The system must deliver responses within acceptable latency limits even during multi-step tool calls.

- **Reliability:**  
  Implement fallback mechanisms when a provider fails or a tool call is invalid, ensuring graceful degradation.

- **Maintainability:**  
  Code should be modular, well-documented, and designed for future extensions, including support for new providers or custom tools.

- **Security:**  
  Ensure secure handling of API keys and sensitive data in accordance with best practices.

---

## 7. Dependencies

- **Vercel AI SDK:**  
  Utilize core packages from the Vercel AI SDK (Core, UI, and provider management modules).  

- **StackBlitz WebContainers:**  
  Maintain compatibility with the existing in-browser development environment.

- **Existing bolt.new Codebase:**  
  Leverage the current open-source repository as the baseline for our project.

---

## 8. Milestones and Timeline

1. **Initial Integration (2 weeks):**   
   - Review Vercel AI SDK documentation and identify necessary changes.
   - Define the new architecture and update interface designs.
   - Integrate the provider registry and update the model API calls.
   - Implement basic tool calling and middleware functionality.

2. **UI/UX Updates (2 week):**  
   - Redesign UI components to display multi-part messages.
   - Integrate interactive elements for tool outputs and error messages.
   - Perform unit tests.

3. **Beta Release & Feedback (1 week):**  
   - Deploy beta version and gather feedback from a select group of users.
   - Iterate on any issues or enhancements identified during testing.

4. **Final Release (1 week):**
   - Fix any reported bugs
   - Documentation updates
   - Switch from private to public in github

---

## 9. Risks and Mitigation

- **Provider API Changes:**  
  *Risk:* Changes in provider APIs may break integrations.  
  *Mitigation:* Utilize the unified interface of Vercel AI SDK to abstract these differences and implement fallback mechanisms.

- **Complex Tool Call Handling:**  
  *Risk:* Multi-step tool calls may introduce unexpected behaviors or errors.  
  *Mitigation:* Extensive testing with various use cases and robust error handling strategies.

- **Performance Overhead:**  
  *Risk:* Increased latency due to multi-step interactions and streaming responses.  
  *Mitigation:* Optimize middleware and response handling; monitor and profile performance in beta tests.

- **User Adoption Challenges:**  
  *Risk:* Changes in UI or functionality might confuse current users.  
  *Mitigation:* Provide clear documentation, onboarding guides, and in-app help.

---

## 10. Future Considerations
These will be started once milestone 2 is completed.

- **Extended Provider Support:**  
  Incorporate additional providers or self-hosted models as the ecosystem grows.

- **Advanced Built-in Tool Integrations:**  
  Enable more complex tool calls (e.g., file system operations, code analysis) to further automate the development workflow.

- **Feedback Loop:**  
  Implement analytics and telemetry to monitor usage and performance, driving further improvements.

- **MCP Support:**  
  Implement the ability to add MCP servers that you would like to use by extending the current capabilities.

- **Image Support:**  
  Implement the ability to add images to the prompts using Vercel AI SDK.

- **Mock Testing:**  
  Implement the ability to do mock testing with Vercel AI SDK.

- **One Click Deploy:**  
  Implement the ability to have one click deploy to vercel and netlify.

- **Code Save:**  
  Implement the ability to download project.

- **3rd party integrations:**  
  Connect to Gitlab / Github and push your project there or connect to supabase for adding more funcality to your app. 

- **Starter Projects:**  
  Implement the ability to use templates from github as starter projects.

- **Diff Mode:**  
  Implement diff mode so the whole file is not being rewritten.

- **One Click Fix:**  
  Implement one click fix on errors.

- **Context Management:**  
  Implement context management.
  
- **LASTLY: Agentic:**  
  Convert this to be more agentic like where possiable.

---

## 11. Research URL's for the future considerations

- https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling
- https://sdk.vercel.ai/docs/ai-sdk-core/provider-management
- https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data
- https://sdk.vercel.ai/docs/ai-sdk-core/generating-text
- https://sdk.vercel.ai/docs/ai-sdk-core/middleware
- https://sdk.vercel.ai/docs/ai-sdk-core/testing
- https://sdk.vercel.ai/docs/ai-sdk-core/error-handling
- https://sdk.vercel.ai/providers/community-providers/ollama
- https://modelcontextprotocol.io/introduction
- https://modelcontextprotocol.io/tutorials/building-mcp-with-llms
- https://github.com/modelcontextprotocol/typescript-sdk
- https://ollama.com/search?c=vision
- https://ollama.com/library/gemma3
- https://webcontainers.io/guides/quickstart
- https://webcontainers.io/guides/configuring-headers
- https://webcontainers.io/api