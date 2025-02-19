import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import io from "socket.io-client";
import { setIsDiscussionPanelOpenFalse } from "../../redux/Slices/isDiscussionPanelOpenSlice";

let socket;
let selectedChatCompare;

const MsgPanel = () => {
    const ENDPOINT = import.meta.env.VITE_BASE_URL;
    const book = JSON.parse(localStorage.getItem("selectedBook"));
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const discussionPanelRef = useRef(null);
    const isDiscussionPanelOpen = useSelector((state) => state.isDiscussionPanelOpen.isDiscussionPanelOpen);
    
    const [newMsg, setNewMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatId, setChatId] = useState("");
    const messagesEndRef = useRef(null);
    const formRef = useRef(null);
    const [socketConnected, setSocketConnected] = useState(false);

    // Socket.IO Connection
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        
        socket.on("connect", () => {
            setSocketConnected(true);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, []);

    // Message Received Listener
    useEffect(() => {
        const handleMessageReceived = (newMessage) => {
            if (!selectedChatCompare || selectedChatCompare !== chatId) return;
            setMessages((prev) => [...prev, newMessage]);
        };

        socket.on("message received", handleMessageReceived);
        return () => socket.off("message received", handleMessageReceived);
    }, [chatId]);

    // Fetch Chat ID
    useEffect(() => {
        const fetchChat = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/chats/fetchChats`,
                    { chatTitle: book?.title },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.data[0]?._id) {
                    setChatId(response.data[0]._id);
                    socket.emit("join chat", response.data[0]._id);
                    selectedChatCompare = response.data[0]._id;
                }
            } catch (error) {
                console.error("Error fetching chat:", error);
            } finally {
                setLoading(false);
            }
        };

        if (book?.title) fetchChat();
    }, [book?.title]);

    // Fetch Messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/messages/get`,
                    { chatId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.data.messages) {
                    setMessages(response.data.messages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };

        if (chatId) fetchMessages();
    }, [chatId]);

    // Scroll handling
    useEffect(() => {
        const handleResize = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Input focus handler
    useEffect(() => {
        const input = formRef.current?.querySelector("input");
        const handleFocus = () => {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 300);
        };

        input?.addEventListener("focus", handleFocus);
        return () => input?.removeEventListener("focus", handleFocus);
    }, []);

    // Animation
    useLayoutEffect(() => {
        if (discussionPanelRef.current) {
            gsap.to(discussionPanelRef.current, {
                x: isDiscussionPanelOpen ? "0%" : "100%",
                duration: 0.5,
                ease: "power2.inOut",
            });
        }
    }, [isDiscussionPanelOpen]);

    // Send Message
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMsg.trim()) return;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/messages/send`,
                {
                    chatId: chatId,
                    content: newMsg,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.message) {
                setMessages((prev) => [...prev, response.data.message]);
                socket.emit("new message", response.data.message);
                setNewMsg("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div
            ref={discussionPanelRef}
            className="fixed sm:rounded-l-xl top-0 right-0 h-screen w-full max-w-xl bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] shadow-2xl z-[9999] transition-all duration-300 ease-in-out"
        >
            <div className="h-screen flex flex-col w-full p-4">
                <div className="w-full flex justify-between items-center mb-4 px-2">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-400">
                        {book?.title}
                    </h2>
                    <button
                        onClick={() => dispatch(setIsDiscussionPanelOpenFalse())}
                        className="p-2 text-cyan-300 hover:text-cyan-100 bg-[#0E1D2C] rounded-full px-2 py-1 transition-colors duration-300"
                        aria-label="Close chat"
                    >
                        <i className="ri-close-line text-xl cursor-pointer"></i>
                    </button>
                </div>

                <div className="flex-1 w-full rounded-xl bg-[#0d1b2a]/80 backdrop-blur-sm p-4 overflow-y-auto scrollbar-hide scroll-track-transparent pb-24">
                    {loading ? (
                        <div className="h-full flex justify-center items-center">
                            <div className="animate-pulse flex flex-col items-center space-y-4">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/20 animate-bounce"></div>
                                <span className="text-cyan-200 font-medium">Loading messages...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4 min-h-full justify-end">
                            {messages.map((msg, index) => {
                                const isUserMessage = msg.sender._id === user._id;
                                const profileImage = msg.sender.coverImage 
                                    ? msg.sender.coverImage 
                                    : isUserMessage 
                                        ? user.coverImage 
                                        : "/default-profile.png";

                                return (
                                    <div
                                        key={index}
                                        className={`flex flex-col ${isUserMessage ? 'items-end' : 'items-start'}`}
                                    >
                                        <div className={`flex items-center space-x-2 mb-1 ${isUserMessage ? 'flex-row-reverse' : ''}`}>
                                            <span className="text-sm text-cyan-300/80 mr-2 ml-2 font-medium">
                                                {msg.sender.fullname.firstname}
                                            </span>
                                        </div>
                                        <div
                                            className={`p-3 rounded-2xl max-w-[85%] break-words transition-all duration-200 ${
                                                isUserMessage 
                                                    ? 'bg-gradient-to-br from-cyan-600 to-cyan-700 text-white rounded-br-none'
                                                    : 'bg-gradient-to-br from-slate-700 to-slate-800 text-cyan-50 rounded-bl-none'
                                            }`}
                                        >
                                            <p className="leading-relaxed">{msg.content}</p>
                                            <span className="block text-xs mt-2 opacity-70 text-right">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                <form
                    ref={formRef}
                    onSubmit={sendMessage}
                    className="sticky bottom-4 w-full mt-4 bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 shadow-lg"
                >
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Type your thoughts here..."
                            value={newMsg}
                            onChange={(e) => setNewMsg(e.target.value)}
                            className="flex-1 bg-transparent text-cyan-50 placeholder-cyan-200/50 focus:outline-none px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-cyan-500/50"
                        />
                        <button
                            type="submit"
                            className="p-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                            aria-label="Send message"
                        >
                            <i className="ri-send-plane-2-fill text-xl"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MsgPanel;