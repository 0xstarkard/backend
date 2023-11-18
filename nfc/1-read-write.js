var nfc = {
  // (A) INIT
  hTxt : null, // html data to write
  hWrite : null, // html write button
  hRead : null, // html read button
  hMsg : null, // html "console messages"
  init : () => {
    // (A1) GET HTML ELEMENTS
    nfc.hTxt = document.getElementById("demoT"),
    nfc.hWrite = document.getElementById("demoW"),
    nfc.hRead = document.getElementById("demoR"),
    nfc.hMsg = document.getElementById("demoMSG");
    // (A2) FEATURE CHECK + GET PERMISSION
    if ("NDEFReader" in window) {
      nfc.logger("Listo!");
      nfc.hWrite.disabled = false;
      nfc.hRead.disabled = false;
      nfc.hReadOnly.disabled = false;
    } else { nfc.logger("Web NFC no soportado por el navegador."); }
  },

  // (B) HELPER - DISPLAY LOG MESSAGE
  logger : msg => {
    let row = document.createElement("div");
    row.innerHTML = msg;
    nfc.hMsg.appendChild(row);
  },

  // (C) WRITE NFC TAG
  write : () => {
    nfc.logger("Acerca un Tag NFC");
    const ndef = new NDEFReader();
    ndef.write({
        records: [{ recordType: "url", data: nfc.hTxt.value }]
      } )
    .then(() => nfc.logger("Escritura Correcta"))
    .catch(err => nfc.logger("ERROR - " + err.message));
  },

  // (D) READ NFC TAG
  read : () => {
    nfc.logger("Acerca un Tag NFC");
    const ndef = new NDEFReader();
    ndef.scan()
    .then(() => {
      ndef.onreadingerror = err => nfc.logger("Error de lectura");
      ndef.onreading = evt => {
        const decoder = new TextDecoder();
        for (let record of evt.message.records) {
          nfc.logger("id: " + record.id);
          nfc.logger("Tipo de Registro: " + record.recordType);
          nfc.logger("Datos: " + decoder.decode(record.data));
        }
      };
    })
    .catch(err => nfc.logger("Error de lectura - " + err.message));
  }
};
window.onload = nfc.init;