import { IoChevronBackOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { RiQrScanLine } from "react-icons/ri";
import { IMenu } from "../interfaces";

export const icons: IMenu = {
  'BACK': <IoChevronBackOutline size="2rem" />,
  'HAMBERGER': <IoMdMenu size="2rem" />,
  'CLOSE': <IoCloseOutline size="2rem" />,
  'QRCODE': <RiQrScanLine size="2rem" />,
};
