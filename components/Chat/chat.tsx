"use client";

import { useState, FormEvent } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { chatMessages } from "@/lib/chat-message-data";

export default function Chat() {
  const [title, setTitle] = useState("Stonks Chat 2.0");
  const [description, setDescription] = useState(
    "only for the best of the best"
  );
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");
  const [showCommands, setShowCommands] = useState(false);

  const currentUser = "User1"; // fake dummy user
  const validCommands = ["/mute", "/ban", "/title", "/description"];

  // Handle message input
  function handleChange(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = evt.target.value;
    setInput(value);

    if (value.startsWith("/")) {
      setShowCommands(true);
    }
  }

  // Handle commands
  function handleCommand(command: string) {
    const cmd = command.split(" ")[0];
    console.log("cmd", cmd);
    const arg = command.split(" ").slice(1).join(" ");
    console.log("arg", arg);

    // fail fast if not valid command or no argument given for command
    if (!validCommands.includes(cmd)) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          user: "Chat Bot",
          message: `${command} is not a valid command.`,
        },
      ]);
      return;
    } else if (!arg) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          user: "Chat Bot",
          message: `Please provide more context in order to perform that command.`,
        },
      ]);
      return;
    }

    if (cmd === "/mute") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "Chat Bot", message: `User @${arg} muted` },
      ]);
    } else if (cmd === "/ban") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "Chat Bot", message: `User @${arg} banned` },
      ]);
    } else if (cmd === "/title") {
      setTitle(arg);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "Chat Bot", message: `Title set to "${arg}"` },
      ]);
    } else if (cmd === "/description") {
      setDescription(arg);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "Chat Bot", message: `Description set to "${arg}"` },
      ]);
    }
  }

  // Handle message send
  function handleSend(evt: FormEvent) {
    evt.preventDefault();
    if (!input.trim()) return;

    // Add the new message to the chat or send command message
    if (input.startsWith("/")) {
      handleCommand(input);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: currentUser, message: input },
      ]);
    }

    setInput("");
    setShowCommands(false);
  }

  return (
    <div className="p-4 bg-white border rounded shadow-md">
      <div className="pt-4 pb-2 text-center">
        <h3 className="title text-3xl">{title}</h3>
        <h6 className="description text-lg">{description}</h6>
      </div>
      <ScrollArea className="h-screen">
        <div className="p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 m-4 rounded ${
                msg.message.includes(`@${currentUser}`)
                  ? "bg-blue-100 self-end"
                  : "bg-gray-100 self-start"
              }`}
            >
              <span className="font-bold">{msg.user}: </span>
              {msg.message}
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <div className="text-input ml-4">
        <form onSubmit={handleSend} className="flex items-center mt-4 mb-8">
          <Textarea
            value={input}
            onChange={handleChange}
            placeholder="Send a message."
            className="flex-grow p-2 border rounded-l"
          />
          <button
            type="submit"
            className="p-2 m-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </form>
        {/* Insert command component here if showCommands is set to true, if not hide */}
      </div>
    </div>
  );
}
