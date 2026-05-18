# Elith Documentation Audit Findings
**Date:** 2026-05-18  
**Auditor:** Bob (AI Agent)

## Executive Summary

After comprehensive analysis of the Elith source repository, I've identified significant discrepancies between the actual implementation and the documentation. The documentation describes a multi-agent system with 6 specialized agents and a 4-phase pipeline, but the actual codebase implements a simpler architecture with only 1 fully implemented agent (CTO) and 4 operations.

---

## CRITICAL FINDINGS

### 1. AGENTS - Major Discrepancy

**DOCUMENTED (INCORRECT):**
- 6 specialized agents: DevOps, Architect, Dev, QA, Reviewer, Docs
- Agents work in parallel
- Multi-agent coordination via message bus
- 4-phase pipeline with agent orchestration

**ACTUAL IMPLEMENTATION:**
- Only **1 agent fully implemented**: [`CTOAgent`](../elith/backend/agents/cto_agent.py) (181 lines)
- 5 stub agents with placeholder methods:
  - [`BackendAgent`](../elith/backend/agents/backend_agent.py) (15 lines) - returns placeholder prompts
  - [`DataAgent`](../elith/backend/agents/data_agent.py) (18 lines) - returns placeholder prompts
  - [`DevOpsAgent`](../elith/backend/agents/devops_agent.py) (15 lines) - returns placeholder prompts
  - [`FrontendAgent`](../elith/backend/agents/frontend_agent.py) (25 lines) - returns placeholder prompts
  - [`QAAgent`](../elith/backend/agents/qa_agent.py) (18 lines) - returns placeholder prompts
  - [`SecurityAgent`](../elith/backend/agents/security_agent.py) (15 lines) - returns placeholder prompts
- [`AgentOrchestrator`](../elith/backend/agents/orchestrator.py) only initializes CTO agent (line 38)
- No parallel agent execution
- No message bus implementation

### 2. OPERATIONS - Actual Architecture

**ACTUAL IMPLEMENTATION:**
The system uses **4 operations**, not a multi-agent pipeline:
1. [`explain`](../elith/backend/operations/explain.py) - Explain codebase architecture
2. [`architect`](../elith/backend/operations/architect.py) - Propose architectural improvements
3. [`refactor`](../elith/backend/operations/refactor.py) - Refactor code
4. [`test_gen`](../elith/backend/operations/test_gen.py) - Generate tests

Each operation builds a prompt that gets sent to a single provider.

### 3. PROVIDERS - Accurate Count

**DOCUMENTED:** Multiple providers mentioned
**ACTUAL:** 3 providers implemented:
1. [`ClaudeProvider`](../elith/backend/providers/claude_provider.py) - Anthropic Claude
2. [`LMStudioProvider`](../elith/backend/providers/lmstudio_provider.py) - Local LM Studio
3. [`OpenRouterProvider`](../elith/backend/providers/openrouter_provider.py) - OpenRouter API

**MISSING:** No Gemini, Ollama, or direct OpenAI providers (only via OpenRouter)

### 4. SKILLS - Accurate

**DOCUMENTED:** 12 skills
**ACTUAL:** 12 skills correctly implemented in [`backend/skills/`](../elith/backend/skills/__init__.py):
- read_file, write_file, list_files, search_code
- git_diff, git_commit, run_tests, find_references
- analyze_dependencies, explain_function, install_package, read_logs

✅ This is accurate!

### 5. CLI COMMANDS - Major Discrepancies

**DOCUMENTED (INCORRECT):**
- `elith-start` - Start backend daemon
- `elith-stop` - Stop backend daemon  
- `elith-auth` - Configure authentication
- `elith service logs` - View logs

**ACTUAL IMPLEMENTATION ([`cli.py`](../elith/cli.py)):**
- `elith` - Main command (auto-starts backend)
- `elith init` - Configuration wizard
- `elith chat` - Start TUI
- `elith service start|stop|restart|status` - Service management
- `elith explain [target]` - Explain operation
- `elith refactor <target> [--focus]` - Refactor operation
- `elith test-gen <target>` - Test generation
- `elith architect --problem <desc>` - Architecture design
- `elith scan [target]` - Scan repository
- `elith models` - List available models

**MISSING:** No `elith-start`, `elith-stop`, `elith-auth` commands exist

### 6. CONFIGURATION - Major Discrepancies

**DOCUMENTED (INCORRECT):**
- Config file: `elith.config.json`
- Agent enable/disable configuration
- Approval modes: confirm/autonomous/selective
- Webhook configuration

**ACTUAL IMPLEMENTATION:**
- Config file: `~/.elith/config.toml` (not JSON!)
- Config structure from [`cli.py`](../elith/cli.py:102-107):
  ```toml
  [default]
  model = "claude"
  
  [claude]
  api_key = "..."
  model = "claude-sonnet-4-20250514"
  ```
