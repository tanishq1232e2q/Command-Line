## Developer Context Switch Tracker (CLI)
# a. Problem Statement

As a developer, I often work on multiple projects in parallel and frequently switch between different directories using the command line. This frequent context switching negatively impacts focus and productivity, but it is difficult to measure or analyze how often it happens during daily development work.

The problem this utility solves is tracking and analyzing command-line context switching by recording when a developer moves between different working directories and executes commands. By capturing this data, the tool provides insights into focus patterns and helps identify excessive or unnecessary switching between projects.

# b. How to Run the Program
Prerequisites

Node.js installed (v16+ recommended)

No external libraries or frameworks required

Steps to Run

Clone or download the project folder.

Open a terminal (Command Prompt / PowerShell / VS Code terminal).

Navigate to the project directory:

* cd D:\Command-Line


Run the tracker from any directory you are working in:

* node D:\Command-Line\track.js


Change to another directory and run the tracker again to record a context switch:

cd C:\Users\HP\Music
node D:\Command-Line\track.js


To view the context switching report, run:

node report.js


The program stores all tracking data locally in a data.json file.

# c. Design Decisions and Assumptions

Command-line based tracking:
The utility tracks context switching only when executed from different working directories. This design aligns with real developer workflows where most development tasks are performed via the terminal.

Local JSON storage:
Data is stored in a simple JSON file to ensure transparency, easy debugging, and no dependency on external databases or services.

Standard libraries only:
The solution uses only Node.js built-in modules (fs, path) to comply with assignment constraints and keep the implementation lightweight.

Explicit execution model:
A context switch is recorded only when the tracker is run after changing directories. This avoids background processes, OS-level hooks, or intrusive monitoring while maintaining accuracy.

Defensive error handling:
The program safely handles missing or corrupted data files by resetting to a clean state instead of crashing.
