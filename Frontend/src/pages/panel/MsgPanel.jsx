import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import { setIsDiscussionPanelOpenFalse } from "../../redux/Slices/isDiscussionPanelOpenSlice";

const MsgPanel = () => {
    const book = JSON.parse(localStorage.getItem("selectedBook"));
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const dispatch = useDispatch();
    const discussionPanelRef = useRef(null);
    const isDiscussionPanelOpen = useSelector((state) => state.isDiscussionPanelOpen.isDiscussionPanelOpen);

    const chatTitle = book?.title || "";
    const [newMsg, setNewMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatId, setChatId] = useState("");
    const messagesEndRef = useRef(null);

    useLayoutEffect(() => {
        if (discussionPanelRef.current) {
            gsap.to(discussionPanelRef.current, {
                x: isDiscussionPanelOpen ? "0%" : "100%",
                duration: 0.5,
                ease: "power2.inOut",
            });
        }
    }, [isDiscussionPanelOpen]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const fetchedChats = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/chats/fetchChats`,
                    { chatTitle },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200 && response.data.length > 0) {
                    setChatId(response.data[0]._id);
                }
            } catch (error) {
                console.error("Error fetching chats:", error);
            } finally {
                setLoading(false);
            }
        };

        if (chatTitle) fetchedChats();
    }, [chatTitle]);

    useEffect(() => {
        if (!chatId) return;

        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/messages/get`,
                    { chatId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setMessages(response.data.messages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [chatId]);

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

            if (response.status === 200) {
                setMessages([...messages, response.data.message]);
                setNewMsg("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div
            ref={discussionPanelRef}
            className="fixed top-0 right-0 rounded-l-xl h-screen w-full bg-[#112332] shadow-lg z-50"
        >
            <div className="h-screen flex flex-col justify-center items-center w-full rounded-xl">
                <p className="text-white text-xl font-semibold p-2 mr-auto ml-3">
                    {chatTitle}
                </p>

                <div className="h-[80%] w-[95%] rounded-xl bg-[#A9B8D9] p-4 overflow-y-auto scrollbar-hide">
                    {loading ? (
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="currentColor"
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..."
                                />
                            </svg>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full justify-end min-h-full">
                            {messages.map((msg, index) => {
                                const isUserMessage = msg.sender._id === user._id;

                                return (
                                    <div
                                        key={index}
                                        className={`text-[#A9B8D9] bg-[#112332] rounded mb-2 p-2 max-w-[60%] break-words flex flex-col ${
                                            isUserMessage ? "ml-auto" : "mr-auto"
                                        }`}
                                    >
                                        <div className={`flex ${isUserMessage ? "ml-auto" : "mr-auto"}`}>
                                            <p className="text-sm">{msg.sender.fullname.firstname}</p>
                                            <img
                                                src={`${msg.sender.coverImage || user.coverImage}`}
                                                className="rounded-full w-6 h-6 ml-2"
                                                alt=""
                                            />
                                        </div>
                                        <p className="font-bold">{msg.content}</p>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef}></div>
                        </div>
                    )}
                </div>

                <form
                    onSubmit={sendMessage}
                    className="h-[8%] mt-3 w-[95%] rounded-xl flex bg-white"
                >
                    <input
                        type="text"
                        placeholder="Write your thoughts here!"
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        className="h-full focus:outline-none w-full font-medium px-2 rounded-xl"
                    />
                    <button
                        type="submit"
                        className="p-3 text-2xl hover:text-[#A9B8D9] transition-all duration-300 cursor-pointer text-[#112332]"
                    >
                        <i className="ri-send-plane-fill"></i>
                    </button>
                </form>
            </div>

            <i
                onClick={() => dispatch(setIsDiscussionPanelOpenFalse())}
                className="ri-close-circle-fill absolute top-4 right-6 text-4xl transition-all duration-300 cursor-pointer hover:text-white text-[#A9B8D9]"
            ></i>
        </div>
    );
};

export default MsgPanel;