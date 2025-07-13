import { useParams } from "react-router";

function NoteDetailsPage() {
  const params = useParams<{ noteSlug: string }>();
  return <div>NoteDetailsPage {params.noteSlug}</div>;
}

export default NoteDetailsPage;
