import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useEditCustomer } from "@/hook/useCustomer";
import { IUser, IUserForm } from "@/type";
import ManageCustomerForm from "./FormManageCustomer";

export default function ModalCustomer({
  setOpen,
  customer,
}: {
  setOpen: (open: boolean) => void;
  customer: IUser | null;
}) {
  const { mutate: handleEditCustomer } = useEditCustomer();

  const handleEdit = (data: Partial<IUserForm>) => {
    handleEditCustomer(
      { data, userId: customer?._id as string },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogTitle className="text-xl font-semibold">Edit order</DialogTitle>
      <ManageCustomerForm customer={customer} handleEdit={handleEdit} />
    </DialogContent>
  );
}
