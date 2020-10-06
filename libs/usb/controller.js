let textDecoder = new TextDecoder("utf-8");
let textEncoder = new TextEncoder();

// Connect to usb arduino
serial.requestPort = () => {
  const filters = [{'vendorId': 0x2341, 'productId': 0x8036}, {'vendorId': 0x2341, 'productId': 0x8037}];
  return navigator.usb.requestDevice({'filters': filters}).then(device => new serial.Port(device)).catch(() => console.log('Error on port request!'));
}

// Show USB output
function addOutput(txt) {
  const node = document.createElement("DIV");
  const textNode = document.createTextNode(txt);
  node.appendChild(textNode);
  outputArea.appendChild(node);
}

// Show USB response
function addResult(txt) {
  const node = document.createElement("DIV");
  const textNode = document.createTextNode(txt);
  node.appendChild(textNode);
  resultArea.appendChild(node);
}

// Connect UI to device
usbConnectButton.addEventListener('click', () => {
  if (port) {
    connectButton.textContent = 'Connected';
    port.disconnect();
    port = null;
  } else {
    serial.requestPort().then(selectedPort => {
      port = selectedPort;
      port.connect().then(() => {
        console.log('Connected!');
        connectButton.textContent = 'Diconnected';
        port.onReceive = (data) => {
          const decoded = textDecoder.decode(data);
          addResult(decoded);
          addResult('------------------------------------');
        }
      })
    })
  }
});

jsonButton.addEventListener('click', () => {
  if (port) {
    const data = chunkDu();
    addOutput(data);
    addOutput('------------------------------------');
    _.forEach(data, (v, k) => {
      addOutput(k);
      addOutput(v);
      port.send(v);
      port.send(textEncoder.encode('~'));
    });
  }
});

rock7Button.addEventListener('click', () => {
  port.send(textEncoder.encode('$'));
});

rock7TestButton.addEventListener('click', () => {
  port.send(textEncoder.encode('~'));
});

masterSlaveButton.addEventListener('click', () => {
  const txt = 'LOGAN';
  for (let i = 0; i < txt.length; i++) {
    port.send(textEncoder.encode(txt.charAt(i)));
  }
  port.send(textEncoder.encode('~'));
});
