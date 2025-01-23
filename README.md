# Open Bolt:
This project is a vanilla version of bolt.new, built using open-source packages and maintaining an open-source codebase. The aim is to make minimal commits to adapt the existing bolt.new codebase into a form that resembles the closed-source version. Future development could include extending the project with a plugin system to create a bolt.diy-like experience.

Our goal is to develop a clean codebase that replicates bolt.new's feature set. Completing this will provide insight into the majority of the codebase, allowing us to identify which files to refactor and how to structure them. After refactoring and implementing any necessary updates, the final step before introducing the plugin system will be adding documentation.

## Features

- **AI-powered full-stack web development** directly in your browser.
- **Attach images to prompts** for better contextual understanding.
- **Integrated terminal** to view output of LLM-run commands.
- **Revert code to earlier versions** for easier debugging and quicker changes.
- **Download projects as ZIP** for easy portability.
- **GitHub support** for easy project management.
- **Local project support** easy importing of local projects.
- **Integration-ready Docker support** for a hassle-free setup.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Git**: Required for cloning the repository. Download and installation instructions are available at [Git Downloads](https://git-scm.com/downloads).

- **Node.js**: Necessary for running the application. Obtain the latest version from [Node.js Official Website](https://nodejs.org/).

- **pnpm**: A fast, disk space-efficient package manager. Install it globally using npm:

  ```bash
  npm install -g pnpm
  ```

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the Repository**:

   Open your terminal and execute the following command to clone the repository:

   ```bash
   git clone https://github.com/open-bolt/bolt.new.git
   ```

   Alternatively, download the ZIP file from the repository's GitHub page and extract it to your desired location.

2. **Navigate to the Project Directory**:

   ```bash
   cd bolt.new
   ```

3. **Install Dependencies**:

   Use pnpm to install the required packages:

   ```bash
   pnpm install
   ```

4. **Start the Development Server**:

   Run the following command to start the development server:

   ```bash
   pnpm run dev
   ```

   The application should now be running, and you can access it in your browser.

## Running with Docker (optional)

To run the application using Docker, ensure Docker and Docker Compose are installed on your system. Then, execute the following command:

```bash
docker compose up -d
```

This command will build and start the application in detached mode.

## What's Been Already Completed:
- [x] clone bolt.new
- [x] lint and typecheck fixes
- [x] update dependances
- [x] fixed typo and grammar mistakes
- [x] example env
- [x] fixed cors issue
- [x] improved ui on smaller device
- [x] image attachment support
- [x] example env
- [x] docker support
- [x] update to the latest model
- [x] download project as zip
- [x] push to Github
- [x] open project in new tab
- [x] extra history item options
- [x] more code mirror support
- [x] git clone import
- [x] git clone import by url
- [x] starter projects
- [x] local folder import
- [x] auto sync to local (will not work in firefox)
- [x] chat rollback
- [x] dedicated bolt terminal
- [x] user auth via supabase

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details. 
