
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MagicParticles from '../components/MagicParticles';
import CodeEditor from '../components/CodeEditor';
import CodeSpellbook from '../components/CodeSpellbook';
import MagicSparkles from '../components/MagicSparkles';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import CommandPalette from '../components/CommandPalette';
import { CodeSpell } from '@/types/types';
import { Command } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [spells, setSpells] = useState<CodeSpell[]>(() => {
    const saved = localStorage.getItem('codeSpells');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  
  // Save spells to localStorage when they change
  useEffect(() => {
    localStorage.setItem('codeSpells', JSON.stringify(spells));
  }, [spells]);
  
  const handleCodeHarvest = (code: string, language: string, title: string) => {
    const newSpell: CodeSpell = {
      id: uuidv4(),
      title,
      code,
      language,
      timestamp: Date.now(),
    };
    
    setSpells(prev => [newSpell, ...prev]);
    
    toast({
      title: "Code Spell Harvested!",
      description: `Your "${title}" spell has been added to your magical spellbook.`,
    });
  };
  
  const handleDeleteSpell = (id: string) => {
    setSpells(prev => prev.filter(spell => spell.id !== id));
    
    toast({
      title: "Spell Removed",
      description: "The spell has been removed from your spellbook.",
      variant: "destructive",
    });
  };

  const handleOpenCommandPalette = () => {
    setIsCommandPaletteOpen(true);
  };
  
  const handleHarvestFromCommand = () => {
    // เราไม่สามารถเรียกใช้งานจริงจาก command palette ได้ทันที
    // แต่สามารถแสดงข้อความบอกผู้ใช้ได้
    toast({
      title: "Code Editor Ready",
      description: "You can now harvest your code in the editor below.",
    });
    
    // เลื่อนไปที่ editor
    document.querySelector('.editor-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-magic-dark to-black text-white relative overflow-hidden">
      <MagicParticles />
      
      {/* Header */}
      <header className="container mx-auto py-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <MagicSparkles>
            <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-magic-primary to-magic-light">
              Source Code Harvesting
            </h1>
          </MagicSparkles>
          
          <button
            onClick={handleOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-magic-secondary/20 hover:bg-magic-secondary/30 text-magic-light/80 transition-colors"
            title="เปิด Command Palette (Ctrl+K)"
          >
            <Command className="h-4 w-4" />
            <span className="hidden md:inline">Command</span>
            <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-magic-light/20 bg-magic-secondary/30 px-1.5 font-mono text-[10px] font-medium text-magic-light/70">
              Ctrl K
            </kbd>
          </button>
        </div>
        
        <p className="text-center text-magic-light/70 max-w-2xl mx-auto">
          Collect and organize magical code spells in your enchanted spellbook. Cast them whenever you need to conjure digital wonders.
        </p>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Editor */}
          <div className="w-full editor-section">
            <CodeEditor onCodeHarvest={handleCodeHarvest} />
          </div>
          
          {/* Spellbook */}
          <div className="w-full">
            <CodeSpellbook spells={spells} onDelete={handleDeleteSpell} />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="container mx-auto py-6 text-center text-magic-light/50 text-sm relative z-10">
        <p>Powered by magical coding incantations. Harvest responsibly.</p>
      </footer>

      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        setIsOpen={setIsCommandPaletteOpen}
        spells={spells}
        onDeleteSpell={handleDeleteSpell}
        onHarvestCode={handleHarvestFromCommand}
      />
    </div>
  );
};

export default Index;
