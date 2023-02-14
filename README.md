# Assist-Abili
Camino extension tool that provides accessibility options to the platform. 
You can find our repository at https://github.com/Jashanlol/Assist-Abili

### 1. Copying the repository
You can easily download extension by going to your local IDE and running in the command line:

```
git clone https://github.com/Jashanlol/Assist-Abili.git
```
From there, our extension will appear in the Assist-Abili folder. 

### 2. Uploading the extension to Chrome
Navigate to this link in your Chrome browser: chrome://extensions/  . In the top right corner of the webpage there should be a tag called "Developer Mode", if not there there, enable Developer Mode in Chrome settings. Then enable Developer Mode. Now click on the tag "Load Unpacked" at the top left of the webpage. It will prompt you to select a folder, navigate to the directory that holds the Assist-Abili folder and select it. Once uploaded, you should see the Assist-Abili extension appear on the extensions screen. Make sure the extension is turned on using the slider button.


### 3. Using the extension
The extension will now appear when you navigate to the extension pop-up menu. Now, you can navigate to Camino @ :  

[![](https://img.shields.io/badge/Camino-red?style=for-the-badge)](https://camino.instructure.com/)
  
From there, open up the extension pop-up menu and look for the Assist-Abili extension. When you click on it, it will open up a pop-up menu that will enable our accessibility extension.


### 4. Unit Testing

To unit test our extension, go to your local IDE and open up to the directory that holds the Assist-Abili extension. Install NodeJS on your respective device by navigating to this link: https://nodejs.org/en/download/  . Download it and then go to your local IDE and run this in the command line to install NPM:
```
npm install npm@latest -g
```
Then install the Jest framework to test the code by running this in the coommand line:
```
npm install --save-dev jest
```
Then install JSdom with this command in the command line:
```
npm install jsdom
```
Now, the framework is setup and you are ready to test the code. To test the code, run this in the command line:
 ```
 npx jest functions.test.js
 ```
 
 ![image](https://user-images.githubusercontent.com/92197005/218671340-50375a2d-2387-4978-931f-e8ee96170b46.png)




  



