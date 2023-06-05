import { useCallback, useEffect, useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import * as messageAPI from '../api/messages';
import { IMessageDoc } from '../api/messages';
import { getInfo } from '../api/account';
import client from '../api/client';
import config from '../config';

const databaseId = config.database_id;
const collectionId = config.collectionIds.chats;
let subscription: any;

const ChatApp = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<IMessageDoc[] | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [channel, setChannel] = useState('');
  const handleSend = async () => {
    if (chatId) {
      await messageAPI.create(chatId, newMessage);
      setNewMessage('');
      // TEMP
      // Get updated msg array
      const newMessagesArr = await messageAPI.getByChatId(chatId);
      setMessages(newMessagesArr);
    }
  };
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleSend();
    }
  };

  const chatIdSub = useCallback(() => {
    subscription = client().subscribe([channel], (response) => {
      console.log(response);
    });
  }, [channel]);

  useEffect(() => {
    chatIdSub();
  }, [channel]);

  useEffect(() => {
    if (chatId) {
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
      setChannel(
        `databases.${databaseId}.collections.${collectionId}.documents.${chatId}`
      );
    }
    return () => {
      if (subscription) {
        subscription();
      }
    };
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='flex-end'
      height='calc(100vh - 100px)'
    >
      {/* Messages */}
      <Box overflow='auto'>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => (
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
        ) : (
          <div>
            <Typography>No messages</Typography>
          </div>
        )}
      </Box>

      {/* Input field and send button */}
      <Grid container alignItems='center'>
        <Grid item xs={10}>
          <TextField
            fullWidth
            placeholder='Type a message'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
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
