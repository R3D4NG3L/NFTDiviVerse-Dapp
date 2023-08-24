import { FC } from "react";
import { Modal } from "flowbite-react";
interface IProps {
  show: boolean;
  address: `0x${string}`;
  setCallback: (show: boolean) => void
}

const SuccessModal: FC<IProps> = ({ show, address, setCallback }) => {
  return (
    <Modal show={show} onClose={() => setCallback(false)} popup={true}>
      <Modal.Header className="rounded-t-lg shadow bg-gray-700 py-5">
        <div className="animate-pulse">
          <p className="text-2xl font-semibold text-green-400">Transaction Successful!</p>
        </div>
      </Modal.Header>
      <Modal.Body className="rounded-b-lg shadow bg-gray-700 text-center py-5">
        <p className="text-4xl font-semibold text-white">CONGRATULATIONS</p>
        <p className="text-2xl font-semibold text-white">Welcome to the shuttle!</p>
      </Modal.Body>
    </Modal>
  )
}

export default SuccessModal;