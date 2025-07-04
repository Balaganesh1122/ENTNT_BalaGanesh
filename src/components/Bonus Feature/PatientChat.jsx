import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video,
  MoreVertical,
  Clock,
  CheckCircle2,
  User,
  Stethoscope
} from 'lucide-react';

export default function PatientChat() {
  const { user } = useAuth();
  const { patients } = useData();
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: 'doctor',
      senderName: 'Dr. Sarah Johnson',
      message: 'Hello! How are you feeling after your last treatment?',
      timestamp: new Date(Date.now() - 3600000),
      read: true
    },
    {
      id: 2,
      senderId: user?.patientId || 'p1',
      senderName: user?.name || 'John Doe',
      message: 'Much better, thank you! The pain has completely gone away.',
      timestamp: new Date(Date.now() - 3000000),
      read: true
    },
    {
      id: 3,
      senderId: 'doctor',
      senderName: 'Dr. Sarah Johnson',
      message: 'That\'s wonderful to hear! Remember to continue with the prescribed medication and avoid hard foods for another week.',
      timestamp: new Date(Date.now() - 2400000),
      read: true
    },
    {
      id: 4,
      senderId: user?.patientId || 'p1',
      senderName: user?.name || 'John Doe',
      message: 'Will do! When should I schedule my next appointment?',
      timestamp: new Date(Date.now() - 1800000),
      read: true
    },
    {
      id: 5,
      senderId: 'doctor',
      senderName: 'Dr. Sarah Johnson',
      message: 'Let\'s schedule a follow-up in 2 weeks. I\'ll have my assistant contact you with available times.',
      timestamp: new Date(Date.now() - 900000),
      read: false
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      senderId: user?.patientId || 'p1',
      senderName: user?.name || 'John Doe',
      message: newMessage,
      timestamp: new Date(),
      read: false
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate doctor typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const doctorResponse = {
        id: messages.length + 2,
        senderId: 'doctor',
        senderName: 'Dr. Sarah Johnson',
        message: 'Thank you for your message. I\'ll review this and get back to you shortly.',
        timestamp: new Date(),
        read: false
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 2000);
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Dr. Sarah Johnson</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Video className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isDoctor = message.senderId === 'doctor';
          const isCurrentUser = message.senderId === user?.patientId;

          return (
            <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 max-w-xs lg:max-w-md ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isDoctor 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-br from-green-500 to-green-600'
                }`}>
                  {isDoctor ? (
                    <Stethoscope className="h-4 w-4 text-white" />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-2 ${
                  isCurrentUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  <div className={`flex items-center gap-1 mt-1 ${
                    isCurrentUser ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className={`text-xs ${
                      isCurrentUser ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                    {isCurrentUser && (
                      <CheckCircle2 className={`h-3 w-3 ${
                        message.read ? 'text-blue-200' : 'text-blue-300'
                      }`} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2 max-w-xs lg:max-w-md">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white text-gray-900 border border-gray-200 rounded-2xl px-4 py-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Paperclip className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Smile className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}