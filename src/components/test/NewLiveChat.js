import React from 'react';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import '../../styles/livechat.css';
import ChatDisplay from './ChatDisplay';
require('dotenv').config();

// const pubnub = new PubNub({
//   publishKey: process.env.publishKey,
//   subscribeKey: process.env.subscribeKey,
//   uuid: 'Moz',
// });
//will change uuid based on user signed in

// const channels = ['stateChatGlobal'];
//might set channel to channel create between two users

export default function LiveChat({ signedIn }) {
  const pubnub = new PubNub({
    publishKey: 'pub-c-3b969d48-b57c-43b1-bb5b-fa1906e85ce6',
    subscribeKey: 'sub-c-b20074f0-1f81-11eb-aa70-46ca21c7ec50',
    uuid: signedIn.username,
  });

  return (
    <PubNubProvider client={pubnub}>
      <ChatDisplay signedIn={signedIn}></ChatDisplay>
    </PubNubProvider>
  );
}
