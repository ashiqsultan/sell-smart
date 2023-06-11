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

  const fetchMessages = useCallback(async () => {
    try {
      const newMsgs = await messageAPI.getByChatId(chatId);
      setMessages(newMsgs);
    } catch (error) {
      console.error(error);
    }
  }, [chatId]);
  const updateMessagesArray = useCallback(
    async (id) => {
      try {
        const newMsg = await messageAPI.getById(id);
        setMessages((messages) => [...messages, newMsg]);
      } catch (error) {
        console.error(error);
      }
    },
    [chatId]
  );
  const handleSend = async () => {
    if (chatId) {
      await messageAPI.create(chatId, newMessage);
      setNewMessage('');
    }
  };
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleSend();
    }
  };

  const chatIdSub = useCallback(() => {
    subscription = client().subscribe([channel], (response: any) => {
      if (response?.payload?.last_message_id) {
        const msgId = response?.payload?.last_message_id;
        updateMessagesArray(msgId);
      }
    });
  }, [channel]);

  useEffect(() => {
    chatIdSub();
  }, [channel]);

  useEffect(() => {
    if (chatId) {
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
            <Box
              key={index}
              display={'flex'}
              justifyContent={
                message.sender_id === currentUserId ? 'flex-end' : 'flex-start'
              }
              alignItems='center'
            >
              <div
                className={`speech-bubble ${
                  message.sender_id === currentUserId ? 'right' : 'left'
                }`}
              >
                {message.content}
              </div>
            </Box>
          ))
        ) : (
          <div>
            <Typography>No messages</Typography>
          </div>
        )}
      </Box>

      {/* Input field and send button */}
      <Box
        display={'flex'}
        justifyContent={'space-evenly'}
        columnGap={'1rem'}
        padding={1}
      >
        <TextField
          sx={{ border: '', borderRadius: '12px' }}
          fullWidth
          placeholder='Type a message'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          variant='contained'
          endIcon={<SendIcon />}
          onClick={handleSend}
          sx={{ borderRadius: '12px' }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatApp;
