import { FC } from "react";
import NftDiviVerseContainer from "../rhs-container/nftDiviVerse-container";

interface IProps {
    enableTest: boolean;
}

const Shuttle: FC<IProps> = ({ enableTest }) => {
    return (
        <>
            <section id="shuttle" className="flex place-items-center justify-around min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/assets/bg/16.jpg')] mt-10">
                <div className="justify-around columns-1">
                    <NftDiviVerseContainer enableTest={enableTest} />
                </div>
            </section>
        </>
    )
}

export default Shuttle;