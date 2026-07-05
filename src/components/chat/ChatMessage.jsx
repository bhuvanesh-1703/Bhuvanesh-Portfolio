import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";
import { Sparkles } from "lucide-react";

export default function ChatMessage({ message }) {
  const isAI = message.role === "ai";
  const isError = message.role === "error";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex gap-3 max-w-[90%] ${isAI || isError ? "self-start" : "self-end flex-row-reverse"}`}
    >
      {(isAI || isError) && (
        <div
          className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-1 ${isError ? "bg-red-500/20 text-red-500" : "bg-[#e07a5f]/20 text-[#e07a5f]"}`}
        >
          <Sparkles size={12} />
        </div>
      )}

      <div
        className={`group relative p-3 sm:p-4 rounded-xl text-sm leading-relaxed ${
          isAI
            ? "bg-bg-secondary border border-border-subtle text-text-primary rounded-tl-none"
            : isError
              ? "bg-red-500/10 border border-red-500/30 text-red-400 rounded-tl-none"
              : "bg-[#e07a5f]/10 border border-[#e07a5f]/30 text-text-primary rounded-tr-none"
        }`}
      >
        {isAI ? (
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}

        {isAI && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-primary border border-border-subtle rounded-md text-text-tertiary hover:text-text-primary"
            title="Copy response"
          >
            {copied ? (
              <Check size={14} className="text-[#14b8a6]" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
