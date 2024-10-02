"use client";
import socket from "@/socket/socket";
import { Terminal as XTerminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { Terminal } from "lucide-react";
import React, { useEffect, useRef } from "react";

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<XTerminal | null>(null);

  useEffect(() => {
    if (termRef.current || !terminalRef.current) return;

    const term = new XTerminal({
      cursorBlink: true,
      rows: 30,
      cols: 120,
      theme: {
        background: "#1a1a1a",
        foreground: "#d1d5db",
      },
    });

    term.open(terminalRef.current);

    term.onData((data) => {
      socket.emit("terminal:write", data);
    });

    term.write("$ Press 'Enter' to get started...");

    socket.on("terminal:data", (data: string) => {
      term.write(data);
    });

    termRef.current = term;

    return () => {
      term.dispose();
      termRef.current = null;
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      id='terminal'
      className='h-[25%] w-full bg-[#1a1a1a] text-gray-400 absolute bottom-0 left-0 right-0 p-2 overflow-auto border-t border-[#393939]'
    >
      <div className='flex items-center mb-2'>
        <Terminal size={14} className='mr-2' />
        <span>Terminal</span>
      </div>
    </div>
  );
};

export default TerminalComponent;
