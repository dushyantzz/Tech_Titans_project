export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  structured?: {
    type: 'exam_info' | 'subject_details' | 'practice_question' | 'general';
    content: {
      title?: string;
      details?: string;
      points?: string[];
      question?: {
        text: string;
        options?: string[];
        answer?: string;
        explanation?: string;
      };
    };
  };
}