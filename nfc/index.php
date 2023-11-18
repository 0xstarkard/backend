<!DOCTYPE html>
<html>
  <head>
    <title>Web NFC Read Write</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="0-dummy.css">
    <script defer src="1-read-write.js"></script>
  </head>
  <body>
    <!-- (A) NFC TAG ACTIONS -->
    <div id="demoNFC">
      <input type="text" id="demoT" value="Hello World" required>
      <input type="button" id="demoW" value="Write" disabled onclick="nfc.write();">
      <input type="button" id="demoR" value="Read" disabled onclick="nfc.read()">
    </div>

    <!-- (B) "CONSOLE MESSAGES" -->
    <div id="demoMSG"></div>
  </body>
</html>