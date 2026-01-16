
import { create } from 'zustand';

export interface DocumentItem {
  id: string;
  name: string;
  size: string;
  uri: string;
  type: string;
  timestamp: number;
}

interface DocumentsState {
  documents: DocumentItem[];
  addDocument: (doc: DocumentItem) => void;
  removeDocument: (id: string) => void;
}

export const useDocumentsStore = create<DocumentsState>((set) => ({
  documents: [
    { id: '1', name: 'Medical Document.pdf', size: '200 KB', uri: '', type: 'application/pdf', timestamp: Date.now() },
    { id: '2', name: 'Driving Licence.pdf', size: '720 KB', uri: '', type: 'application/pdf', timestamp: Date.now() },
    { id: '3', name: 'Work Permit.pdf', size: '16 MB', uri: '', type: 'application/pdf', timestamp: Date.now() },
  ],
  addDocument: (doc) => set((state) => ({ documents: [doc, ...state.documents] })),
  removeDocument: (id) => set((state) => ({ 
    documents: state.documents.filter((d) => d.id !== id) 
  })),
}));
