const primaryServiceUuid = '0000ffe0-0000-1000-8000-00805f9b34fb';
const receiveCharUuid = '12345678-1234-5678-1234-56789abcdef1';
const sendCharUuid = '12345678-1234-5678-1234-56789abcdef3';
let device, sendCharacteristic, receiveCharacteristic;

bleConnectButton.onclick = async () => {
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
};


const disconnect = () => {
  device = null;
  receiveCharacteristic = null;
  sendCharacteristic = null;
  bleStatus.innerText = 'Disconnected';
};
