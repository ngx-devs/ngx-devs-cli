export function getLineNumber(lines: string[], lineNumber: number): string {
  return lines[--lineNumber];
}
