# DECO2017 A3 - Media Consumption Tracker

## Development Process
The journey embarked upon in the development of this web-based application commenced with a pivotal insight: identifying a problem that needed a solution - the tracking of media consumption time. Prior research into this area provided a solid starting point to brainstorm potential solutions. Concept validation involved conducting speed dating sessions with potential users, which led to the selection of a media consumption tracker as the optimal solution within the project's development constraints.

The initial phase involved sketching the web page layout, which later matured into wireframes and ultimately evolved into a detailed mock-up, backed by stringent branding guidelines. The actual development process was kick-started using GitHub, a powerful version control software. The development stages were strategically planned, commencing with HTML elements, followed by the integration of CSS styling. Given the limited styling needs of this project, a CSS file was employed. Notably, certain design elements, such as the banner, underwent necessary alterations in the iterative design phase based on the technical feasibility and feedback derived from the A2 report. The concluding stage involved the implementation of JavaScript functionality and minor tweaks to the HTML, CSS, and JS files to polish the web-based application, thereby ensuring its readiness for delivery.


## Design Iterations and Improvement
Throughout the project, substantial enhancements and iterations were made. The inclusion of data visualization and filter functionality was reevaluated due to project complexity, which directed the focus towards creating an intuitive tracker feature experience. This pivot led to a change in the design patterns on the item tracker card, with the three-dot pattern being replaced by 'edit' and 'delete' icons, simplifying user interaction and reducing technical complexity. Based on user feedback, the character limit was removed to enable users to freely name their media consumption activity. The timer feature was replaced with user input and the filter bar was transformed into a drop-down filter, which further simplified user interaction.

## Application Configuration and Deployment Procedures
To deploy the application, users are required to download files from GitHub which include the 'node_modules' folder, '.gitignore', 'package.json', 'package-lock.json', and 'server.js'. After this, 'npm run test' should be executed in the local environment at http://localhost:8888/.

Detailed setup instructions are as follows:

1. Download: Retrieve the application files from the GitHub repository.
2. Install: Navigate to the project directory and run 'npm install' command in the terminal.
3. Run Test: Execute the 'npm run test' command in the terminal to run the application locally.

## Reflection and Future Consideration
Key takeaways from the development process include recognizing the importance of early consideration of technical feasibility in the design stage. This approach significantly reduces the magnitude of changes needed due to technical complexities during the development phase. The use of Git for version control emerged as a best practice, providing a reliable platform for tracking changes, ensuring project consistency, and facilitating collaboration.

In addition, it was recognized that responsive design is vital to delivering a consistent experience across diverse devices. Bootstrap was identified as a useful tool in this regard. As a designer, understanding the development process greatly improved communication with developers.

Looking ahead, the React framework with Firebase has been identified as an exciting area for exploration to enhance scalability and maximize impact. Possible feature enhancements include user time tracking and data entry, which could augment user experience by catering to diverse preferences. Regular usability testing will ensure the product remains intuitive and accessible, and segmenting JS code into separate files may improve scalability with the addition of new features.