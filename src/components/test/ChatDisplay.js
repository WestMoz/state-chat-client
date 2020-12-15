import React, { useState, useEffect } from 'react';
import { usePubNub } from 'pubnub-react';

const channels = ['stateChatGlobal'];

export default function ChatDisplay({ signedIn }) {
  const pubnub = usePubNub();
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');

  //will change uuid based on user signed in

  const handleMessage = (event) => {
    const message = event.message;
    console.log('IN HANDLE MESSAGE');
    console.log('event obj', event);
    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      addMessage((messages) => [...messages, event]);
      // addMessage([...messages, event]);
    }
  };

  useEffect(() => {
    console.log('IN USE EFFECT');
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
    pubnub.fetchMessages(
      {
        channels: ['stateChatGlobal'],
        count: 25,
      },
      (status, response) => {
        console.log(status);
        if (!status.error) {
          console.log('FETCHED CHAT HISTORY');
          const history = response.channels.stateChatGlobal;
          // addMessage([...history]);
          addMessage((messages) => [...messages, ...history]);
        }
      },
    );
  }, []);

  console.log(messages);

  const sendMessage = (message) => {
    console.log('IN SEND MESSAGE');
    if (message) {
      pubnub
        .publish({ channel: channels[0], message })
        .then(() => setMessage(''));
    }
  };

  return (
    <div
      className="chat-main"
      style={{
        height: '70%',
        boxSizing: 'border-box',
      }}
    >
      <header className="App-header" style={{ height: '100%' }}>
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
              onKeyPress={(e) => {
                if (e.key !== 'Enter') return;
                sendMessage(message);
              }}
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
  );
}