- No agent enable/disable (agents don't exist)
- No approval gate implementation found
- No webhook support found

### 7. API ENDPOINTS - Partially Correct

**DOCUMENTED:** Various endpoints
**ACTUAL ([`backend/main.py`](../elith/backend/main.py)):**

✅ CORRECT:
- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/status` - API status
- `POST /api/scan` - Scan repository ([`scan.py`](../elith/backend/routes/scan.py))
- `POST /api/execute` - Execute operation ([`execute.py`](../elith/backend/routes/execute.py))
- `GET /api/stream/{session_id}` - Stream output ([`stream.py`](../elith/backend/routes/stream.py))
- `GET /api/models` - List models ([`models.py`](../elith/backend/routes/models.py))
- `GET /api/tasks` - List operations ([`tasks.py`](../elith/backend/routes/tasks.py))

❌ INCORRECT/MISSING:
- No `POST /api/tasks` endpoint
- No `GET /api/tasks/:taskId` endpoint
- No `GET /api/history` endpoint
- Routes exist but not documented: `chat.py`, `create_project.py`, `history.py`, `results.py`

### 8. INSTALLATION - Partially Correct

**DOCUMENTED:** 5 install methods
**ACTUAL:**

✅ CORRECT:
- [`install-web.sh`](../elith/scripts/install-web.sh) - curl install (lines 1-154)
- [`bin/elith.js`](../elith/bin/elith.js) - npm/pnpm/bun wrapper (lines 1-122)
- [`elith.rb`](../elith/elith.rb) - Homebrew formula (lines 1-133)

❌ ISSUES:
- npm package name is `@elith/cli` but not published
- Homebrew formula has placeholder SHA256 values
- No actual brew tap exists yet

### 9. ENVIRONMENT VARIABLES

**DOCUMENTED (INCORRECT):**
- Many invented variables like `ELITH_PORT`, `ELITH_HOST`, `ELITH_LOG_LEVEL`, `ELITH_LOG_FILE`
- `MISTRAL_API_KEY` mentioned but no Mistral provider

**ACTUAL ([`.env.example`](../elith/.env.example)):**
```bash
ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...
GOOGLE_API_KEY=...
# LM Studio and Ollama don't need keys
```

Only 3 API keys, no Elith-specific env vars found in code.

### 10. CONTEXT ENGINE - Partially Implemented

**DOCUMENTED:** 
- Token reduction from 2M → 8k tokens
- Relevance scoring
- Smart file selection

**ACTUAL:**
- [`RepoScanner`](../elith/backend/context_engine/repo_scanner.py) - Scans files, filters by SKIP_DIRS
- [`VaultReader`](../elith/backend/context_engine/vault_reader.py) - Reads Obsidian markdown
- [`PacketBuilder`](../elith/backend/context_engine/packet_builder.py) - Selects 4-6 files max
- No relevance scoring algorithm found
- No token counting implementation
- Simple heuristics only (key files, entry points, same directory)

---

## DOCUMENTATION FILES REQUIRING UPDATES

### Critical Updates Needed:

1. **overview.mdx** - Remove 6-agent claims, describe actual 1-agent + 4-operations architecture
2. **quickstart.mdx** - Fix CLI commands (`elith-start` → `elith service start`)
3. **installation.mdx** - Fix service commands, remove non-existent commands
4. **configuration.mdx** - Change to TOML format, remove agent config, remove approval modes
5. **concepts/architecture.mdx** - Rewrite to reflect actual operation-based architecture
6. **concepts/core-concepts.mdx** - Remove multi-agent claims, remove approval gate
7. **guides/getting-started.mdx** - Rewrite with actual CLI commands and workflow
8. **guides/advanced-usage.mdx** - Remove agent config, spend limits, parallel tuning
9. **guides/integrations.mdx** - Mark as planned/future feature
10. **api/reference.mdx** - Fix CLI commands, update API endpoints
11. **api/authentication.mdx** - Fix `elith-auth` → `elith init`, remove Mistral
12. **troubleshooting.mdx** - Update with actual commands

---

## WHAT IS ACTUALLY IMPLEMENTED

### Core Architecture:
1. **Single Provider System** - User selects one provider (Claude, LM Studio, or OpenRouter)
2. **4 Operations** - explain, architect, refactor, test-gen
3. **12 Skills** - Exposed as tools to the LLM provider
4. **Context Engine** - Simple file selection (4-6 files)
5. **Session Logging** - Saves to `bob-reports/`
6. **CLI** - Interactive wizard + one-shot commands
7. **Backend API** - FastAPI with SSE streaming
8. **Service Management** - Auto-start/stop backend daemon

### What Works:
- Install via curl/npm/homebrew
- Configure provider via `elith init`
- Run operations: `elith explain`, `elith refactor`, etc.
- Backend auto-starts when needed
- Skills are called by LLM via tool calling
- Output streams via SSE
- Sessions logged to markdown

### What Doesn't Exist:
- Multi-agent coordination
- 4-phase pipeline
- Agent parallelization
- Message bus
- Approval gates
- Webhooks
- Most documented CLI commands
- Agent enable/disable config
- Spend limits
- `.elithignore` file support

---

## RECOMMENDATIONS

### Option 1: Update Docs to Match Reality (RECOMMENDED)
- Describe as "AI-powered code operations framework"
- Explain 4 operations (explain, architect, refactor, test-gen)
- Document actual CLI commands
- Show real config format (TOML)
- Remove multi-agent marketing
- Mark future features as "planned"

### Option 2: Implement Missing Features
- Would require significant development work
- Multi-agent system is complex to implement
- Current single-provider approach works well

### Option 3: Hybrid Approach
- Update docs for current reality
- Add "Roadmap" section for planned multi-agent features
- Keep some aspirational language but clearly mark as future

---

## NEXT STEPS

1. ✅ **Complete audit** (this document)
2. 🔄 **Update all .mdx files** with accurate information
3. 📝 **Update navigation.ts** if needed
4. 🔧 **Test documentation build**
5. 📊 **Generate final report**

The documentation needs a complete rewrite to match the actual implementation. The current docs describe a sophisticated multi-agent system that doesn't exist, while the actual codebase is a simpler but functional single-provider operation system.