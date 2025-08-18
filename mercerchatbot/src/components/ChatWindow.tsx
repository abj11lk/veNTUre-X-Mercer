import React, { useState, useRef, useEffect, FC } from "react";
import ReactMarkdown from "react-markdown";
import MessageInput from "./MessageInput";

type Message = {
  role: "human" | "AI";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (msg: string) => {
    setMessages((prev: Message[]) => [
      ...prev,
      { role: "human", content: msg },
    ]);
    setLoading(true);

    setTimeout(() => {
      setMessages((current: Message[]) => [
        ...current,
        {
          role: "AI",
          content:
            "This is a sample response. (Integrate with your backend to get real answers!)",
        },
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <main className="flex-1 flex flex-col h-full bg-white">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-gray-400 text-lg text-center px-2">
          Welcome to MercerChat! <br />
          Send a message or upload a PDF to get started.
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto w-full max-w-2xl mx-auto flex flex-col gap-3 py-2 px-3"
        >
          {messages.map((msg: Message, idx: number) =>
            msg.role === "human" ? (
              <div
                key={idx}
                className={`self-end bg-blue-100 text-blue-900 px-4 py-2 rounded-xl max-w-[80%] ${
                  idx === 0 ? "mt-2" : "my-1"
                }`}
              >
                {msg.content}
              </div>
            ) : (
              <div
                key={idx}
                className={`self-start text-gray-900 max-w-[80%] px-1 ${
                  idx === 0 ? "mt-2" : "my-1"
                }`}
                style={{ background: "none", borderRadius: 0 }}
              >
                <ReactMarkdown
                  components={{
                    code: (({
                      node,
                      inline,
                      className,
                      children,
                      ...props
                    }) => {
                      if (!inline) {
                        return (
                          <pre className="bg-gray-900 text-white p-2 rounded overflow-x-auto my-2">
                            <code {...props}>{children}</code>
                          </pre>
                        );
                      }
                      return (
                        <code className="bg-gray-200 p-1 rounded" {...props}>
                          {children}
                        </code>
                      );
                    }) as React.FC<any>,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            )
          )}
        </div>
      )}
      <MessageInput onSend={handleSend} disabled={loading} />
    </main>
  );
}
