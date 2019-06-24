import handleWindowMessage from './window';

export default function handleMessage() {
  console.log('============ handleMessage =============');
  console.log(handleWindowMessage);
  handleWindowMessage();
}
