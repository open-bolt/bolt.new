import { generateId, type Message } from 'ai';

interface FileContent {
  path: string;
  content: string;
}

interface DetectedCommand {
  type: string;
  command: string;
  description: string;
}

export async function detectProjectCommands(files: FileContent[]): Promise<DetectedCommand[]> {
  const commands: DetectedCommand[] = [];

  // look for package.json to detect npm/node projects
  const packageJson = files.find((f) => f.path === 'package.json');

  if (packageJson) {
    try {
      const pkg = JSON.parse(packageJson.content);

      // add install command
      commands.push({
        type: 'install',
        command: 'npm install',
        description: 'Install dependencies',
      });

      // add dev command if it exists
      if (pkg.scripts?.dev) {
        commands.push({
          type: 'dev',
          command: 'npm run dev',
          description: 'Start development server',
        });
      }

      // add build command if it exists
      if (pkg.scripts?.build) {
        commands.push({
          type: 'build',
          command: 'npm run build',
          description: 'Build the project',
        });
      }
    } catch (e) {
      console.error('Error parsing package.json:', e);
    }
  }

  return commands;
}

export function createCommandsMessage(commands: DetectedCommand[]): Message | null {
  if (commands.length === 0) {
    return null;
  }

  const commandsContent = commands
    .map(
      (cmd) =>
        `<boltAction type="shell" title="${cmd.description}">
${cmd.command}
</boltAction>`,
    )
    .join('\n');

  return {
    role: 'assistant',
    content: `Here are the available commands for this project:
<boltArtifact id="project-commands" title="Project Commands">
${commandsContent}
</boltArtifact>`,
    id: generateId(),
    createdAt: new Date(),
  };
}
