import React, { useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';
import '../styles/livechat.css';

// const pubnub = new PubNub({
//   publishKey: process.env.publishKey,
//   subscribeKey: process.env.subscribeKey,
//   uuid: 'Moz',
// });
//will change uuid based on user signed in

const channels = ['stateChatGlobal'];
//might set channel to channel create between two users

export default function LiveChat({ signedIn }) {
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');

  const pubnub = new PubNub({
    publishKey: 'pub-c-3b969d48-b57c-43b1-bb5b-fa1906e85ce6',
    subscribeKey: 'sub-c-b20074f0-1f81-11eb-aa70-46ca21c7ec50',
    uuid: signedIn.username,
  });
  // const pubnub = new PubNub({
  //   publishKey: 'pub-c-ee4b9d5f-e464-404d-b4a9-66df43f5903a',
  //   subscribeKey: 'sub-c-2dcb98f4-1f81-11eb-b558-be5397d4d556',
  //   uuid: signedIn.username,
  // });
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

  const sendMessage = (message) => {
    pubnub.publish(
      {
        channel: channels[0],
        message,
      },
      () => setMessage(''),
    );
    // addMessage(message);
  };
  return (
    <PubNubProvider client={pubnub}>
      <div
        // className="App"
        style={{
          height: '70%',
          // border: '1px solid green',
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
              //can change this to add timestamp to message and user posted

              client.subscribe({ channels });
            }}
          </PubNubConsumer>
          <div
            style={{
              width: '100%',
              height: '100%',
              // border: '1px solid black',
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
                  // flexGrow: 1,
                  width: '70%',
                  fontSize: '16px',
                }}
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                style={{
                  // backgroundColor: 'blue',
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
