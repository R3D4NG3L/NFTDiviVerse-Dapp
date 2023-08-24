import { Modal } from "flowbite-react";
import React, { FC } from "react";
import Image from 'next/image';

interface IProps {
  show: boolean;
  description: string;
  setCallback: (show: boolean) => void
}

const ErrorModal: FC<IProps> = ({ show, description, setCallback }) => {

  return (
    <Modal show={show} onClose={() => setCallback(false)} popup={true}>
      <Modal.Header className="rounded-t-lg shadow bg-gray-700 py-5">
        <div className="animate-pulse">
          <p className="text-2xl font-semibold text-white">An error occurred</p>
        </div>
      </Modal.Header>
      <Modal.Body className="rounded-b-lg shadow bg-gray-700 text-center py-5">
        <div className="grid grid-rows-3 grid-flow-col gap-4 p-4 border-b border-gray-600 justify-start content-center">
          <div className="row-span-3">
            <Image src="/assets/bot-error.svg" alt="error" className="animate-[spin_10s_linear_infinite]" width="200" height="200"/>
          </div>
          <div className="row-span-2">
            <p className="text-4xl font-semibold text-red-500">Your request has been canceled.<br />If you believe this was an error, please try again.</p>
            <hr />
            <p className="text-sm text-red-500">{description}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ErrorModal;