import Layout from "@/components/layout/Layout";
import { generatePersonSchema } from "@/lib/seo";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const personSchema = generatePersonSchema();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <Layout>{children}</Layout>
        </>
    );
}