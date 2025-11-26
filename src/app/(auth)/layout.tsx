export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}
