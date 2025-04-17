
// Define the CodeSpell type
export interface CodeSpell {
  id: string;
  title: string;
  code: string;
  language: string;
  createdAt: Date | string;
  tags?: string[];
  description?: string;
}
