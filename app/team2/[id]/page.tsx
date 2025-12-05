import React, { JSX } from "react";
import SectionTeamsIndividual, {
  Person,
} from "@/components/sections/SectionTeamsIndividual";
import members from "@/app/team/members-data";
import { notFound } from "next/navigation";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/SectionFooter";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const list = members as Person[];
  return list.filter((p) => p.id != null).map((p) => ({ id: String(p.id) })); // <-- string only
}

export async function generateMetadata(props: Props) {
  const { id } = await props.params;
  const person = (members as Person[]).find((p) => String(p.id) === id);

  return {
    title: person ? `${person.name} — ${person.role || "Team"}` : "Team member",
    description: person?.bio?.slice(0, 160),
  };
}

export default async function TeamMemberPage(
  props: Props
): Promise<JSX.Element> {
  const { id } = await props.params;

  const person = (members as Person[]).find((p) => String(p.id) === id);
  if (!person) notFound();

  return (
    <>
      <Header />
      <SectionTeamsIndividual person={person} />
      <Footer />
    </>
  );
}
