
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  onCodeHarvest: (code: string, language: string, title: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onCodeHarvest }) => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [title, setTitle] = useState<string>('');
  const [isHarvesting, setIsHarvesting] = useState<boolean>(false);
  
  const handleHarvest = () => {
    if (!code.trim() || !title.trim()) return;
    
    setIsHarvesting(true);
    setTimeout(() => {
      onCodeHarvest(code, language, title);
      setIsHarvesting(false);
      setCode('');
      setTitle('');
    }, 1500); // Animation delay for magical effect
  };

  return (
    <div className="bg-magic-dark p-6 rounded-lg shadow-xl border border-magic-primary/30 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-magic-light">Harvest New Code Spell</h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-magic-light mb-1">
          Spell Name
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-black/20 text-magic-light border border-magic-primary/30 rounded p-2 focus:ring-magic-primary focus:border-magic-primary"
          placeholder="Name your code spell..."
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="language" className="block text-sm font-medium text-magic-light mb-1">
          Spell Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-black/20 text-magic-light border border-magic-primary/30 rounded p-2 focus:ring-magic-primary focus:border-magic-primary"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="cpp">C++</option>
          <option value="ruby">Ruby</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="php">PHP</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="sql">SQL</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="code" className="block text-sm font-medium text-magic-light mb-1">
          Spell Incantation (Code)
        </label>
        <Textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-60 bg-black/40 text-magic-light font-mono border border-magic-primary/30 rounded p-2 focus:ring-magic-primary focus:border-magic-primary"
          placeholder="Enter your code here..."
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleHarvest}
          disabled={isHarvesting || !code.trim() || !title.trim()}
          className={cn(
            "bg-magic-primary hover:bg-magic-secondary text-white font-medium py-2 px-4 rounded transition-all",
            isHarvesting && "animate-pulse"
          )}
        >
          {isHarvesting ? "Harvesting Spell..." : "Harvest Code Spell"}
        </Button>
      </div>
      
      {code && (
        <div className="mt-4 border border-magic-primary/30 rounded overflow-hidden">
          <div className="bg-black/60 p-2 text-xs text-magic-light font-mono">Preview</div>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0',
              maxHeight: '300px',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
