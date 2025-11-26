import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { db } from "@/db";
import { plaudConnections } from "@/db/schema";
import { requireAuth } from "@/lib/auth-server";

export default async function OnboardingPage() {
    // Check authentication server-side
    const session = await requireAuth();

    // Check if user already has a Plaud connection
    const [existingConnection] = await db
        .select()
        .from(plaudConnections)
        .where(eq(plaudConnections.userId, session.user.id))
        .limit(1);

    // If already connected, redirect to dashboard
    if (existingConnection) {
        redirect("/dashboard");
    }

    return (
        <div className="flex min-h-full items-center justify-center p-4">
            <OnboardingForm />
        </div>
    );
}
