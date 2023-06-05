import { useEffect, useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';

// Mock data for messages
const messages = [
  { chat_id: '1', sender_id: 'user1', content: 'Hello' },
  { chat_id: '1', sender_id: 'user2', content: 'Hi' },
  { chat_id: '1', sender_id: 'user1', content: 'How are you?' },
  { chat_id: '1', sender_id: 'user2', content: 'I am fine, thank you.' },
];

// Utility function to get current user's ID
const getInfo = () => {
  return { $id: 'user1' }; // Replace 'user1' with actual user ID retrieval logic
};

const ChatApp = () => {
  const [newMessage, setNewMessage] = useState('');
  const { chatId } = useParams();

  const handleSend = () => {
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  useEffect(() => {
    console.log({ chatId });
  }, []);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-end'}
      height={'calc(100vh - 100px)'}
    >
      {/* Messages */}
      {messages.map((message, index) => (
        <Grid
          key={index}
          container
          justifyContent={
            message.sender_id === getInfo().$id ? 'flex-end' : 'flex-start'
          }
          alignItems='center'
        >
          <Grid item xs={6}>
            <div
              style={{
                background: '#f0f0f0',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '10px',
                marginLeft: message.sender_id === getInfo().$id ? '10px' : '0',
                marginRight: message.sender_id !== getInfo().$id ? '10px' : '0',
              }}
            >
              {message.content}
            </div>
          </Grid>
        </Grid>
      ))}
      {/* Input field and send button */}
      <Grid container alignItems='center'>
        <Grid item xs={10}>
          <TextField
            fullWidth
            placeholder='Type a message'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant='contained'
            endIcon={<SendIcon />}
            onClick={handleSend}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatApp;
