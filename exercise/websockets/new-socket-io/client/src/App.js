import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [state, setState] = useState({message: '', name: ''});
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState('General');
  const [rooms] = useState(['General', 'Dylan Regan Waiting Room', 'Patrick Hill TA Waiting Room'])

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('/');
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current.on('receive-message', ({name, message}) => {
      console.log('The server has sent some data to all clients');
      console.log(`message was from ${name}, ${message}`)
      setChat([...chat, {name, message}]);
    })
    socketRef.current.on('joined-room', function (data) {
      const { name, newRoom } = data;
      setChat([
        ...chat,
        {name: 'ChatBot', message: `${name} has joined ${newRoom}`},
      ]);
    });
  }, [chat, room]);

  // user joins General chat room by default
  const userjoin = (name) => {
    const previousRoom = room;
    const newRoom = room;
    socketRef.current.emit('join-room', {name, previousRoom, newRoom});
  };

  // event handler to manage change between chat rooms
  const onRoomChange = (e) => {
    setRoom(e.target.value);
    const { name } = state;
    const previousRoom = room;
    const newRoom = e.target.value;
    socketRef.current.emit('join-room', {name, previousRoom, newRoom});
    setChat([]);
  }

  const onMessageSubmit = (e) => {
    let msgEle = document.getElementById('message');
    console.log([msgEle.name], msgEle.value);
    setState({...state, [msgEle.name]: msgEle.value});
    socketRef.current.emit('message', {
      name: state.name,
      message: msgEle.value,
      room: room
    });
    e.preventDefault();
    setState({message: '', name: state.name});
    msgEle.value = '';
    msgEle.focus();
  };


  const renderChat = () => {
    return chat.map(({name, message}, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div>
      {state.name && (
        <div className='card'>
          <select id="room-selector" onChange={onRoomChange}>
            {rooms.map((room) => {
                return (
                    <option key={room} value={room}>{room}</option>
                )
            })}
        </select>
          <div className='render-chat'>
            <h1>{room}</h1>
            {renderChat()}
          </div>
          <form onSubmit={onMessageSubmit}>
            <h1>Messenger</h1>
            <div>
              <input
                name='message'
                id='message'
                variant='outlined'
                label='Message'
              />
            </div>
            <button>Send Message</button>
          </form>
        </div>
      )}

      {!state.name && (
        <form
          className='form'
          onSubmit={(e) => {
            console.log(document.getElementById('username_input').value);
            e.preventDefault();
            setState({name: document.getElementById('username_input').value});
            userjoin(document.getElementById('username_input').value);
            // userName.value = '';
          }}
        >
          <div className='form-group'>
            <label>
              User Name:
              <br />
              <input id='username_input' />
            </label>
          </div>
          <br />

          <br />
          <br />
          <button type='submit'> Click to join</button>
        </form>
      )}
    </div>
  );
}

export default App;
