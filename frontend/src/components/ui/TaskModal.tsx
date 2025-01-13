import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

let loading = false;

const deleteTask = async (taskId: string) => {
  loading = true;
  const response = await axios.delete(`${BACKEND_URL}/api/v1/todos/${taskId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  loading = false;
  return response;
};

interface TaskModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  modalTitle: string;
  modalDescription: string;
  modalCreatedDate: string;
  taskId: string;
}

export const TaskModal = ({
  open,
  setOpen,
  modalTitle,
  modalDescription,
  modalCreatedDate,
  taskId,
}: TaskModalProps) => {
  const formattedDate = formatDate(modalCreatedDate);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:size-10">
                  <ClipboardDocumentCheckIcon
                    aria-hidden="true"
                    className="size-6 text-purple-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    {modalTitle}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{modalDescription}</p>
                  </div>
                  <div className="flex gap-1">
                    <div className="mt-3 border w-fit px-3 py-1 rounded-full bg-slate-200">
                      <div className="text-xs text-slate-600">
                        {formattedDate}
                      </div>
                    </div>
                    <div className="mt-3 border w-fit px-3 py-1 rounded-full bg-slate-200">
                      <div className="text-xs text-slate-600">Tomorrow</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={async () => {
                  await deleteTask(taskId);
                  setOpen(false);
                }}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {loading === true ? "Deleting" : "Delete"}
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
