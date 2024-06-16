import { ReactNode} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {openCloseModal} from "../store/modalSlice.ts";

type ModalProps = {
    children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({  children }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const isOpen = useSelector(state => state.modal.isOpen);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative mx-auto p-5 border w-6/12 max-h-90 shadow-lg rounded-md bg-white">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={() => dispatch(openCloseModal({open: false}))}
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 8.586l-5.293-5.293-1.414 1.414L8.586 10l-5.293 5.293 1.414 1.414L10 11.414l5.293 5.293 1.414-1.414L11.414 10l5.293-5.293-1.414-1.414L10 8.586z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div className="mt-3 text-center h-[90vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
