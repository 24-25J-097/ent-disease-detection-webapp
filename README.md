# **ENT Insight - Flutter App**  

ENT Insight is a mobile application designed for analyzing Medical images related to ENT (Ear, Nose, and Throat) conditions using Deep learning APIs.
 

## Getting Started

These instructions will help you set up and run the ENT Insight NextJs App on your local machine for development and testing purposes.

## **Features**  

- Upload and analyze Medical images.  
- Real-time prediction and analysis results.  
- User-friendly interface.  
  
## **Installation**  

### **Prerequisites**  

1. **Node** (Latest Version): [Install Node](https://nodejs.org/en/download/package-manager)  
2. **WebStorm/VSCode** (IDE)  
3. **Ngrok** for backend API tunneling: [Install Ngrok](https://ngrok.com/download)  

### **Clone the Repository**  
```bash
git clone https://github.com/24-25J-097/ent-disease-detection-webapp.git

cd ent-disease-detection-webapp
```

### **Ngrok Setup for Backend API** (If you have not done installed)

### Step 1: Create an Account
  - Register an account and log in to the Ngrok dashboard [official site](https://ngrok.com/signup?ref=downloads).
### Step 2: Install Ngrok
  - Download and install Ngrok from the [official site](https://download.ngrok.com/windows).
### Step 3: Connect Ngrok to Your Account
  - Run the following command to authenticate Ngrok on your system:

```bash
ngrok config add-authtoken <token>
```
### Step 4: Start the Backend Server
  - Start your local [Node.js backend API server](https://github.com/24-25J-097/ent-disease-detection-api).
```bash
cd <path to ent-disease-detection-api>

npm start
```
### Step 5: Start Ngrok Tunnel
  - Read the instruction in [DL Model Repo](https://github.com/24-25J-097/ent-disease-detection-dl-models)
```bash
ngrok http --domain=monarch-witty-platypus.ngrok-free.app 4000
```
> Replace 4000 with your backend’s port. Ngrok will provide a public URL like https://<your-ngrok-url>.ngrok.io.

## **Configuration**
### Change ENV 
  - Open the file .env-example (or wherever the API URL is configured).
  - Copy **.env-example** to **.env** 
  - Update the NEXT_PUBLIC_FASTAPI_BASE_URL value:

```.env
#.env
NEXT_PUBLIC_FASTAPI_BASE_URL="https://<your-ngrok-url>.ngrok.io" 
```

## **Run the App 😊**

### Install Dependencies
```bash
npm install
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## **Screenshots**

### Sinuitis Water's View X-Ray
<img src="https://github.com/user-attachments/assets/054438db-43ac-48f2-be67-b63a009d30ab" width="500">
<img src="https://github.com/user-attachments/assets/82425bab-0cc7-4b8b-8e9d-e125986c5293" width="500"> 

### Pharyngitis Oral endoscopy images Analyze
<img src="https://github.com/user-attachments/assets/cc2afb92-5d98-499a-951b-ff2e9abef7e7" width="500">
<img src="https://github.com/user-attachments/assets/608593a4-f67e-4bd7-8448-8fa198fcce81" width="500"> 

### Cholesteatoma Analyze
<img src="https://github.com/user-attachments/assets/c1b39cb1-dd00-4790-b013-3c5be1d43cbe" width="500">
<img src="https://github.com/user-attachments/assets/0867c596-69b0-4b23-9b80-06b776a8a03b" width="500">

### Foreign Body Detection
<img src="https://github.com/user-attachments/assets/5c722317-7db8-44a9-9963-e03ea13a5460" width="500">
<img src="https://github.com/user-attachments/assets/a07e737e-0260-4535-84c2-c3c5cb819bd6" width="500">


## **License**  

Copyright (c) 2024 24-25J-097 

All rights reserved. No part of this software may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without prior written permission from the author, except for brief quotations in reviews or academic references.

**Unauthorized use, modification, or distribution is strictly prohibited.**
