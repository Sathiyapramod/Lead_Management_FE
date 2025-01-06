export interface TwilioCall {
    on(event: "accept", callback: () => void): void;
    on(event: "disconnect", callback: () => void): void;
    on(event: "error", callback: (error: Error) => void): void;
    emit(event: "disconnect", callback?: () => void): void;
    disconnect(): void;
    reject(): void;
    parameters: {
        CallSid?: string;
        [key: string]: unknown;
    };
}
