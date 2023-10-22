import { useModalContext } from "../context/ModalContext";
import { ModalChildren } from "../projects/components/ModalChildren";
import { Modal } from "./Modal";

export const ModalPortal = () => {
  const { data, setData } = useModalContext();
  return (
    <Modal
      isOpen={data !== null}
      setIsOpen={() => setData!(null)}
      title={data ? data?.title : ""}
    >
      {data ? <ModalChildren {...data} /> : <></>}
    </Modal>
  );
};
