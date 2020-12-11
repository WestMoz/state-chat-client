import React, { useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';
import '../styles/livechat.css';
require('dotenv').config();

// const pubnub = new PubNub({
//   publishKey: process.env.publishKey,
//   subscribeKey: process.env.subscribeKey,
//   uuid: 'Moz',
// });
//will change uuid based on user signed in

const channels = ['stateChatGlobal'];
//might set channel to channel create between two users
console.log(process.env.PUBLISH_KEY);

export default function LiveChat({ signedIn }) {
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');

  const pubnub = new PubNub({
    publishKey: 'pub-c-3b969d48-b57c-43b1-bb5b-fa1906e85ce6',
    subscribeKey: 'sub-c-b20074f0-1f81-11eb-aa70-46ca21c7ec50',
    uuid: signedIn.username,
  });
  //will change uuid based on user signed in

  // React.useEffect(() => {
  //   pubnub.fetchMessages(
  //     {
  //       channels: ['stateChatGlobal'],
  //       end: Date.now(),
  //       count: 25, // default/max is 25
  //     },
  //     function (status, response) {
  //       console.log(status, response);
  //       if (!status.error) {
  //         // console.log(response.channels.awesomeChannel);
  //         // addMessage([...response.channels.awesomeChannel[0]]);
  //         const history = response.channels.stateChatGlobal.map((foo) => foo);
  //         console.log(history);
  //         addMessage(history);
  //       }
  //     },
  //   );
  // }, []);
  //USE EFFECT CAUSES SOME SORT OF MEMORY LEAK

  console.log(messages);

  const sendMessage = (message) => {
    pubnub.publish(
      {
        channel: channels[0],
        message,
      },
      () => setMessage(''),
    );
    // addMessage([message, ...messages]);
  };
  return (
    <PubNubProvider client={pubnub}>
      <div
        style={{
          height: '70%',
          boxSizing: 'border-box',
        }}
      >
        <header className="App-header" style={{ height: '100%' }}>
          <PubNubConsumer>
            {(client) => {
              client.addListener({
                message: (messageEvent) => {
                  addMessage([...messages, messageEvent]);
                },
              });

              client.subscribe({ channels });
            }}
          </PubNubConsumer>
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <div
              style={{
                backgroundColor: 'grey',
                height: '1.5em',
                paddingLeft: '10px',
              }}
            >
              Live Chat
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                backgroundColor: 'white',
                height: '85%',
                overflow: 'scroll',
                overflowX: 'hidden',
                paddingBottom: '5px',
              }}
            >
              {[...messages].reverse().map((message, messageIndex) => {
                return (
                  <div
                    className={
                      message.uuid === signedIn.username ||
                      message.publisher === signedIn.username
                        ? 'myMessage'
                        : 'otherMessage'
                    }
                    key={`message-${messageIndex}`}
                  >
                    <p className="chat-username">
                      {message.uuid ? message.uuid : message.publisher}
                    </p>
                    {message.message}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                height: '3em',
                width: '100%',
                backgroundColor: 'lightgrey',
              }}
            >
              <input
                type="text"
                style={{
                  borderRadius: '5px',
                  width: '70%',
                  fontSize: '16px',
                }}
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                style={{
                  color: 'white',
                  borderRadius: '5px',
                  fontSize: '16px',
                  width: '30%',
                }}
                class="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  sendMessage(message);
                }}
              >
                Send
              </button>
            </div>
          </div>
        </header>
      </div>
    </PubNubProvider>
  );
}
