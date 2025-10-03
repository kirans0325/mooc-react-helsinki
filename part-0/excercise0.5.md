```mermaid
sequenceDiagram
    participant User as  Browser
    participant Server as Server

    %% Initial load
    User->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->>User: HTML document (notes)

    User->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>User: CSS stylesheet

    User->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server-->>User: JavaScript file

    User->>Server: https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>User: JSON (notes data)
    Note right of User: Render notes in DOM