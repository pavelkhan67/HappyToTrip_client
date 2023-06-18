
const SectionTitle = ({ subHeading, heading}) => {
    return (
        <div className="mx-auto text-center md:w-1/2 my-5">
            <h3 className="text-2xl font-semibold uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;