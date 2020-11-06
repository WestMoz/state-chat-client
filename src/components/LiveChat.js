import React, { useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';

const pubnub = new PubNub({
  publishKey: 'pub-c-ee4b9d5f-e464-404d-b4a9-66df43f5903a',
  subscribeKey: 'sub-c-2dcb98f4-1f81-11eb-b558-be5397d4d556',
  uuid: 'Moz',
});
//will change uuid based on user signed in

const channels = ['awesomeChannel'];
//might set channel to channel create between two users

export default function LiveChat() {
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    pubnub.fetchMessages(
      {
        channels: ['awesomeChannel'],
        end: Date.now(),
        count: 25, // default/max is 25
      },
      function (status, response) {
        console.log(status, response);
        if (!status.error) {
          console.log(response.channels.awesomeChannel);
          // addMessage([...response.channels.awesomeChannel[0]]);
          const history = response.channels.awesomeChannel.map(
            (foo) => foo.message,
          );
          console.log(history);
          addMessage(history);
        }
      },
    );
  }, []);

  const sendMessage = (message) => {
    pubnub.publish(
      {
        channel: channels[0],
        message,
      },
      () => setMessage(''),
    );
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
                  addMessage([...messages, messageEvent.message]);
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
              border: '1px solid black',
            }}
          >
            <div style={{ backgroundColor: 'grey', height: '1.5em' }}>
              Live Chat
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                height: '85%',
                overflow: 'scroll',
                overflowX: 'hidden',
              }}
            >
              {messages.map((message, messageIndex) => {
                return (
                  <div
                    key={`message-${messageIndex}`}
                    style={{
                      display: 'inline-block',
                      float: 'left',
                      backgroundColor: 'lightblue',
                      color: 'black',
                      borderRadius: '20px',
                      margin: '5px',
                      padding: '8px 15px',
                      width: 'fit-content',
                    }}
                  >
                    {message}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: 'flex',
                height: '4em',
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
                  backgroundColor: 'blue',
                  color: 'white',
                  borderRadius: '5px',
                  fontSize: '16px',
                  width: '30%',
                }}
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
