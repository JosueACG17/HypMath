export interface HistoryItem {
  expression: string
  mode: 'derivar' | 'integrar'
  variable: string
  result?: string 
  timestamp: number
}
