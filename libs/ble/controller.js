const primaryServiceUuid = '0000ffe0-0000-1000-8000-00805f9b34fb';
const receiveCharUuid = '12345678-1234-5678-1234-56789abcdef1';
const sendCharUuid = '12345678-1234-5678-1234-56789abcdef3';
let device, sendCharacteristic, receiveCharacteristic;


// Show BLE output
function addBleOutput(txt) {
  const node = document.createElement("DIV");
  const textNode = document.createTextNode(txt);
  node.appendChild(textNode);
  bleOutputArea.appendChild(node);
}

// Show BLE response
function addBleResult(txt) {
  const node = document.createElement("DIV");
  const textNode = document.createTextNode(txt);
  node.appendChild(textNode);
  bleResultArea.appendChild(node);
}

/*bleConnectButton.onclick = async () => {
  device = await navigator.bluetooth
    .requestDevice({
      filters: [{
        services: [primaryServiceUuid]
      }]
    });
  const server = await device.gatt.connect();
  const service =
    await server.getPrimaryService(primaryServiceUuid);
  receiveCharacteristic =
    await service.getCharacteristic(receiveCharUuid);
  sendCharacteristic =
    await service.getCharacteristic(sendCharUuid);

  device.ongattserverdisconnected = disconnect;
  bleStatus.innerText = 'Connected';
};*/


bleConnectButton.onclick = () => {
  navigator.bluetooth.requestDevice({filters: [{services: [primaryServiceUuid]}]})
    .then(device => {
      bleDevice = device;
      addBleResult(`> Name: ${device.name}`);
      addBleResult(`> Id: ${device.id}`);
      addBleResult(`> Connected: ${device.gatt.connected}`);
      bleStatus.innerHTML = 'Connected';
      bleDevice.ongattserverdisconnected = disconnect;
    })
    .catch(error => {
      addBleResult(`Argh! ${error}`);
      bleStatus.innerText = 'ERROR!';
    });
};


const disconnect = () => {
  bleDevice = null;
  bleStatus.innerText = 'Disconnected';
};
