// Type declaration for user-agents module
declare module 'user-agents' {
    interface UserAgentOptions {
        deviceCategory?: 'desktop' | 'mobile' | 'tablet';
        platform?: string;
    }

    class UserAgent {
        constructor(options?: UserAgentOptions);
        toString(): string;
        random(): UserAgent;
        userAgent: string;
    }

    export default UserAgent;
}
