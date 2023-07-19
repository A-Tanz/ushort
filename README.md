# uShort
This is a simple URL shortener project built with Node.js and MongoDB. It allows you to shorten long URLs into shorter, more manageable links.

## Prerequisites

- Node.js 
- MongoDB 

## Usage

1. In your browser, enter a long URL that you want to shorten in the provided input field.

2. Click on the "Shrink" button.

3. A shortened URL will be generated and displayed on the page.

4. You can now use the shortened URL to access the original long URL.

## Custom Domain Setup

To use a custom domain locally, you can add an entry in your hosts file.

1. Open your hosts file:

   - **Windows**: Open `C:\Windows\System32\drivers\etc\hosts` with a text editor as administrator.
   - **Mac/Linux**: Open `/etc/hosts` with a text editor using sudo.

2. Add the following entry:  `127.0.0.1 ushort`

Save the hosts file.

3. Restart your browser (or flush the DNS cache) for the changes to take effect.

4. Now you can access the URL shortener locally using `http://ushort/`.

## Installation

1. Clone the repository:

2. Navigate to the project directory: `cd url-shortener`

3. Install the dependencies: `npm install`

4. Start the server: `node app.js`

5. Open your browser and visit `http://ushort/`   

## Additional Information

1. The project uses base36 encoding to generate the shortened URLs. This encoding scheme allows for alphanumeric characters (0-9, A-Z) in the URLs.

2. By using base36 encoding, the URL shortener has a capacity to store 36^6 unique URLs, which equals 2,176,782,336 URLs.

3. I have used custom domain locally to run this for deploy it we actually have to buy a domain.



