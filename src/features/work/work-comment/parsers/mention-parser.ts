export class MentionParser {
  static extract(content: string): string[] {
    const regex = /@([a-zA-Z0-9_]+)/g;

    const matches = [...content.matchAll(regex)];

    return matches.map((x) => x[1]);
  }
}
