
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, Copy, Book } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeSpell {
  id: string;
  title: string;
  code: string;
  language: string;
  timestamp: number;
}

interface CodeSpellbookProps {
  spells: CodeSpell[];
  onDelete: (id: string) => void;
}

const CodeSpellbook: React.FC<CodeSpellbookProps> = ({ spells, onDelete }) => {
  const [activeSpell, setActiveSpell] = useState<string | null>(spells.length > 0 ? spells[0].id : null);
  const [copying, setCopying] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopying(id);
    setTimeout(() => setCopying(null), 1500);
  };

  const getSpellIcon = (language: string) => {
    switch (language) {
      case 'javascript':
        return '⚡';
      case 'typescript':
        return '🔷';
      case 'python':
        return '🐍';
      case 'java':
        return '☕';
      case 'csharp':
        return '🔧';
      case 'cpp':
        return '⚙️';
      case 'ruby':
        return '💎';
      case 'go':
        return '🔵';
      case 'rust':
        return '🦀';
      case 'php':
        return '🐘';
      case 'html':
        return '🌐';
      case 'css':
        return '🎨';
      case 'sql':
        return '🗄️';
      default:
        return '📜';
    }
  };

  if (spells.length === 0) {
    return (
      <Card className="border border-magic-primary/30 bg-magic-dark/70 backdrop-blur-sm text-magic-light shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-magic-primary" />
            <span>Spellbook</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-16 text-magic-light/70 italic">
          Your magical spellbook is empty. Harvest some code spells to store them here.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-magic-primary/30 bg-magic-dark/70 backdrop-blur-sm text-magic-light shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5 text-magic-primary" />
          <span>Spellbook</span>
          <span className="text-sm font-normal text-magic-light/60 ml-auto">
            {spells.length} {spells.length === 1 ? 'spell' : 'spells'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-[500px]">
          <div className="border-r border-magic-primary/20 bg-black/20">
            <ScrollArea className="h-[500px]">
              {spells.map((spell) => (
                <div
                  key={spell.id}
                  className={cn(
                    "p-3 cursor-pointer border-b border-magic-primary/20 transition-colors hover:bg-magic-primary/10",
                    activeSpell === spell.id && "bg-magic-primary/20"
                  )}
                  onClick={() => setActiveSpell(spell.id)}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{getSpellIcon(spell.language)}</span>
                    <div className="flex-1 overflow-hidden">
                      <h3 className="font-medium truncate">{spell.title}</h3>
                      <p className="text-xs text-magic-light/60">
                        {new Date(spell.timestamp).toLocaleDateString()} · {spell.language}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          
          <div className="col-span-1 md:col-span-2 flex flex-col">
            {activeSpell && (
              <>
                {(() => {
                  const spell = spells.find(s => s.id === activeSpell);
                  if (!spell) return null;
                  
                  return (
                    <>
                      <div className="p-3 border-b border-magic-primary/20 bg-black/40 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{spell.title}</h3>
                          <p className="text-xs text-magic-light/60">{spell.language}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-magic-light/70 hover:text-magic-light hover:bg-magic-primary/20"
                            onClick={() => copyToClipboard(spell.code, spell.id)}
                          >
                            <Copy className="h-4 w-4" />
                            {copying === spell.id && (
                              <span className="absolute -top-8 right-0 text-xs bg-magic-primary px-2 py-1 rounded">
                                Copied!
                              </span>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400/70 hover:text-red-400 hover:bg-red-400/10"
                            onClick={() => onDelete(spell.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <ScrollArea className="flex-1 bg-black/40">
                        <SyntaxHighlighter
                          language={spell.language}
                          style={vscDarkPlus}
                          customStyle={{
                            margin: 0,
                            padding: '1rem',
                            height: '100%',
                            backgroundColor: 'transparent',
                          }}
                          showLineNumbers
                        >
                          {spell.code}
                        </SyntaxHighlighter>
                      </ScrollArea>
                    </>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeSpellbook;
