import Select from "react-select";

const TagSelect = ({ options, value, onChange }) => (
  <Select
    isMulti
    name="tags"
    options={options}
    value={value}
    onChange={onChange}
    className="basic-multi-select"
    classNamePrefix="select"
    placeholder="Select or type tags..."
  />
);

export default TagSelect;
