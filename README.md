
# Drag-and-Drop UI Builder

This repository contains a simple drag-and-drop UI builder created using React. The project allows users to drag elements from a sidebar onto a main canvas area, position them as desired, and configure their properties via a modal dialog.


## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Usage](#usage)
4. [Installation](#installation)

## Project Structure

```
my-app/
│
├── src/
│ ├── components/
│ │ ├── Main.js
│ │ ├── Sidebar.js
│ │ └── Modal.js
│ ├── App.js
│ ├── App.css
│ └── index.js
│
├── public/
│ ├── index.html
│ └── ...
│
├── package.json
├── README.md
└── ...
```
## Features

- **Drag and Drop**: Drag elements from the sidebar and drop them onto the main canvas. After Droping one modal will open from where we can set the configurations.
- **Edit Elements**: Click on the element that you want to edit and press "Enter" to open a modal and edit their properties.
- **Delete Elements**: Click and use the `Delete` key to remove elements from the canvas.
- **Save State**: The state of the elements is saved in `localStorage`.
- **Export Configuration**: Export the current state of the canvas as a JSON file.


## Usages

1. **Dragging Elements**: Drag elements (Label, Input, Button) from the sidebar and drop them onto the main canvas.
2. **Editing Elements**: Can edit the properties of an existing element on the canvas by selecting and pressing enter.
3. **Deleting Elements**: Select an element and press the `Delete` key to remove it.
4. **Exporting Configuration**: Click the "EXPORT DATA" button to download the current configuration as a JSON file.


## Installation

Follow these steps to run the project locally:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/Arvindkumar7742/mini-page-builder.git
    cd mini-page-builder
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Run the Application**:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.