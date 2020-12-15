import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import { Report } from '@material-ui/icons';

const pubnub = new PubNub({
  publishKey: 'pub-c-3b969d48-b57c-43b1-bb5b-fa1906e85ce6',
  subscribeKey: 'sub-c-b20074f0-1f81-11eb-aa70-46ca21c7ec50',
  uuid: 'West',
});

function App({ signedIn }) {
  return (
    <PubNubProvider client={pubnub}>
      <Chat />
    </PubNubProvider>
  );
}

function Chat() {
  const pubnub = usePubNub();
  const [channels] = useState(['awesomeChannel']);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');

  console.log(messages);

  const handleMessage = (event) => {
    const message = event.message;
    console.log('event obj', event);
    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      const text = message.text || message;
      //   addMessage((messages) => [...messages, text]);
      addMessage((messages) => [...messages, event]);
    }
  };

  const sendMessage = (message) => {
    if (message) {
      pubnub
        .publish({ channel: channels[0], message })
        .then(() => setMessage(''));
    }
  };

  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
    pubnub.fetchMessages(
      {
        channels: ['awesomeChannel'],
        count: 25,
      },
      (status, response) => {
        console.log(status);
        if (!status.error) {
          console.log(response);
          //   response.awesome - channel.map((message) => {});
          const history = response.channels.awesomeChannel;
          console.log(history);
          addMessage((messages) => [...messages, ...history]);
        }
      },
    );
  }, [pubnub, channels]);

  return (
    <div style={pageStyles}>
      <div style={chatStyles}>
        <div style={headerStyles}>React Chat Example</div>
        <div style={listStyles}>
          {messages.reverse().map((message, index) => {
            return (
              <div key={`message-${index}`} style={messageStyles}>
                {message.message}
              </div>
            );
          })}
        </div>
        <div style={footerStyles}>
          <input
            type="text"
            style={inputStyles}
            placeholder="Type your message"
            value={message}
            onKeyPress={(e) => {
              if (e.key !== 'Enter') return;
              sendMessage(message);
            }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            style={buttonStyles}
            onClick={(e) => {
              e.preventDefault();
              sendMessage(message);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const pageStyles = {
  //   alignItems: 'center',
  background: '#282c34',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
};

const chatStyles = {
  display: 'flex',
  flexDirection: 'column',
  height: '70%',
  width: '100%',
};

const headerStyles = {
  background: '#323742',
  color: 'white',
  fontSize: '1rem',
  padding: '10px 15px',
};

const listStyles = {
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflow: 'auto',
  padding: '10px',
};

const messageStyles = {
  backgroundColor: '#eee',
  borderRadius: '5px',
  color: '#333',
  fontSize: '1rem',
  margin: '5px',
  padding: '8px 15px',
};

const footerStyles = {
  display: 'flex',
  width: '100%',
  display: 'border-box',
  backgroundColor: 'lightblue',
};

const inputStyles = {
  flexGrow: 1,
  fontSize: '1rem',
  padding: '6px 6px',
};

const buttonStyles = {
  fontSize: '1rem',
  padding: '6px 6px',
};

export default App;
