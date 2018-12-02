// navigator.clipboard.d.ts

interface Clipboard {
    writeText(newClipText: string): Promise<void>;
}

interface NavigatorClipboard {
    readonly clipboard?: Clipboard;
}

interface Navigator extends NavigatorClipboard {}
