# BCDV1011-ipfs
## Design Patterns Lab 3

1. Launch the IPFS Desktop application with the following config option under "API":
    ```javascript
    "HTTPHeaders": {
      "Access-Control-Allow-Origin": [
        "webui://-",
        "http://127.0.0.1:5001",
        "http://127.0.0.1:5002",
        "https://webui.ipfs.io",
        "http://localhost:3000"
      ]
    }
2. If IPFS launches and port 5001 is busy, click to "use 5002 instead". If IPFS launches with 5001, change "/react/src/App.js:6" from 5002 to 5001
3. cd into "/react" and "npm i", then perform "npm start"
4. If not auto-launched, navigate to http://localhost:3000
5. Click "Choose File" to browse to an image, and click "Upload" to upload using IPFS, and it will display an &lt;img&gt; with an "src" using IPFS (browser console will show CID hash)
