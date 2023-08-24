import React, { FC } from "react";
import { Modal } from "flowbite-react";
import Image from 'next/image';

interface IProps {
  show: boolean;
  setCallback: (show: boolean) => void
}

const ProgressModal: FC<IProps> = ({ show, setCallback }) => {
  return (
    <Modal show={show} onClose={() => setCallback(false)} popup={true}>
      <Modal.Body className="rounded-lg shadow bg-gray-700 text-center py-5 px-10">
        <div className="grid grid-rows-3 grid-flow-col gap-4 p-4 border-b rounded-t border-gray-600 justify-start content-center">
          <div className="row-span-3">
            <Image src="/assets/transfer-icon.svg" alt="transfer in progress" className="animate-[spin_5s_linear_infinite]"  width="200" height="200"/>
          </div>
          <div className="col-span-2 text-4xl font-semibold text-white">Transfer in progress</div>
          <div className="row-span-2 text-xl col-span-2 text-white animate-pulse">Please wait</div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ProgressModal;