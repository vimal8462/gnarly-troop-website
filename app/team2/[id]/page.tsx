// app/team2/[id]/page.tsx
import React, { JSX } from "react";
import SectionTeamsIndividual, {
  Person,
} from "@/components/sections/SectionTeamsIndividual";
import members from "@/app/team/members-data";
import { notFound } from "next/navigation";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/SectionFooter";

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

/**
 * Return all params to pre-render for static export.
 */
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const list = (members as Person[]) || [];
  return list
    .filter((p) => p != null && p.id != null)
    .map((p) => ({ id: String(p.id) }));
}

/**
 * Optional metadata per-person. `params` may be a Promise, so await it.
 */
export async function generateMetadata(props: Props) {
  const { params } = props;
  const { id } = await params; // <-- IMPORTANT: await params
  const person = (members as Person[]).find((p) => String(p.id) === id);

  if (!person) {
    return {
      title: "Team member",
    };
  }

  return {
    title: `${person.name} — ${person.role ?? "Team"}`,
    description: person.bio ? person.bio.slice(0, 160) : undefined,
  };
}

/**
 * Page component — must await params before using.
 */
export default async function TeamMemberPage(
  props: Props
): Promise<JSX.Element> {
  const { params } = props;
  const { id } = await params; // <-- IMPORTANT: await params

  const person = (members as Person[]).find((p) => String(p.id) === id);

  if (!person) {
    notFound();
  }

  // return <SectionTeamsIndividual person={person as Person} />;
  return (
    <>
      <Header />
      <SectionTeamsIndividual person={person as Person} />
      <Footer />
    </>
  );
}
