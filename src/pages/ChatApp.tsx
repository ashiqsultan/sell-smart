import { useEffect, useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import * as messageAPI from '../api/messages';
import { IMessageDoc } from '../api/messages';
import { getInfo } from '../api/account';

const ChatApp = () => {
  const [messages, setMessages] = useState<IMessageDoc[] | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { chatId } = useParams();
  const [currentUserId, setCurrentUserId] = useState('');
  const handleSend = async () => {
    console.log('Sending message:', newMessage);
    if (chatId) {
      await messageAPI.create(chatId, newMessage);
      setNewMessage('');
      // TEMP
      // Get updated msg array
      const newMessagesArr = await messageAPI.getByChatId(chatId);
      setMessages(newMessagesArr);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const newMsgs = await messageAPI.getByChatId(chatId);
        setMessages(newMsgs);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUserInfo = async () => {
      try {
        const currentUser = await getInfo();
        setCurrentUserId(currentUser.$id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
    fetchUserInfo();
  }, []);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-end'}
      height={'calc(100vh - 100px)'}
    >
      {/* Messages */}
      {Array.isArray(messages) && messages.length > 0
        ? messages.map((message, index) => (
            <Grid
              key={index}
              container
              justifyContent={
                message.sender_id === currentUserId ? 'flex-end' : 'flex-start'
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
                    marginLeft:
                      message.sender_id === currentUserId ? '10px' : '0',
                    marginRight:
                      message.sender_id !== currentUserId ? '10px' : '0',
                  }}
                >
                  {message.content}
                </div>
              </Grid>
            </Grid>
          ))
        : null}
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
