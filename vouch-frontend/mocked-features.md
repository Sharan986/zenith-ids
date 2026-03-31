# Currently Mocked Functional Features: Vouch Frontend

This document outlines the current functional features of the Vouch frontend and how they are being mocked. At present, the application is a high-fidelity prototype with nearly all complex logic and data persistence handled via local state, hardcoded arrays, and simulated API delays.

---

## 🔐 Core Infrastructure

### 1. Authentication (`/src/pages/Auth.jsx`)
*   **Current Functionality**: Users can switch between Login and Register modes, select a role (Student, Industry, College, Admin), and fill out a form (Name, Email, Password).
*   **Mock Implementation**:
    *   **Simulated API**: Uses `setTimeout` with a 1.5s delay to simulate a network request.
    *   **Navigation**: Directly calls `navigate()` to onboarding or dashboard routes upon "success".
    *   **Persistence**: No real session (no JWT, localStorage token storage, or cookie management) is implemented yet.
    *   **Validation**: Simple HTML5 `required` attributes only.

### 2. Onboarding (`/src/pages/Onboarding.jsx`)
*   **Current Functionality**: Captures role-specific metadata (Education for students, Company size for industry, etc.) after registration.
*   **Mock Implementation**:
    *   **Simulated API**: Uses `setTimeout` to emulate saving profile data.
    *   **Data Handling**: Collected data is not stored; it only triggers a "success" toast and redirects to the dashboard.

---

## 🏗️ Dashboards & User Flows

### 3. Student Dashboard (`/src/pages/dashboards/StudentDashboard.jsx`)
*   **Current Functionality**: Displays learning roadmaps (Frontend, Data Eng), industry readiness scores, suggested courses, and active tasks.
*   **Mock Implementation**:
    *   **Static Data**: Roadmap progress (e.g., 60% complete) is hardcoded in the JSX.
    *   **Task List**: The "Active Tasks" table is hardcoded.
    *   **Submissions**: The submission modal accepts a URL but only triggers a toast without sending data to a server.

### 4. Industry Dashboard (`/src/pages/dashboards/IndustryDashboard.jsx`)
*   **Current Functionality**: Displays talent pipeline, hiring metrics (Active Tasks, Pending Reviews, Hired), and a list of top candidates.
*   **Mock Implementation**:
    *   **Task Creation**: "New Task" modal allows form entry but only displays a toast on submission.
    *   **Candidate List**: Hardcoded array of "Candidate #1824", etc.
    *   **Hiring Process**: "Hire Candidate" triggers a toast but doesn't update any status.

### 5. College & Admin Dashboards
*   **Current Functionality**: Performance tracking, institution setup, and platform management.
*   **Mock Implementation**: Similar to the above; metrics and lists are hardcoded; actions (e.g., adding students or managing users) are local UI interactions only.

---

## 🛠️ Specialized Features

### 6. Task Marketplace (`/src/pages/Marketplace.jsx`)
*   **Current Functionality**: A central hub for students to find industry tasks. Includes category filtering (Frontend, Backend, etc.) and search.
*   **Mock Implementation**:
    *   **Data**: All tasks are stored in a local `tasks` array.
    *   **Search/Filter**: Functional locally via React `useState`, but no server-side querying.
    *   **Navigation**: "Start Task" redirects to the Simulator with a toast.

### 7. Industry Simulator (`/src/pages/Simulator.jsx`)
*   **Current Functionality**: A code editor environment (Monaco-like) where students solve industry problems. Includes "Run Tests" and "Submit Solution".
*   **Mock Implementation**:
    *   **Test Runner**: A simple string-based check (looking for `return` and a minimum character count) simulates "passing" test cases.
    *   **Editor**: A basic HTML `textarea` mimicking a code editor.
    *   **Feedback**: Results are computed locally and displayed with a `setTimeout` to feel like an execution environment.

### 8. Verified Portfolio (`/src/pages/Portfolio.jsx`)
*   **Current Functionality**: Public-facing profile page showing a candidate's readiness score, skills, and task history.
*   **Mock Implementation**:
    *   **Data Fetching**: Pulls the candidate ID from the URL but displays the same hardcoded project history and scores regardless of the ID.

---

## 📋 Common Mocking Patterns Used

1.  **`setTimeout(..., 1500)`**: Used across all submission forms to simulate network latency.
2.  **`useToast`**: Primary feedback mechanism for indicating "success" of non-existent backend actions.
3.  **Local Constants**: Large arrays (e.g., `roles`, `tasks`, `candidateData`) stored inside the component files rather than fetched from an API.
4.  **Route-Based Logic**: Using `useParams` to switch layout modes (e.g., in Onboarding or Portfolio) while the underlying data remains static.

---

## 🚀 Integration Roadmap (TODOs)
- [ ] Replace `setTimeout` callbacks with `axios`/`fetch` calls to an API.
- [ ] Implement a Global State (Context API or Redux) for Auth and User Profile.
- [ ] Move hardcoded constants to a backend database (MongoDB/Postgres).
- [ ] Connect the Simulator to a real code execution sandbox (e.g., Piston or Judge0).
- [ ] Implement proper file/link storage for task submissions.
