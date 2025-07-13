import AddNoteForm from "@/components/shared/AddNoteForm";
import EditNoteForm from "@/components/shared/EditNoteForm";
import { ModalNote } from "@/components/shared/NoteModal";
import { BottomNavigation } from "@/components/ui/bottomNavigation";
import { useAppBar } from "@/context/AppBarContext";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

export const MainLayout = () => {
  const { config } = useAppBar();
  const modalContent = useSelector(
    (state: RootState) => state.note.modalContent
  );

  return (
    <div className="flex flex-col min-h-svh">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-semibold">{config.title}</h1>
        {config.rightContent}
      </header>
      <main className="flex-grow">
        <ModalNote>
          {modalContent === "edit" ? <EditNoteForm /> : <AddNoteForm />}
        </ModalNote>
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
