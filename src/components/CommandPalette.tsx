
import React, { useEffect, useState } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Book, Code, FileCode, Magic, Plus, Settings, Sparkles, Trash2 } from "lucide-react";
import { CodeSpell } from "@/types/types"; // We'll create this type file

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  spells: CodeSpell[];
  onDeleteSpell: (id: string) => void;
  onHarvestCode: () => void;
}

const CommandPalette = ({ isOpen, setIsOpen, spells, onDeleteSpell, onHarvestCode }: CommandPaletteProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Handle keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      
      // Close on escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);
  
  // Filter spells based on search query
  const filteredSpells = spells.filter(spell => 
    spell.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spell.language.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 gap-0 max-w-2xl bg-gradient-to-br from-[#1A1F2C]/90 to-black/90 backdrop-blur-lg border border-magic-light/10 text-white">
        <Command 
          className="bg-transparent"
          filter={(value, search) => {
            // Enhanced natural language matching
            if (value.toLowerCase().includes(search.toLowerCase())) return 1;
            if (value.split(' ').some(word => word.toLowerCase().startsWith(search.toLowerCase()))) return 0.5;
            return 0;
          }}
        >
          <CommandInput 
            placeholder="คุณต้องการทำอะไร? ค้นหาหรือเรียกใช้คำสั่ง..." 
            className="h-14 text-magic-light focus:ring-1 focus:ring-magic-primary/50 border-none"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="py-2 px-1 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-magic-secondary/20 scrollbar-track-transparent">
            <CommandEmpty className="py-6 text-magic-light/60 flex flex-col items-center">
              <Sparkles className="h-10 w-10 mb-2 text-magic-primary/50" />
              <p>ไม่พบคำสั่งหรือ code spell ที่ตรงกับคำค้นหา</p>
            </CommandEmpty>
            
            <CommandGroup heading="คำสั่งทั่วไป" className="text-magic-light/70">
              <CommandItem 
                onSelect={() => {
                  onHarvestCode();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 py-3 cursor-pointer hover:bg-magic-primary/10"
              >
                <Magic className="h-5 w-5 text-magic-primary" />
                <span>บันทึกโค้ดใหม่</span>
              </CommandItem>
              
              <CommandItem 
                onSelect={() => { /* Implement settings later */ }}
                className="flex items-center gap-2 py-3 cursor-pointer hover:bg-magic-primary/10"
              >
                <Settings className="h-5 w-5 text-magic-light/70" />
                <span>ตั้งค่า</span>
              </CommandItem>
            </CommandGroup>
            
            {filteredSpells.length > 0 && (
              <CommandGroup heading="Code Spells ของคุณ" className="text-magic-light/70">
                {filteredSpells.map(spell => (
                  <CommandItem 
                    key={spell.id}
                    onSelect={() => {
                      // Later: Implement viewing a spell
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between group py-3 cursor-pointer hover:bg-magic-primary/10"
                  >
                    <div className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-magic-primary" />
                      <span>{spell.title}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-magic-secondary/20 text-magic-light/60">
                        {spell.language}
                      </span>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSpell(spell.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-magic-light/40 hover:text-magic-light/80"
                      aria-label="ลบ code spell"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            <CommandGroup heading="เคล็ดวิชา" className="text-magic-light/70">
              <CommandItem 
                onSelect={() => { /* Implement tips */ }}
                className="flex items-center gap-2 py-3 cursor-pointer hover:bg-magic-primary/10"
              >
                <Sparkles className="h-5 w-5 text-yellow-400" />
                <span>วิธีเขียน Code Spell ที่มีประสิทธิภาพ</span>
              </CommandItem>
              
              <CommandItem 
                onSelect={() => { /* Implement docs */ }}
                className="flex items-center gap-2 py-3 cursor-pointer hover:bg-magic-primary/10"
              >
                <Book className="h-5 w-5 text-magic-light/70" />
                <span>เอกสารอ้างอิง</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;
