# Link : A Social Platform for Connecting with Friends

[Link](https://link-social.netlify.app/) is a social platform designed to facilitate seamless connectivity between individuals and their friends. 

**Note: Cookies must be enabled to access Link's full functionality.**

## Key Features

### Authentication
Link prioritizes the security of user information. User passwords are encrypted using the industry-standard [bcrypt.js](https://www.npmjs.com/package/bcryptjs) library, ensuring sensitive data remains safe and protected. Additionally, authorization is achieved through the utilization of [JSON Web Tokens (JWT)](https://www.npmjs.com/package/jsonwebtoken), providing a secure and efficient method for verifying user identity.

### Email Verification
To enhance user trust and security, Link incorporates an email verification system. By utilizing [nodemailer](https://www.npmjs.com/package/nodemailer) , the platform sends verification emails to users during the registration process, ensuring that only legitimate and verified accounts gain access.

### Real-time Chatting 
Link leverages the power of [socket.io](https://socket.io/) a library that supports low-latency, bidirectional communication.

### Markdown & LaTeX Support
Link goes beyond standard text input by integrating the capability to render Markdown and LaTeX. Utilizing the [marked](https://marked.js.org/) library for Markdown and [katex](https://katex.org/) for LaTeX, users can express themselves with rich text formatting and mathematical notations, fostering a diverse range of interactions and discussions.

### Partial Searching
To enable efficient user discovery, Link uses dynamic programming to compute the similarity between two strings using the edit distance algorithm. This approach facilitates partial searching, allowing users to find others with similar names, streamlining the process of connecting with friends.


## Tech Stack

Front-End: React.js, HTML, CSS, Chakra-UI
<br> 
Back-End: Node.js, Express.js, MongoDB, Mongoose, SuperTest
<br>
Authentication: bcrypt.js, JSON Web Token
<br>
Real-time Chat: socket.io
<br>
Rich Text Support: marked, katex
<br>
Deployment: Netlify, Railway


## Live Demo

https://link-social.netlify.app/

## Screenshots

![Link Screenshot](./src/assets/images/1.png)
![Link Screenshot](./src/assets/images/2.png)
![Link Screenshot](./src/assets/images/3.png)
![Link Screenshot](./src/assets/images/4.png)
![Link Screenshot](./src/assets/images/5.png)
![Link Screenshot](./src/assets/images/6.png)
![Link Screenshot](./src/assets/images/7.png)
![Link Screenshot](./src/assets/images/8.png)
![Link Screenshot](./src/assets/images/9.png)
![Link Screenshot](./src/assets/images/10.png)
![Link Screenshot](./src/assets/images/11.png)
![Link Screenshot](./src/assets/images/12.png)
![Link Screenshot](./src/assets/images/13.png)
![Link Screenshot](./src/assets/images/14.png)
![Link Screenshot](./src/assets/images/15.png)
![Link Screenshot](./src/assets/images/16.png)
![Link Screenshot](./src/assets/images/17.png)