const SectionTitle = ({ heading, subheading }) => {
  return (
    <div className="text-center mb-8">
      <h3 className="text-3xl font-bold">{heading}</h3>
      <p className="text-gray-500">{subheading}</p>
    </div>
  );
};

export default SectionTitle;